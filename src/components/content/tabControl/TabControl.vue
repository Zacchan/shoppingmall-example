<template>
    <div class="tab-control">
        <div class="tab-control-item"  v-for="(item,index) in titles" :key="index" @click="handleClick(index,$event)" :class="{active:currentIndex===index}">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        handleClick(index,event){
            this.currentIndex = index;
            this.$emit('tabClick',index);
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    justify-content: space-around;
  
}
.tab-control-item{
    /* flex:1 */
    height:35px;
    line-height: 35px;
    font-size:15px;
    padding:0 6px;
}
.tab-control-item.active{
   color: var(--color-high-text);
   box-sizing: border-box;
   border-bottom: 2px solid deeppink;
   
}


</style>
