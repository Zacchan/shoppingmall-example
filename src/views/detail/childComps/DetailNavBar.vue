<template>
    <div id="detail-navbar">
        <nav-bar>
            <div class="back" slot="left" @click="handleBack">
                &lt;
            </div>
            <div slot="center" class="title">
                 <div v-for="(item,index) in titles" :key="item" class="item-list" :class="{active:index===currentIndex}" @click="handleClick(index)">
                     {{item}}
                 </div>
            </div>
        </nav-bar>
    </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    props:{
        currentInd:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
 
        }
    },
    methods:{
        handleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index);
        },
        handleBack(){
        this.$router.back(); //返回上一页
        //this.$router.go(-1);      
        }
    }
}
</script>

<style scoped>
.back{
    font-size: 20px;
}

.title{
    display: flex;
    justify-content: space-around;
    font-size:13px;
}

.active{
    color: deeppink;
}

</style>
