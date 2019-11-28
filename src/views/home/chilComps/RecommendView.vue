<template>
    <div class="recommend-view">
        <div class="recommend-item" v-for ="(item,index) in recommends" :key="index" >
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>

    </div>
    
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style>
.recommend-view{
    display: flex;
    width: 100%;
    font-size: 12px;
    padding:10px 0 10px;
    border-bottom: 8px solid #eeeeee;
}
.recommend-item{
 flex:1;
 text-align: center;
 
}
.recommend-item img{
    width:65px;
    height:65px;
}




</style>
