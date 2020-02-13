<template>
    <nav-bar class="cart-navbar">
        <div slot="center">购物车
            <span v-if="cartLength">({{length}})</span>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'



import { mapGetters } from "vuex";

export default {
    name:"CartNavBar",
    components:{
        NavBar
    },
    computed:{
        cartLength(){    //这样还是很长 获取store的 getters.getCartLength的属性 
                            //其实还有更方便的方法 mapGetters 即可直接调用store里面写的getter
           return this.$store.getters.getCartLength;
        },
        //两种语法
        // ...mapGetters(['getCartLength','getCartList'])
        ...mapGetters({
            length:'getCartLength',
            list:'getCartListItem'
        })
    },
    data(){
        return{
            cartTopLength:null
        }
    },
    watch:{
        // cartLength(val){
        //     this.cartTopLength = this.cartLength>0?this.cartLength:false;
        // }
    },
    methods:{
        // handleClick(){
        //    this.$store.dispatch('getCart',(value)=>{
        //        console.log(value);
               
        //    })  
        // }
    }
}
</script>

<style>
.cart-navbar{
    background-color: deeppink;
    color:#fff;
    font-weight: 400;
    z-index: 10;
    position: relative;
}

</style>
