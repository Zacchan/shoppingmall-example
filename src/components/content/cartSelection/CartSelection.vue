<template>
    <div class="cart-selection">
        
        <div class="cart-header">

            <div class="header-img">
                <img  :src="cartInfo.skus[exactProduct].img" alt="">
            </div>
            <div class="header-in">
                
                <span class="price"><span class="price-symbal">{{cartInfo.skus[exactProduct].currency}}</span>{{cartInfo.skus[exactProduct].nowprice|nowPriceFilter}}</span>
                <span class="storage">{{cartInfo.skus[exactProduct].stock|stockFilter}}</span>
                
                <div class="seleted">
                    <span class="selected-text">
                        已选
                    </span>
                    
                    {{cartInfo.skus[exactProduct].style+cartInfo.skus[exactProduct].size+' '+counter+'件'}}
                </div>
            </div>
            <i class="icon-guanbi" @click="handleCancel"></i>
        </div>
        <scroll class="cart-middle">
            <div v-for="(prop,styleIndex) in cartInfo.props" :key="styleIndex">
                <span class="style" >{{prop.label}}</span>
                <div class="cart-middle-content">
                    <span @click="handleClickItem(styleIndex,concreateIndex)" class="item" v-for="(index,concreateIndex) in prop.list"  :class="{'selectedIndex': currentIndex[styleIndex]===concreateIndex}"  :key="concreateIndex"> {{index.name}}</span>
                </div>
            </div>
        </scroll>
        <div class="amount">
            <span class="amount-n">数量</span>
            <div class="amount-right">
                <i class="icon-jian" @click="handleSub"></i>
                <input class="no" :value="counter">
                <i class="icon-jia" @click="handleAdd"></i>
            </div>
        </div>
        <div class="cart-bottom" @click="addToCart">
            加入购物车
        </div>
    </div>

</template>

<script>
import {CartProductInfo} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'
import { ADD_TO_SELECTED_CART,CAL_ACCOUNT,DELETE_FROM_SELECTED_CART
} from 'store/mutation-types';
import {mapActions, mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default {
    name:"CartSelection",
    props:{
      cartInfo:{
          type:Object,
          default(){
              return{};
          }
      },
      currentIndex:{
          type:Array
      }
    },
    filters:{
            stockFilter(value){
                return "库存:"+value+"件";
            },
            nowPriceFilter(value){
                return (Number(value)/100).toFixed(2);
            }
    },
    components:{
        Scroll,

    },
    computed:{
        exactProduct(){
            const totalResult = this.currentIndex[0]*this.cartInfo.props[1].list.length+this.currentIndex[1];
            return totalResult;
        }
    },
    data(){
        return{
            counter:1,
            currentProduct:{},
            show:false,
            message:''
        }
    },
    mounted(){   
    },
    methods:{
        ...mapActions(['addCart']),
        ...mapMutations([CAL_ACCOUNT]),
        handleClickItem(styleIndex,concreateIndex){            
            this.$set(this.currentIndex,styleIndex,concreateIndex);
        },
        handleCancel(){
            this.$emit('handleCancel')
        },
        handleSub(){
            if(this.counter>0){
            --this.counter;
            }
        },
        handleAdd(){
            ++this.counter;
        },
        addToCart(){        
            const productInfo = new CartProductInfo(this.cartInfo,this.exactProduct,this.counter);
            productInfo.counter = this.counter
            this.addCart(productInfo).then(res=>{
           this.$toast.display(res,1000)
               
       })
           this.$store.commit(CAL_ACCOUNT);
            
          
        }
    }
}
</script>

<style scoped>
/* @import url("http://at.alicdn.com/t/font_1610796_uw5savc5jsg.css"); */

.cart-selection{
    border-radius: 10px 10px 0 0;
    height: 70vh;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
   bottom:0;
    z-index: 11;
    animation:fadeInUp .5s;
    -webkit-animation: fadeInUp .5s;
}

.header-img{
    position: absolute;
    left:1.2rem;
    top:-2rem;
    height:6rem;
    width: 5rem;
    border: 1px solid rgba(109, 109, 116, 0.329);
    padding: 3px;
    border-radius: 5px;
    
}
.header-img img{
    
    height:100%;
   display: inline-block;
   margin:auto;
    width:100%;
}
.cart-header .header-in{
    margin-left:7rem;
    margin-top:.5rem;
    margin-right:.5rem;

}
.cart-header .header-in .price{
   color:deeppink;
     display: block;
    
}

.cart-header .header-in .price .price-symbal{
    font-size:.8rem;
}

.cart-header .header-in .storage{
    font-size: .7rem;
    color:rgb(212, 207, 207);
}

.cart-header .seleted{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
   /* overflow:hidden;
    white-space: normal;
    word-wrap: break-word; */
}

.icon-guanbi{
    display: inline-block;
    position:absolute;
    right:0;
    top:0;
    width:40px;
    height: 40px;
    background: url("~assets/img/cart/cancel.png") no-repeat 0 0/100%;

}

.seleted .selected-text{
font-size:.8rem;
color:#aaaaaa;
}
.seleted{
    margin-top:.2rem;
    font-size:.9rem;
}
.cart-middle{
    height: 46vh;
    overflow: hidden;
    margin-top:.3rem;
}
.cart-middle .style{
    display: block;
    font-size:.9rem;
    margin:.5rem;
    color:#ccc;
}



 .item{
    display: inline-block;
    background: #eee;
    padding: .3rem;
    border-radius: 4px;
    font-size:.8rem;
    margin-left:.5rem;
    margin-top:.3rem;

    

}



.amount span{
    display: inline-block;
}

.amount{
    height: 2rem;
    line-height: 2rem;
    position: relative;
}
.amount .amount-n{
    font-size:.9rem;
    margin-left: 1rem;
    color:#ccc;
}
.amount .amount-right {
    display:inline-block;
    position: absolute;
    right:10px;
    top:.2rem;
    text-align: center;
   line-height: 33px;
   width: 5.5rem;
   height:1.8rem;
}
.amount .amount-right input{
    background: #ccc;
    border:none;
    text-align: center;
    position: absolute;

    left:2.1rem;
    top:.1rem;
  
}
.amount .amount-right i{
    display: inline-block;
    height:1.5em;
    width: 1.5em;
    position:absolute;
}

.icon-jian{
    margin:0 .5rem;
    left:0;
    background: url('~assets/img/common/subtract.png') no-repeat 0 0/100%;
}

.icon-jia{
    right:0;
    margin:0 .5rem;
    background: url('~assets/img/common/add.png') no-repeat 0 0/100%;
}

.amount .amount-right .no{
    display:inline-block;
    height:1.3em;
    width: 1.3em;
    line-height: 1.3rem;
}

.cart-bottom{
    height:2rem;
    text-align: center;
    line-height: 2rem;
    margin: auto;
    width:80vw;
    background:deeppink;
    color:#fff;
    border-radius: 15px;
}

 .selectedIndex{
    background: deeppink;
    color:#fff;
}

</style>
