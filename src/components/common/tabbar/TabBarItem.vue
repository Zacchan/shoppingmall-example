 <template>
    <div class="tab-bar-item" :style="activeStyle" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :class="{active:isActive}">
            <slot name="item-text"></slot>
        </div>
    </div>
 </template>

<script>

export default {
    name:"TabBarItem",
    data(){
        return{
            
        }
    },
    computed:{
        isActive(){
            return ('.'+this.$route.path).indexOf(this.path)!==-1;
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{};
        }
    },
    props:{
        path:String,
        activeColor: {
            type:String,
            default:'red'
        }
    },
    methods:{
        itemClick(){
            //this.$router.replace(this.path)
            //this.$router.push//history模式    
            this.$router.replace(this.path);
            const arr = Array.from(this.path);
            arr.splice(0,1);           
            // console.log(this.$route.path.indexOf(arr.join('')));
            // console.log(('.'+this.$route.path)+' '+this.path);          
            // console.log(('.'+this.$route.path).indexOf(this.path));          
            if('.'+this.$route.path!=this.path)
                {   
             this.$router.replace(this.path);                                   
                }    
        }
    }
}
</script>

<style scoped>
.tab-bar-item{
  /* flex:1;*/
  text-align: center ;
  height: 49px;
  font-size:14px;

}
.tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 2px;
}
/* .active{
    color:#ff0000
} */
</style>

