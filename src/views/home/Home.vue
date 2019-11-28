<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
       <home-swiper :banners="banners"></home-swiper>
       <recommend-view :recommends="recommend"></recommend-view>
       <feature-view></feature-view>   
       <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClickHandle"></tab-control>
       <goods-list :goods="goods[currentTabIndex].list"></goods-list>
    </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './chilComps/HomeSwiper'
import RecommendView from './chilComps/RecommendView'
import FeatureView from './chilComps/FeatureView'

import{
    getHomeMultidata,
    getHomeGoods
    } from 'network/home.js'

// import SwiperReal from 'components/common/swiper/SwiperReal.vue'
// import SwiperRealItem from 'components/common/swiper/SwiperRealItem.vue'
// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'
export default {
    name:'Home',
    data(){
        return{
            banners:[],
            recommend:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentTabIndex:'pop'
        }
    },
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList
        // SwiperReal,
        // SwiperRealItem,
        // Swiper,
        // SwiperItem
    },
    methods:{
        getHomeMultidata(){
             getHomeMultidata().then(res=>{
            console.log(res);
            this.banners = res.data.banner.list;
            this.recommend = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page++;
            console.log(res.data);
            
         })
        },
        tabClickHandle(index){

            switch (index) {
                case 0:
                    this.currentTabIndex = 'pop'
                    break;
                case 1:
                    this.currentTabIndex = 'new'
                    break;
                case 2:
                    this.currentTabIndex = 'sell'
                    break;
                
            }
        }
    },
    created(){
        //请求多个数据
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('sell');
        this.getHomeGoods('new');
        
    }
}
</script>
<style scoped>
#home{
    padding-top:44px;
}
    .home-nav{
        position: fixed;
        background-color: var(--color-tint);
        color: #ffffff;
        left:0;
        right:0;
        top:0;
        z-index: 99;
    }
.tab-control{
      z-index: 99;
    position: sticky;
    top:44px;
    background-color: #ffffff;
}


</style>
