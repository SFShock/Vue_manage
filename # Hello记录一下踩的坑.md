# Hello记录一下踩的坑

## 用户管理页面的增删改查

1. QAQ 用mock拦截到的请求原来是一个请求体对象，里面有body(传过来的数据-字符串)、type(get/post/delete等)、url(请求地址)属性，需要取得body属性后再转成JSON对象进行操作。因为body里面的值是JSON字符串。用到的函数:const item1=JSON.parse(item)


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