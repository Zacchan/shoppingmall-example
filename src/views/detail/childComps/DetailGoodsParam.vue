<template>
    <div id="goods-param" v-if="Object.keys(paramInfo).length!==0">
       
        <table class="detail-sizes" v-for="(tab,indet) in paramInfo.sizes" :key="indet">
            <tr v-for="(tr,inder) in tab" :key="inder">
                <td v-for="(td,inded) in tr" :key="inded">
                    {{td}}
                </td>
            </tr>

       </table>


       <table class="detail-infos">
           <tr v-for="(info,index) in paramInfo.infos" :key="index">
               <td>{{info.key}}</td>
               <td>{{info.value}}</td>
           </tr>
       </table>

       

    </div>
</template>

<script>
export default {
    name:'DetailGoodsParam',
    props:{
        paramInfo:{
            type:Object,
            default(){
                return {}
            }   
          }
    }

}
</script>

<style scoped>

.detail-sizes tr{

}
table{
    width: 100%;
    
    border-spacing: 0;
    box-sizing: border-box;
    margin: 4px 0;
}


.detail-infos tr,.detail-sizes tr{
    font-size: 14px;
    margin: 4px; 
}

.detail-sizes tr{
   
}

.detail-sizes td{
   border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    padding-left: 2px;
}



.detail-infos td:nth-child(1),.detail-sizes td:nth-child(1){
    width: 100px;
    text-align: left;
}

.detail-sizes tr:nth-child(4) td{
    border-bottom: 1px solid #aaa;
}

.detail-infos td:nth-child(2){
    color:deeppink;
}
.detail-infos td{
    height: 50px;
    border-top: 1px solid #eeee;
}



</style>
