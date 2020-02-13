
import { ADD_COUNTER,ADD_TO_CART,GET_CART_LIST,ADD_TO_SELECTED_CART,GET_ACCOUNT,DELETE_FROM_SELECTED_CART,
    CAL_ACCOUNT,ADD_ALL_TO_CART,DELETE_ALL_FROM_CART,DELETE_ALL_FROM_FAKE_CART
} from './mutation-types';


export default {
    [ADD_COUNTER](state,payload){
            
        payload[0].goodsCount+=payload[1].goodsCount;
    },
    [ADD_TO_CART](state,payload){
        payload.isSelected = false;
        state.cartList.push(payload);
    },
    [GET_CART_LIST](state,payload){
        payload(state.cartList);
    },
    [ADD_TO_SELECTED_CART](state,payload){
        state.selectedCartList.push(payload);
        // console.log(state.selectedCartList);
    
    },
    [DELETE_FROM_SELECTED_CART](state,payload){
     
       for(let i in state.selectedCartList){

            if(state.selectedCartList[i].sku.xdSkuId===payload.sku.xdSkuId){
                state.selectedCartList.splice(i,i+1);
                console.log(state.selectedCartList);
                return;
            }
    }
},

    [CAL_ACCOUNT](state,payload){
        let account = 0;
        if(state.cartList.length>0){
        state.totalAccount.symbol  = state.cartList[0].sku.currency;
        }
        state.selectedCartList.reduce((pre,current,currentIndex)=>{
           return account = account+Number(current.sku.nowprice)/100 * current.goodsCount;
        },account)
        state.totalAccount.account = account.toFixed(2);
        // state.totalAccount.symbol = state.selectedCartListCartList[0].sku.currency;
    },
    [DELETE_ALL_FROM_CART](state,payload){
       state.selectedCartList = [];
    },
    [ADD_ALL_TO_CART](state,payload){
        state.selectedCartList = state.cartList.slice(0);
    },
    [DELETE_ALL_FROM_FAKE_CART](state,payload){
        state.cartList = [];
    }
}