# Hello记录一下踩的坑

## 用户管理页面的增删改查

1. QAQ 用mock拦截到的请求原来是一个请求体对象，里面有body(传过来的数据-字符串)、type(get/post/delete等)、url(请求地址)属性，需要取得body属性后再转成JSON对象进行操作。因为body里面的值是JSON字符串。用到的函数:const item1=JSON.parse(item)
2. 关于更新用户的操作：
   1. 点击更新，要做到在表单里回显
   2. 由于都是用到的相同组件，要与添加用户的操作分开
   
   1. 涉及到父子组件传值的问题，开始是用父组件传给子组件函数解决，然后用watch监听子组件表单的输入数据有没有变化，有变化就调用这个函数修改父组件的数据。

      然后发现这样挺麻烦的，于是用了vuex，把需要双向绑定的数据写进state里，然后把每次更新的方法写进mutations里，然后watch子组件的输入数据有没有变化，有就调用mutations，这样父组件只用读取state里面的数据，就解决了子组件里的修改不能传到父组件去的问题
   2. 在这个过程中发现了一个bug。。。就是`回显`的问题

      因为每次点击更新按钮希望读取到这一行的数据，然后用v-model绑定到跳出的表单里面，这样用户就可以在原来值的基础上修改。

      所以用slot-scoped="scope" 将scope.row传到子组件去，然后子组件用v-model就可以显示在表单上。也就是用scope.row更改state里的相关状态数据，通过调用mutations里的方法做到

      本来以为这样就可以每点一次更新就传一个新的state过去，子组件就能根据更新的行不同显示不同的回显。但是根据vue的生命周期，这样做不会触发组件的重新渲染，也就是把子组件渲染到页面上的state里的数据就只能是初始的。

      于是发现vue的重新渲染机制之一，就是更改组件的key。每次父组件更新state的时候就把key++1，与原来的key不同就能让这个组件重新渲染从而回显出对应的数据了。

      QAQ我好菜。。。。。。。。。。

      



## 父子组件的通信问题
1. vue3里只能实现数据的单向流动：父组件->子组件 子组件接受到父组件的数据进行修改后，不能传回到父组件
2. 父组件->子组件
   1. 子组件配置props:{}项 父组件引用子组件时把要传的值写在标签里，然后使用v-bind实现单向绑定
   2. 子组件->父组件：通过把父组件的函数传给子组件，函数接收子组件的参数传回给父组件，再在该函数的内部进行数据处理
   ~~~javascript
   //子组件
   export default{
       name:'childrenItem',
       props:{
           data1:Array,
           data2:Function
       },
       data(){
           return {
               aa:1
           }
       },
       mounted(){
           this.data2(this.aa);//把子组件的值传给父组件 并修改父组件的值
       }
   }
   //父组件
   <children-item :data1="data1" :data2="data2"></children-item>
   import childrenItem from '../src'
   export default{
       components:{
           childrenItem
       },
       data(){
           return {
               data1:[{},{}]
           }
       },
       methods:{
           data2(item){
               this.data1=item;
           }
       }
   }
   ~~~  
   3. 使用vuex
      1. state: 组件间共有需要用到的一些变量
      2. mutations：改变state里的变量的方法，`只能通过mutations里定义的函数才能对state里的值进行修改 `，外部访问mutations里的函数：this.$store.commit('函数名',参数)
         1. 定义在mutations里的函数接收两个参数，第一个是默认的state，第二个是val
         2. ~~~javascript
            //vuex文件里的写法
            import Vue from 'vue'
            import Vuex from 'vuex'
            import tab from './tab'
            Vue.use(Vuex)
            export default new Vuex.Store({
                modules:{
                    tab
                }
            })
            //tab文件里的写法
            export default{
                state:{
                    states1:true
                },
                mutations:{
                    changeState(state,val){
                        state.states1=val
                    }
                }
            }
            //外部改变states1状态
            this.$store.commit('changeState',newVal)
            ~~~ 
      3. modules：一个对象，里面可以放很多一组一组的state、mutations等
        * ~~~javascript

             export default new Vuex.Store({
                 state:{

                 },
                 mutations:{

                 }
                 modules:{
                     {
                         state:
                         mutations:
                     },
                     {
                         state:
                         mutations:
                     }
                 }
             }) 
         ~~~javascript

      4. mapState是一个函数，接收一个对象为参数，完成如下映射：可以直接通过tags访问this.$store.state.tab.tabList的状态
         1. ~~~javascript
            import {mapState} from 'vuex'
            export default{
                computed:{
                    ..mapState({
                        tags:state=>state.tab.tabList
                    })
                }
            }
            ~~~
      5. mapMutations
