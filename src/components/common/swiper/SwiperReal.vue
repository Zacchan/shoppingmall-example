<template>

    <div id="m-swiper">
        <div class="all-slide" @touchstart=touchStart @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
        </div>
        
        <div class="indicator">
            <div v-for="(item,index) in slideCount"  :key ="index" class="indi-item" :class="{active:index===currentIndex-1}"> </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'SwiperReal',
    props:{
        interval:{
            type:Number,
            default:4000
        },
        animDurations:{
            type:Number,
            default:300
        },
        moveRatio:{
            type:Number,
            default:0.25
        },
        showIndicator:{
            type:Boolean,
            default:true
        }
    },
    data:function(){
        return{
        slideCount:0,//元素树木，需要读取
        swiperWidth:0,//swiper的宽度
        currentIndex:1,//因为添加了slide 前面还有一个index是0
        scrolling:false,//是否正在滚动,
         swiperStyle: {}, // swiper样式
        }
    },
    mounted(){
            //1.操作dom,在前后添加slide 4+2=>6 为了顺滑过度
        setTimeout(()=>{
            this.handleDom();

            //开启定时器 用于图片轮播
            this.startTimer();

        },400)   //这个秒数要设置的久一点 不然 可能 那个图片的数量获取的是0
    },
    methods:{
        touchStart(event){
            if (this.scrolling) return;

            //停止计时器
            this.endTimer();

            //保存开始时的滚动位置
            this.startX = event.touches[0].pageX //pageX clientX鼠标点击的x
        },
        touchMove(event){
            //计算拖动距离
            this.currentX = event.touches[0].pageX;
            this.distance = this.currentX - this.startX;
            let currentPosition = -this.currentIndex*this.swiperWidth;
            let moveDistance = currentPosition+this.distance;

            this.setTransform(moveDistance);

        },
        touchEnd(e){
            let currentMove = Math.abs(this.distance);
            if(this.distance===0){return}
            else if(this.distance>0&&currentMove>this.swiperWidth*this.moveRatio){
                //往右边移动 及往左边看图片
                this.currentIndex--;
            }else if(this.distance<0&&currentMove>this.swiperWidth*this.moveRatio){
                //往右边移动 及往左边看图片
                this.currentIndex++;
            }

           // this.setTransform(-this.currentIndex * this.swiperWidth)
            this.scrollContent(-this.currentIndex * this.swiperWidth);
            this.startTimer();

        },
        startTimer(){

            this.playTimer = setInterval(()=>{
                this.currentIndex++;
                //转换内容
                this.scrollContent(-this.currentIndex*this.swiperWidth);
            },this.interval)
        },
        endTimer(){
            clearInterval(this.playTimer);
        },

        scrollContent(newPosition){
            //设置这个滚动条在滚动 滚动的时候用不了触摸
            this.scrolling = true;

            //开始滚动画

            this.swiperStyle.transition = 'transform '+this.animDurations+'ms';
            this.setTransform(newPosition);

            //判断滚动位置
            this.checkPosition();

            //滚动完成
            this.scrolling = false;

        },
        checkPosition(){
            //这个setTimeout是为了让它成功转到另一张图片,秒数就是设好的动画时间
            setTimeout(()=>{
                this.swiperStyle.transition = '0ms';
                if(this.currentIndex>=this.slideCount+1){
                    this.currentIndex  = 1;
                    this.setTransform(-this.currentIndex*this.swiperWidth);
                }else if(this.currentIndex<=0){
                    this.currentIndex = this.slideCount
                    this.setTransform(-this.currentIndex*this.swiperWidth);
                    }
                },this.animDurations)
        },

        handleDom(){
            // let swiperEl = document.getElementsByClassName['all-slide']
            let swiperEl;
            let slidesEl;
            
             swiperEl = document.getElementsByClassName('all-slide')[0];
             slidesEl = swiperEl.getElementsByClassName('slide');
           
            //console.log(swiperEl.style);
            //保存数量 4个
            this.slideCount = slidesEl.length;
            

           // console.log(this.slideCount);
            
            // console.log(this.slideCount )
            //如果count>1个 在前后分别添加一个slide

            if(this.slideCount>1){        
                let cloneNewFirst = slidesEl[this.slideCount-1].cloneNode(true);
                let cloneNewLast = slidesEl[0].cloneNode(true);
                swiperEl.insertBefore(cloneNewFirst,slidesEl[0]);
                swiperEl.appendChild(cloneNewLast);

                this.swiperWidth = swiperEl.offsetWidth;
                this.swiperStyle = swiperEl.style;
                
            }

            //让swiper元素 显示的是第二个元素，因为现在新添加了一个最后的元素
            //所以要右移一个swiper元素的距离 就是-*width元素

            //调用一个移动的方程
            this.setTransform(-this.currentIndex*this.swiperWidth);
           // console.log(-this.currentIndex*this.swiperWidth)
            
        },

        setTransform(newposition){
            this.swiperStyle.transform = `translate3d(${newposition}px,0,0)`;//translate(${newposition},0)
            this.swiperStyle['-webkit-transform'] = `translate3d(${newposition}px,0,0)`
            this.swiperStyle['-ms-transform'] = `translate3d(${newposition}px,0,0)`
            this.swiperStyle['-o-transform'] = `translate3d(${newposition}px,0,0)`
            this.swiperStyle['-moz-transform'] = `translate3d(${newposition}px,0,0)`
        }
    }



}
</script>





<style>

#m-swiper{
    overflow: hidden;
    position: relative;
    
    
}

.all-slide{
    display: flex;
}



.indicator{
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
   
}
.indi-item{
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    line-height: 8px;
     background-color: #fff;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
}
.indi-item.active{
    background-color: #ff0000;
}

</style>
