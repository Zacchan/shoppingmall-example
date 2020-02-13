<template>
    <div v-if="Object.keys(commentsInfo).length!==0" >
        <div class="info-header">
            <div class="info-comment ">用户评价</div>
            <div class="info-more " >
                更多
                <i class="info-more-logo"></i>
            </div>
        </div>
        <div class="info-user">
            
                <img  :src="commentsInfo.user.avatar" alt="">
                <span class="user-name">{{commentsInfo.user.uname}}</span>
           
        </div>
        <div class="info-detail">
            <p class="info-description">{{commentsInfo.content}}</p>
            <div class="content">
                <span class="info-date">{{commentsInfo.created|getAccurateTime}}</span>
                <span class="info-style">{{commentsInfo.style}}</span>
            </div>
            <div v-if="commentsInfo.images" class="info-imgs">
                <img :src="item" v-for="(item,index) in commentsInfo.images" :key="index" alt="">
            </div>

        </div>
    </div>
</template>

<script>
import { formatDate } from "common/utils.js";


export default {
    name:"DetailCommentsInfo",
    props:{
        commentsInfo:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    filters:{
        getAccurateTime(time){
            //将时间戳转换成标砖时间
            const date = new Date(time*1000);
            return formatDate(date,"yyyy-MM-dd hh:mm:ss");
        }
    }

}
</script>

<style scoped>

.info-header{
    height: 40px;
    font-size: 14px;
    display:flex;
    justify-content: space-between;
    margin:2px 0;
    align-items: center;
    padding: 0 14px;
    border-top: 2px solid #eeeeee;
    border-bottom: 2px solid #eeeeee
   
}

.info-user{
    display: flex;
    align-items: center;
    font-size:14px;
    height:50px;
}

.info-user img{
    height: 35px;
    margin: 0 5px;
}
.info-detail{
    padding:2px 3px;
}

.info-detail .info-description{
    font-size: 13px;
    color:#888;
    padding: 4px;
    margin:3px 0;
    line-height: 140%;
}



.info-detail .content{

margin:4px;
font-size: 10px;
color:#aaa;

}

.info-detail span{
    
    padding-right: 10px;
}



.info-detail .info-imgs {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    
    
}


.info-detail .info-imgs img{
   
    height: 60px;
    margin:2px 3px;
}
/* .info-header .info-comment{
 flex:1;
} */


</style>
