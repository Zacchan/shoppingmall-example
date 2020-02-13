<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name:'Toast',
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     isShow:{
    //         type:Boolean,
    //         default:false
    //     }
    // }
    data(){
        return{
            message:'',
            isShow:false
        }
    },
    methods:{
        display(message,duration=1500){
            this.message = message;
            this.isShow = true;
            setTimeout(() => {
                this.isShow = false;
            }, duration);
        }
    }

}
</script>

<style >
.toast{
    position:fixed;
    top:50%;
    left:50%;
    background-color: rgba(0,0,0,.5);
    color:#fff;
    transform: translate(-50%,-50%);
   padding: 18px 12px;
   z-index:99;

}

</style>
