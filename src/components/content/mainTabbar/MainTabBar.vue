<template>
  <div id="app">
      
   <tab-bar>
       <!-- activeColor='blue' -->
     <tab-bar-item path='./home' activeColor="DeepPink" > 
       <img slot="item-icon" name="item-icon" src="~assets/img/tabbar/home.png" alt="">
       <img slot="item-icon-active" name="item-icon" src="~assets/img/tabbar/home_active.png" alt="">
       <div slot="item-text">首页</div>
     </tab-bar-item>
     <tab-bar-item path='./category' activeColor="DeepPink"  >
       <img slot="item-icon" name="item-icon" src="~assets/img/tabbar/category.png" alt="">
       <img slot="item-icon-active" name="item-icon" src="~assets/img/tabbar/category_active.png" alt="">
       <div slot="item-text">分类</div>
     </tab-bar-item>
     <tab-bar-item path='./profile' activeColor="DeepPink"  >
       <img slot="item-icon" name="item-icon" src="~assets/img/tabbar/profile.png" alt="">
       <img slot="item-icon-active" name="item-icon" src="~assets/img/tabbar/profile_active.png" alt="">
       <div slot="item-text">档案</div>
     </tab-bar-item>
     <tab-bar-item path='./cart' activeColor="DeepPink" >
      <img slot="item-icon" name="item-icon" src="~assets/img/tabbar/cart.png" alt="">
       <img slot="item-icon-active" name="item-icon" src="~assets/img/tabbar/cart_active.png" alt="">
       <div slot="item-text">购物车</div>
         
     </tab-bar-item>
   <div class="cart-length" v-show="cartTopLength">{{cartTopLength}}</div>     
   </tab-bar>
  </div>
</template>

<script>
import TabBar from"components/common/tabbar/TabBar.vue"
import TabBarItem from "components/common/tabbar/TabBarItem.vue"
export default {
   name: 'MainTabBar',
   components:{
     TabBar,
     TabBarItem
   },
   computed:{
     cartTopLength(){
       return this.$store.state.cartList.length;
     }
   }
}
</script>



<style scoped>

.cart-length{
  position:absolute;
  right:1.6rem;
  top:0px;
  width:.9rem;
  font-size: .8rem;
  height: .9rem;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  line-height: .9rem;
  background: red;

}

</style>


