<template>
    <div class="bottom-bar">
        <div class="bottom-bar-left">
            <div >
                <i class="icon service"></i>
                <span>客服</span>
            </div>
            <div>
                <i class="icon store"></i>
                <span>店铺</span>
            </div>
            <div >
                <i class="icon mark"></i>
                <span>收藏</span>
            </div>

        </div>
        <div class="bottom-bar-right">
            <span class="mart" @click="addToCart">加入购物车</span>
            <span class="buy">购买</span>

        </div>
    </div>
    
</template>

<script>
export default {
name:'DetailBottomBar',
methods:{
    addToCart(){
        this.$emit('addCart');
        
    }
  }
}
</script>

<style scoped>
.bottom-bar{
    height:49px;
    position: fixed;
    background: #ffffff;
    bottom:0;
    left:0;
    right:0;

    
    display: flex;
    justify-content:space-between
}
.bottom-bar-left{
    width:50%;
   display:flex;
   justify-content:space-around;
   font-size: 13px;
   align-items: center;
}

.bottom-bar-left .icon{
    display: block;
    margin-left:2px;
    
    width:24px;
    height:24px;
    background: url("~assets/img/detail/detail_bottom.png") 0px 0px/100%;
}

.bottom-bar-left .service{
    background-position-y:-58px;
}

.bottom-bar-left .store{
    background-position-y:-107px;
}

.bottom-bar-left .mark{
    background-position-y:0px;
}
.bottom-bar-right{
    width:50%;
    display: flex;
    justify-content:space-around;
    font-size: 13px;
}
.bottom-bar-right .mart{
    background-color: yellow;
    width:50%;
    height:100%;
    display: inline-block;
    line-height:49px;
    columns: #000000;
    text-align: center;
}
.bottom-bar-right .buy{
    background-color: deeppink;
    height: 100%;
    width:50%;
    text-align: center;
    color: #eeeeee;
    line-height:49px;
}
</style>
