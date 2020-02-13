import { ADD_COUNTER,ADD_TO_CART,GET_CART_LIST
} from './mutation-types';
import { resolve } from 'url';

export default {
        addCart(context,payload){
            return new Promise((resolve,reject)=>{
                for(let item of context.state.cartList){
                    if(item.sku.xdSkuId===payload.sku.xdSkuId){
                        context.commit(ADD_COUNTER,[item,payload]);
                        resolve('当前商品数量+'+payload.counter);
                        return;
                                }
                        }
                    context.commit(ADD_TO_CART,payload); 
                    resolve('添加了新的商品'+'☑️ '); 
                    })    
                },
        getCart(context,payload){
        context.commit(GET_CART_LIST,payload);
        }
}