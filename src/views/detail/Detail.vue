<template>
    <div id="detail">
        <detail-nav-bar ref="navbar" class="detail-navbar" @titleClick="handleTitleClick"/>
        <scroll ref="scrollEl" class="detail-content" :probe-type="3" @scroll="scrollPosition">
            <!-- <div>{{$route.query.iid}}</div> -->
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/> 
            <detail-goods-param  ref="param" :param-info="paramInfo"/> 
            <detail-comments-info  ref="comment" :comments-info="commentsInfo" />
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <back-top v-show="showPullTop" @click.native = "backClick" />
        <detail-bottom-bar  @addCart="addToCart"  class="bottom-bar"/>
        <shelter v-show="clickCart"/>
        <cart-selection :current-index="currentIndexCart" :cart-info="cartInfo" @handleCancel="handleCancel" v-if="clickCart"/>
    </div>
    
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from './childComps/DetailShop'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailGoodsParam from './childComps/DetailGoodsParam'
import DetailCommentsInfo from './childComps/DetailCommentsInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import CartSelection from 'components/content/cartSelection/CartSelection'
import GoodsList from 'components/content/goods/GoodsList'


import Scroll from 'components/common/scroll/Scroll'
import Shelter from 'components/common/shelter/Shelter'




import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {getDetail,Goods,shop,GoodsParam,getRecommends} from 'network/detail.js'
import { setTimeout } from 'timers';
import {debounce,throttle} from 'common/utils'



export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShop,
        DetailGoodsInfo,
        DetailGoodsParam,
        DetailCommentsInfo,
        DetailBottomBar,
        CartSelection,
        Scroll,
        GoodsList,
        Shelter     
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentsInfo:{},
            recommends:[],
            itemImgListener:null,
            scrollListener:null,
            titleYs:[],
            scrollY:0,
            currentIndex:0,
            clickCart:false,
            cartInfo:{},
            currentIndexCart:[]
        }
    },
    created(){
        if(!this.iid){
            this.iid = this.$route.query.iid;
        }
        //详情页信息
        getDetail(this.iid).then(res=>{
            
            const data = res.result;
            //获取该产品加入购物车的信息
            this.cartInfo = data.skuInfo;

                if(this.cartInfo){
                     for(let i in this.cartInfo.props){
                        this.currentIndexCart.push(0);
                }                
            }


            console.log(this.cartInfo);
            //获取顶部的图片数据
            this.topImages = data.itemInfo.topImages;
            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //console.log(data)

            //创建店铺信息的对象

            this.shop = new shop(data.shopInfo);
            ////console.log("shop",data.shopInfo);
            
            this.detailInfo = data.detailInfo;
            // //console.log("拿到什么东西",this.detailInfo)
            
            //获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //console.log(this.paramInfo);


            //获取评论信息  判断评论存不存在

            if(data.rate.cRate!==0){
            this.commentsInfo = data.rate.list[0];
            }

            //获取推荐数据
        

        
        getRecommends().then(res=>{
            this.recommends = res.data.list

        })

        

            

        })
    /*没用
        this.$nextTick(()=>{
                this.titleYs.push(this.$refs.param.$el.offsetTop);    
                this.titleYs.push(this.$refs.comment.$el.offsetTop);
                this.titleYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.titleYs);
        })*/
    // this.scrollListener = debounce(position=>{
    //    this.scrollY= position.y;
    //    if(Math.abs(this.scrollY)>=0&&Math.abs(this.scrollY)<this.titleYs[1]){
    //        this.currentIndex = 0;
    //    }else if(Math.abs(this.scrollY)>=this.titleYs[1]&&Math.abs(this.scrollY)<this.titleYs[2])
    //    {
    //        this.currentIndex = 1;
    //    }else if(Math.abs(this.scrollY)>=this.titleYs[2]&&Math.abs(this.scrollY)<this.titleYs[3])
    //    {
    //        this.currentIndex = 2;
    //    }else{
    //        this.currentIndex = 3;
    //    }
    //    console.log(this.currentIndex);
    // }
    // ,50);


    },
    computed:{
    iId(){
        return this.$route.query.iid;
    }
    },
     methods:{
         handleCancel(){
             this.clickCart = !this.clickCart;
         },
         
         imageLoad(){
                this.refresh();       
                this.titleYs.push(this.$refs.param.$el.offsetTop-44);    
                this.titleYs.push(this.$refs.comment.$el.offsetTop-44);
                this.titleYs.push(this.$refs.recommend.$el.offsetTop-44);
               // console.log(this.titleYs);
                
                
        },
        addToCart(){
            this.clickCart = !this.clickCart;
            
        },
        handleTitleClick(index){
            this.$refs.scrollEl.scrollTo(0,-this.titleYs[index]);
        },
        scrollPosition(position){
        //   this.scrollListener(position)
         
            //1.判断backtop是否显示
            this.showPullTop = Math.abs(position.y)>1000;
            
            
            this.scrollY= position.y;
            for(let i in this.titleYs){
                i = Number(i);
                
                if(this.currentIndex!==i&&(i<this.titleYs.length-1&&Math.abs(this.scrollY)>=this.titleYs[i]&&this.scrollY<this.titleYs[i+1])||i===this.titleYs.length-1&&Math.abs(this.scrollY)>=this.titleYs[i]){
                    this.currentIndex = i;
                    this.$refs.navbar.currentIndex = this.currentIndex;
                }
            }
         
            
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    mounted(){
        this.titleYs.push(0);
       
        
    },
    destroyed(){
        this.$bus.$off('itemImgLoad',this.itemImgListener);
    }


}
</script>

<style scoped>


#detail{
    position: relative;
    z-index:1 ;
    background-color: #ffffff;
    overflow:hidden;
   height: 100vh;
}
.detail-navbar{
    position: relative;
    z-index: 9;
    background: #ffffff;
}
.detail-content{
    height: calc(100% - 90px);
    
}
.bottom-bar{
    z-index: 10;
}
</style>
