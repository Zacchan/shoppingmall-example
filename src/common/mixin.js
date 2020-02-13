import{debounce} from 'common/utils'

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  
    data(){
        return{
            itemImgListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scrollEl.refresh,100);
        this.itemImgListener = ()=>{
            this.refresh()
        };
        this.$bus.$on('itemImgLoad',this.itemImgListener)
    }
}



export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{ 
            showPullTop:false,
        }
    },
    methods:{
    
        backClick(){
            this.$refs.scrollEl.scrollTo(0,0,500);
            //console.log(this.$refs.scrollEl.scrollTo(0,0,500));//500毫秒/第三个参数      
        }
    }

}