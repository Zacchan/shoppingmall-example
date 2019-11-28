<template>
  <div class="HomeSwiper">
        <swiper-real>
            <swiper-real-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link">
                  <img :src="item.image" alt="">
                </a>
            </swiper-real-item>
        </swiper-real>
  </div>
</template>

<script>
import {SwiperReal,SwiperRealItem} from 'components/common/swiper/index.js'
	export default {
        props:{
            banners:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        name: "HomeSwiper",
        components:{
            SwiperReal,SwiperRealItem
        }
	}
</script>

<style scoped>

</style>
