<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="" srcset="" >
    </div>
</template>

<script>
export default {
    name:'BackTop',
    props:{
        appearPosition:{
            type:Number,
            default:0
        }
    },
    methods:{
        // backClick(){

        // }
    }
}
</script>

<style scoped>
.back-top{
    position: fixed;
    right:10px;
    bottom:55px;
}

.back-top img{
    width: 43px;
    height: 43px;
}

</style>
