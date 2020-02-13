<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
         pullUpLoad:{
                type:Boolean,
                default:false
            }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,   //能不能点击到 scroll里面的东西
            probeType:this.probeType, //获取y  2或3
            pullUpLoad:this.pullUpLoad//到底部会不会回调
           
        });

        if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position=>{
            this.$emit('scroll',position);
        }))
        }
        this.scroll.on('pullingUp',()=>{
            // console.log("上啦完成");
            this.$emit('pullingup');
        })
    },
    methods:{


        getCurrentY(){
            return this.scroll.y?this.scroll.y:0
        },
        scrollTo(x,y,time=300){
           if(this.scroll){
               this.scroll.scrollTo(x,y,time)
           };
        },
        finishPullUp(){
          if(this.scroll)
          {
              this.scroll.finishPullUp(); // //上啦加载更多 下面的要刷新
          }
        },
        refresh(){
           if(this.scroll){
               this.scroll.refresh();
           }
           console.log("打印");
        }
    }

}
</script>

<style>

</style>
