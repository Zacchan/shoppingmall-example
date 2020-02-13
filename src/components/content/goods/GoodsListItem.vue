<template>
    <div class="goods-list-item" @click="handleItemClick">
        <div class="img-content">
            <img :src="showImg" @load="imgOnLoad" alt="">
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
    },
    computed:{
        showImg(){
            return this.goodsItem.image||this.goodsItem.show.img
        }
    },
    methods:{
        imgOnLoad(){
            this.$bus.$emit('itemImgLoad')
            //因为多个地方使用到这个组件 这个函数是为了让主页图片加载完 
            //主页更新的用法，所以要判断当前的主页的路由途径  
            //可以监听自己的事件
            // if(this.$route.path.indexOf('/home')){ 
            // this.$bus.$emit('itemImgOnLoad')
            //     console.log('home update');    
            // }               
        },
        handleItemClick(){
           // this.$router.push('/detail/'+this.goodsItem.iid);
        //    console.log("testresult");
        //    console.log(this.$router);
           
           
            this.$router.push({
                path:'/detail',
                query:{
                    iid:this.goodsItem.iid
                }
            })
        }
    }

}
</script>

<style scoped>

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
   
    background: url("~assets/img/common/collect.svg") no-repeat 0 0/100%;
}
</style>
