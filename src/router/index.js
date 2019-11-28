import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import("views/home/Home.vue")
const Cart = ()=>import("views/cart/Cart.vue")
const Category = ()=>import("views/category/Category")
const Profile = ()=>import("views/profile/Profile")



Vue.use(VueRouter);

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{
            title:'主页',
            children:[]
        }
    },
    {
        path:'/cart',
        component:Cart,
        meta:{
            title:"购物车"
        }
    },
    {
        path:'/category',
        component:Category,
        meta:{
            title:"分类"
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            title:"档案"
        }
    }

]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router;