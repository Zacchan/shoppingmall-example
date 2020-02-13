<template>
    <div class="shelter">

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes fadeInUp{
    from{
        opacity:0;
        transform:translate3d(0,100%,0);
    }
    to{
        opacity: 1;
        transform: translate3d(0,0,0);
    }
}
@-webkit-keyframes fadeInUp{
    from{
        opacity:0;
        transform:translate3d(0,100%,0);
    }
    to{
        opacity: 1;
        transform:translate3d(0,50%,0);
        
    }
}
.shelter{
    /* animation:fadeInUp 1s;
    -webkit-animation: fadeInUp 1s; */
    height: 100vh;
    position: absolute;
    left:0;
    right:0;
    top:0;
 
    z-index: 10;
    background: rgba(57, 56, 59, 0.7)
}


</style>
