<template>
    <div class="detail-swiper">
        <swiper-real>
            <swiper-real-item v-for="item in topImages" class="swiper-item">
                <img :src="item" alt="">
            </swiper-real-item>
            
        </swiper-real>
    </div>
</template>

<script>
import {SwiperReal,SwiperRealItem} from 'components/common/swiper/index.js'
import Swiper from 'components/common/swiper/Swiper'
export default {
name:'DetailSwiper',
props:{
    topImages:{
        type:Array,
        default(){
            return[];
        }
}
},
 components:{
            SwiperReal,SwiperRealItem,Swiper
        },
mounted(){
    // console.log("detailswiper");
    
}

}
</script>

<style scoped>

.swiper-item{
    height: 300px;
    overflow: hidden;
}


</style>
