<template>
    <div id="home">
        <nav-bar class="home-nav" >
            <div slot="center" @click="handleToast">购物街</div>
        </nav-bar>
        <tab-control class="tab-control" :class={fixed:isTabFixed} :titles="['流行','新款','精选']" @tabClick="tabClickHandle" ref="tabControl1" v-show="isTabFixed"></tab-control>
        
        <scroll class="content" ref="scrollEl" :probe-type="3" @scroll="handleScroll" @pullingup="handlePullUp" :pull-up-load = "true" >
        <!-- <scroll class="content" ref="scrollEl"  :pull-up-load = "true"> -->
            <home-swiper :banners="banners" @swiperImgLoad ="swiperImgLoad"></home-swiper>
            <recommend-view :recommends="recommend"></recommend-view>
            <feature-view></feature-view>   
            <tab-control class="tab-control" :class={fixed:isTabFixed} :titles="['流行','新款','精选']" @tabClick="tabClickHandle" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods" ></goods-list>
            <div class="load-more">上拉加载更多</div>
       </scroll>
       <back-top v-show="showPullTop" @click.native = "backClick" />
    </div>
    
</template>

<script>
import {debounce} from 'common/utils.js'




import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'



import HomeSwiper from './chilComps/HomeSwiper'
import RecommendView from './chilComps/RecommendView'
import FeatureView from './chilComps/FeatureView'



import{
    getHomeMultidata,
    getHomeGoods
    } from 'network/home.js'
import { clearTimeout, setTimeout } from 'timers';

import {itemListenerMixin,backTopMixin} from 'common/mixin'
// Vue.use(Toast);
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
            tabOffsetTop:0,
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentTabIndex:'pop',
            isTabFixed:false,
            saveY:0,
            itemImgListener:null
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    computed:{
        showGoods(){
            return this.goods[this.currentTabIndex].list
        }
    },
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
    
        // SwiperReal,
        // SwiperRealItem,
        // Swiper,
        // SwiperItem
    },
    methods:{
        handleToast(){
        //     this.$toast("提示文案")
            
        //   console.log(this.$toast);
           
        },
        swiperImgLoad(){
            //获取tabControl 的距离顶部的距离
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        //console.log("top",this.tabOffsetTop)
        },
        handleRefresh(){
            this.$refs.scrollEl.refresh();
        },
        handlePullUp(){
           // console.log("上拉加载更多");
            this.getHomeGoods(this.currentTabIndex);
            //上啦加载更多 下面的要刷新 
            this.$refs.scrollEl.finishPullUp(); 
        },
        getHomeMultidata(){
             getHomeMultidata().then(res=>{
           // console.log(res);
            this.banners = res.data.banner.list;
            this.recommend = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page++;
            //console.log(res.data);

            // this.$refs.scrollEl.refresh();
         })
        },
        handleScroll(position){
           this.showPullTop = Math.abs(position.y)>1000;
            //console.log(this.showPullTop);
        
        //2.决定tabControl是否吸顶（position fixed）动态绑定样式就可以了
        this.isTabFixed = Math.abs(position.y)>this.tabOffsetTop-35;
        //this.saveY = position.y;
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
            console.log(this.$refs.tabControl2.currentIndex)
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
            
        }
    },
    created(){
        //请求多个数据
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('sell');
        this.getHomeGoods('new');
        // const refresh = debounce(this.handleRefresh,10);
        //  this.$bus.$on('itemImgOnLoad',()=>{
        //    refresh();
        // })

        
    
    },
    destroyed(){
        ////console.log("has been destroyed");
        
    },
    mounted(){
       
        
        //图片加载完成的时间监听
        // const refresh = debounce(this.handleRefresh,300);
        // this.itemImgListener = ()=>{
        //    refresh();
        // }
        //  this.$bus.$on('itemImgOnLoad',this.itemImgListener)
        // this.$nextTick(()=>{
        //     //console.log("tabcontrol",this.$refs.tabControl);    
        //     //console.log("top",this.$refs.tabControl.$el.offsetTop); //图片未加载完的 高度
        // })
    },
    deactivated(){
        this.saveY = this.$refs.scrollEl.getCurrentY();
        // //console.log('leave away');
        // //console.log("this.savey is",this.saveY);
        
        //2.取消全局事件监听
        this.$bus.$off('itemImgOnLoad',this.itemImgListener);

    },
    activated(){
        //console.log("设置位置",this.saveY);
        this.$refs.scrollEl.scrollTo(0,this.saveY);
        this.$refs.scrollEl.refresh();
        
    }
}
</script>
<style scoped>
#home{
    
    height: 100vh;
}
    .home-nav{
        position: relative;
        /* position: absolute; */
        /* background-color: var(--color-tint); */
        background-color: deeppink;
        color: #ffffff;
        /* left:0;
        right:0;
        top:0; */
        z-index: 99;
    }


    /*上面的另一种写法 用fixed的
    #home{
    padding-top:44px;
    height: 100vh;
}
    .home-nav{
        position: fixed;
        left:0;
        right:0;
        top:0;
        background-color: var(--color-tint);
        color: #ffffff;
       
        z-index: 99;
    }
    */

.content{
    height:calc(100% - 98px);
    overflow: hidden;
}
.load-more{
    margin-top:20px;
    font-size:14px;
    text-align: center;
    color:#bbbbbb;
}
.fixed{
    position: fixed;
    top:44px;
    left:0;
    right:0;
   background-color: #ffffff;
   z-index:1;
}
.van-toast{
    position:absolute;
    left: 0;
    right:0;
    bottom:0;
    top:0;
}


</style>
