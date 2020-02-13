import { GET_CART_LIST,GET_CART_LIST_ITEM,GET_ACCOUNT,GET_SEL_CART_LIST_LENGH } from "./mutation-types";

export default{
    getCartLength(state){
        return state.cartList.length;
    },
    [GET_CART_LIST_ITEM](state){
        return state.cartList;
    },
    [GET_ACCOUNT](state){
        return state.totalAccount;
    },
    [GET_SEL_CART_LIST_LENGH](state){
        return state.selectedCartList.length
    }
    

}