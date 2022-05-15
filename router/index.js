import Vue from 'vue';
import VueRouter from 'vue-router';
import homeView from '../views/homeView.vue';
import userView from '../views/userView.vue';
Vue.use(VueRouter);
const routes=[
    {
        path:'/',
        name:'Home',
        component:homeView,
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('../views/home')
            },
            {
                path:'/user',
                name:'user',
                component:()=>import('../views/user')
            },
            {
                path:'/mail',
                name:'mail',
                component:()=>import('../views/mail')
            }
        ]
    },
    {
        path:'/user',
        name:'User',
        component:userView
    }
]
const router=new VueRouter(
    {
        mode:'history',//路由的匹配模式
        routes
    }
)

export default router;