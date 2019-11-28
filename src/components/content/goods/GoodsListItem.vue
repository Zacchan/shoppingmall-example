<template>
    <div class="goods-list-item">
        <div class="img-content">
            <img :src="goodsItem.show.img" alt="">
        </div>
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">价格:{{goodsItem.price}}</span>
            <span class="collect">收藏:{{goodsItem.cfav}}</span>

        </div>

       
    </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    }

}
</script>

<style>

.goods-list-item{
    padding-bottom:40px;
    position: relative;
    width:48%;
    padding-top:2px;
    border-radius: 5px;
    border: 2px solid #eeeeee;
    margin-top:1px;
    
}
.img-content{
    padding:1px;
}
.img-content img{
    width:100%;
    border-radius:5px;
}

.goods-info{
    font-size:11px;
    position:absolute;
    bottom:5px;
    left:0;
    right:0;
    margin: auto;
   text-align: center;
    overflow: hidden;
    
}

.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}

.goods-info .price{
    color:var(--color-high-text);
    margin-right:30px;
}

.goods-info .collect{
    position: relative;
}

.goods-info .collect::before{
    content:'';
    position: absolute;
    left:-14px;
    bottom: 1px;
    width:14px;
    height:14px;
   
    background: url("~assets/img/common/collect.svg")  0 0/14px 14px;
}
</style>
