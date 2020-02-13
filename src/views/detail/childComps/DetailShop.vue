<template>


    <div class="detail-shop">
        <div class="shop-top">
            <img :src="shop.logo" alt="">
            <span class="title">{{shop.name}}</span>
        </div>
        <div class="shop-middle">
            <div class="shop-middle-item shop-middle-left">
                <div class="info-sells">
                    <div class="sells-count" v-if="shop.sells">
                        {{shop.sells|sellCountFilter}}
                    </div>
                    <div class="sells-text">总销量</div>
                </div>
                <div class="info-goods">
                    <div class="goods-count">
                        {{shop.goodsCount}}
                    </div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="shop-middle-item shop-middle-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}"> {{item.score}}</td>
                        <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter?"高":"低"}}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom-item">
                <a :href="shop.shopUrl">
                    <button class="btn">进店逛逛</button>
                </a>
        </div>

    </div>
</template>

<script>
export default {
    name:'DetailShop',
    props:{
        shop:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    filters:{
        sellCountFilter(value){
            return value<10000?value:(value/10000).toFixed(1)+'万'
        }
    },
    mounted(){
        // setTimeout(()=>{
        //     console.log(this.shop);
            
        // },300)
        
    }
}
</script>

<style scoped>
.shop-top{
    height:80px;
    /* line-height: 80px;
    margin:0 8px; */
    /* text-align:center; */
  
    display: flex;
    justify-content:flex-start;
   align-items: center;
   /* line-height: 80px; */
    
}
.shop-top .title{

  padding: 0 4px;
  font-size: 16px;
  color:#777;
  
  /* line-height: 80px; */
/* height: 80px; */

/* padding:20px 10px; */
/* display: inline-block; */
/* line-height:80px; */

  /* vertical-align: middle; */
}
.shop-middle{
    height:100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.shop-middle .shop-middle-left{
    width: 45%;
    font-size: 1rem;
    text-align:center;
    display:flex;
    justify-content: space-around;

    border-right: 1px solid #eee;
    
}
.shop-middle .shop-middle-left .info-sells, .info-goods{
    margin:0 10px;
}

.shop-middle .shop-middle-left .sells-text, .goods-text{
    font-size:.7rem;
    padding-top:.4rem
}

.shop-middle-right{
    font-size:.9rem;
    height:80%;
   text-align: center;
  
}
.shop-middle-right td{
    padding: 5px 1px;
}

.shop-top img{
  
    height: 80%;
    vertical-align: middle;
    
}
.shop-middle-right .score{
    color:#5ea732
}


.shop-middle-right .score-better{
    color:#f1323a;
}



.shop-middle-right .better{
    color: aliceblue;
    background-color:#5ea732;
}
.shop-middle-right .better-more{
    color:aliceblue;
     background-color:#f1323a;
}

.shop-bottom-item {
    width:100%;
}

.shop-bottom-item .btn{
     
      display: block;
      margin:0 auto;
      width: 100px;
      border:1px solid deeppink;
      border-radius: 10px;
      font-size:14px;
      background-color: deeppink;
      color:#eee
      
}





</style>
