<template>

    <div class="base-info" v-if="Object.keys(goods).length!==0">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for ="index in goods.services.length-1" :key ="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
           
        </div>
        
    </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    mounted(){
      // console.log(this.goods.columns) 这个父组件还没有传进来 所有有时候时空的
        
        //window.setTimeout(()=>{ console.log(this.goods) },300)
        
    },props:{
        goods:{
            type:Object,
            default(){
                return{}
            }
        }
    }

}
</script>
<style scoped>
.base-info{
   
    
 
    
}
.info-title{
     font-size:14px;
     color:#888888;
     padding:4px;
}
.info-price{
    margin:12px 0;
}

.n-price{
    color:deeppink;
    font-size: 19px;
    padding:2px;
    margin: 3px;
}

.o-price{
    color:#bbb;
    font-size:13px;
    text-decoration: line-through;
    padding:2px;
    margin: 3px;
}

.discount{
    background-color: deeppink;
    color:#eeeeee;
    font-size:.8em;
    border-radius: 10px;
    padding: 2px;
    vertical-align: top;
    margin: 3px;
}
.info-other{
    padding: 4px;
    text-align: center;
    margin-top:24px;
    display: flex;
    justify-content:space-between;
    font-size:13px;
    color:#bbb;
    padding-bottom: 9px;
   border-bottom: 1px solid #eee;
}

.info-service{
    display: flex;
    font-size:13px;
    border-bottom: 3px solid #eee;
    padding:0 -4px;
  

}

.info-service-item{
    margin:10px;
    flex:1;
    

}

.info-service img{
    height:20px;
}





</style>
