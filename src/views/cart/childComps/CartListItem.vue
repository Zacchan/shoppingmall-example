<template>
    <div class="cart-list-item">
        <i class="check"></i>
        <div class="item-img left">
            <i @click="itemSelected" :class={nselected:!item.isSelected,selected:item.isSelected}></i>
            <span class="box">
                <img class="list-item-img " :src="item.sku.img" alt="">
            </span>
        </div>  
        <div class="item-right">
            <p class="item-title">{{item.title}}</p>
            <p class="item-style">{{item.sku.size,item.sku.style|styleTransfer}}</p>
            <span class="item-price">{{item.sku.currency,item.sku.nowprice|moneyTransfer}}</span>
            <span class="item-preprice">{{item.sku.currency,item.sku.price|moneyTransfer}}</span>
            <span class="item-amount">{{item.goodsCount|countTransfer}}</span>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { ADD_TO_SELECTED_CART,CAL_ACCOUNT,DELETE_FROM_SELECTED_CART
} from 'store/mutation-types';

export default {
    name:'CartListItem',
    props:{
        item:{
            type:Object,
            default(){
                return{}
            }
        },
        cartAllSelected:{
            type:Boolean,
            default:false
        }
    },
     watch:{
     cartAllSelected(value){
         this.cartSelected = value;
     }
    },
    data(){
        return{
            cartSelected:false
        }
    }
   ,methods:{
       itemSelected(){
           this.item.isSelected = !this.item.isSelected;
           if(this.item.isSelected ){
               this.$store.commit(ADD_TO_SELECTED_CART,this.item);
           }else{
               this.$store.commit(DELETE_FROM_SELECTED_CART,this.item);
           }
         
            this.$store.commit(CAL_ACCOUNT);
       }
   },
    filters:{
        styleTransfer(size,style){
            return style+' '+size+'码';
        },
        // 将钱转成合理的格式展示
        moneyTransfer(currency,price){
            const result = Number(price)/100;
            return currency+result.toFixed(2);
        },
        countTransfer(count){
            return 'x'+count;
        }
    },
    components:{

    }

}
</script>

<style >



.cart-list-item{
    overflow: hidden;
}
.item-img{
    width:100px;
    display: flex;
    height:75px;
}
.box{
    display: inline-block;
    margin-left:10px;
}
.list-item-img{
    width:55px;
    height:70px;
    border: solid 1px gainsboro;
     border-radius: 5px;
}

.selected{
    width:20px;
    height:20px;
    border:solid 1px deeppink;
    border-radius: 50%;
    color:white;
    display: inline-block;
    background: deeppink url("~assets/img/cart/tick.png") no-repeat .5px 3px/100%;
    margin-top:calc(75px - 50px);
    margin-left:5px;
}
.nselected{
    width:20px;
    height:20px;
    border:solid 1px gainsboro;
    border-radius: 50%;
     display: inline-block;
     margin-top:calc(75px - 50px);
    margin-left:5px;
}

/*右半部分*/
.item-right{
    overflow: hidden;
}
.item-right .item-title{
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-right .item-style{
    font-size: 11px;
    color:#aaa;
    margin:5px 0;
}

.item-right .item-price{
    font-size: 17px;
    color:deeppink;

}
.item-right .item-preprice{
    font-size:13px;
    color:#aaa;
    position:absolute;
    text-decoration-line: line-through;
    margin-left:3px;
}

.item-right .item-amount{
    position: absolute;
    font-size: 17px;
    color:#aaa;
    right:12px;

}


</style>
