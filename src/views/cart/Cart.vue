<template>
    <div class="cart">
        <cart-nav-bar></cart-nav-bar>
        <cart-list></cart-list>
    </div>
</template>

<script>
import CartNavBar from './childComps/CartNavBar';
import CartList from './childComps/CartList';
export default {
    name:'Cart',
    components:{
        CartNavBar,
        CartList
    },
    methods:{
        handleClick(){
            this.$toast("hello");        }
    }
}
</script>
<style scoped>



</style>
