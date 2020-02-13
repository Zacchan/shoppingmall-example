<template>
    <div class="cart-list">
        <div class="display-none" v-if="!length">
            <span>购物车内暂时没有商品</span>
            <div class="go-shopping">去逛一逛</div>
        </div>
        <scroll v-if="length" ref="Escroll" class="cart-content">
            <div class="order" >
                <span class="ur-order">您的订单</span>
                <!-- <li class="order-item" v-for="item in list">
                    {{item}}
                </li> -->
                <div class="order-info">
                    <cart-list-item :cartAllSelected="cartAllSelected" v-for="(item,index) in list" :item="item" :key="index"/>
                </div>
                
                <div class="account"> 
                    <span class="left-selected">
                        <i @click="itemSelected" :class={cartnselected:!isSelectedAll,cartselected:isSelectedAll}></i>
                        <span class="all-selected">全选</span>
                    </span>
                    <span class="account-cal">应付合计:{{accountObj.symbol+accountObj.account}}</span><span class="account-btn">去结算<span v-if="selLength">({{selLength}})</span></span>
                    <div @click="deleteCart" class="delete-cart">清空购物车</div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import { mapGetters } from "vuex";


import { ADD_ALL_TO_CART,DELETE_ALL_FROM_CART,CAL_ACCOUNT,GET_CART_LIST_ITEM,GET_ACCOUNT
,DELETE_ALL_FROM_FAKE_CART,GET_SEL_CART_LIST_LENGH} from "store/mutation-types.js";
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll.vue";


export default {
name:'CartList',
components:{
Scroll,
CartListItem
},
methods:{
    deleteCart(){
         this.$store.commit(DELETE_ALL_FROM_FAKE_CART);
    },
    itemSelected(){
         
           if(this.isSelectedAll){
               this.list.forEach(item=>{
                   item.isSelected = false;
               })
               this.$store.commit(DELETE_ALL_FROM_CART,this.item);
              
           }else{
               this.list.forEach(item=>{
                   item.isSelected = true;
               })
                this.$store.commit(ADD_ALL_TO_CART,this.item);
               
           }
            this.$store.commit(CAL_ACCOUNT);
       }
} ,
 data(){
        return{
            cartAllSelected:false
        }
    },

computed:{
...mapGetters({
    length:'getCartLength',
    list:GET_CART_LIST_ITEM,
    accountObj:GET_ACCOUNT,
    selLength:GET_SEL_CART_LIST_LENGH
}),
    isSelectedAll(){
        return this.list.every(value=>{
            return value.isSelected;
        })
    }
}
}


</script>

<style>
.ur-order{
    display: inline-block;
    font-size: 15px;
    margin-bottom: 8px;
    margin-left: 10px;
    color:#aaa;
}
.cart-list{
     background: #eeeeee; 
     height:calc(100vh - 44px - 52px);
     overflow: hidden;
     
}
.display-none{
    margin:auto;
    height:10rem;
    width:100%;
}
.display-none span{
    margin:auto;
    width:10rem;
    height:1rem;
    display:block;
    position:relative;
    top:50%;
    color: rgba(80,80,80,.66);
}

.display-none .go-shopping{
    position:relative;
    top:70%;
    margin:0 auto;
    text-align: center;
    width:5rem;
    height:1.6rem;
    line-height: 1.6rem;
    background: deeppink;
    border-radius: 15px;
    color:#fff;
}
.cart-content{
    height: 98%;
    overflow: hidden;
}

.order{
    width:95%;
    margin:auto;
    background: #ffffff;
    border-radius: 4px;
    position: relative;
    top:4px;
    padding-bottom: 50px;
    
    
}
.order-item{
    border-top: 1px solid rgba(51,51,51,.66);
    margin:0 10px;
    padding: 5px 0;
    word-wrap: break-word;
}
.account{
    height:3rem;
    border-top: 1px solid rgba(51,51,51,.66);
    margin:0 10px;
    padding: 20px;
}

.account .all-selected{
    margin-left:2px;
    color:deeppink;
    
}
.account-btn{
    display: inline-block;
    border-radius: 10px;
    background: deeppink;
    color:#fff;
    width:4rem;
    height:1.2rem;
    font-size: .8rem;
    text-align: center;
    line-height: 1.2rem;
    position: absolute;
    right: 10px;
}
.account-cal{
    display:inline-block;
    margin-left:20%;

}
.left-selected{
    display:inline-flex;
    width:40px;
    align-items:center;
}


.cartselected{
    width:20px;
    height:20px;
    border:solid 1px deeppink;
    border-radius: 50%;
    color:white;
    display: inline-block;
    background: deeppink url("~assets/img/cart/tick.png") no-repeat .5px 3px/100%;
    margin-left:-23px;
   
}
.cartnselected{
    width:20px;
    height:20px;
    border:solid 1px gainsboro;
    border-radius: 50%;
     display: inline-block;
    margin-left:-23px;
}
.delete-cart{
    width:100px;
    text-align: center;
    margin:0 auto;
    border-radius: 5px;
    background: deeppink;
    color:floralwhite;
    border:solid 1px deeppink;
    margin-top: 20px;

}
@media screen and (max-width: 340px){
    .account-cal{
    display:inline-block;
    
    font-size:14px;
    padding-right:-2px;
    margin-left:15px;
}
.account{
    height:3rem;
    border-top: 1px solid rgba(51,51,51,.66);
  

}
}


</style>
