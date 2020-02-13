<template>

    <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>

        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img  v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
        </div>

    </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props:{
        detailInfo:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    data(){
        return{
            counter:0,
            imagesLength:0
        }
    },
    mounted(){
        //console.log("goodsinfo");
       
       
    },
    methods:{
        imgLoad(){
        //    if(++this.counter===this.imagesLength)
        //    {        
        //            this.$emit('imageLoad')
        //       // console.log(this.detailInfo);
        //    }
                    if(++this.counter===this.imagesLength)
                    {
                    this.$emit('imageLoad')
                    }
        }
    },
    watch:{
        detailInfo(){
           // console.log("watch",this.detailInfo);
            
              this.imagesLength = this.detailInfo.detailImage[0].list.length

        }

    }
}
</script>

<style scoped>
.goods-info{
    position: relative;
    padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.clear-fix{
    height:100%;
    border-top: 1px solid #eeeeee ;
    border-bottom: 1px solid #eeeeee;
    margin:20px 3px;
    padding: 8px 4px;
    font-size:13px;

}

.info-desc .start,
.info-desc .end {
    width:90px;
    height:1px;
    background-color: #777777;
    position: relative;
}

.info-desc .start {
    float: left;
 
}

.info-desc .end {
 float: right;
}

.info-desc .start::before,
.info-desc .end::after {
    content:"";
    
 width: 5px;
 height: 5px;
 position: absolute;
 background: #777777;

}

.info-desc .end::after {
 right:0;
 bottom:0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 13px;
}
.info-key{
    text-align: center;
    margin:9px;
    font-size:16px;
}
.clear-fix::after{
    content:"";
    clear:both;
}

.info-list{
    width:100%
}

.info-list img{
    width: 100%
}

</style>
