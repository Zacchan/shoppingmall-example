<template>
     <div id="tab-bar">
         <slot></slot>
    </div>
</template>
<script>

export default {
  name: 'TabBar'
}
</script>

<style>

/* @import "../../assets/css/base.css"; */

#tab-bar{
  display: flex;
  justify-content:space-around;
   background-color: #eee;
   position:fixed;
   left: 0;
   bottom: 0;
   right: 0;
   box-shadow: 0px -3px 1px rgba(100,100,100,.1)
   
}


</style>