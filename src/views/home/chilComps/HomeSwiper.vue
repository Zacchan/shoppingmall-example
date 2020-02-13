<template>
  <div class="HomeSwiper">
        <swiper-real>
            <swiper-real-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link">
                  <img :src="item.image" alt="" @load="imgLoad">
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
        data(){
            return{
                isLoad:false
            }
        },
        name: "HomeSwiper",
        components:{
            SwiperReal,SwiperRealItem
        },
        methods:{
            imgLoad(){
                if(!this.isLoad){
                this.$emit('swiperImgLoad')
                this.isLoad = true;
                }
            }
        }
	}
</script>

<style scoped>

</style>
