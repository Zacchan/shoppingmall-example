import {request} from './request'

export function getDetail(iid){

    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}



export class Goods{
    constructor(itemInfo,columns,services){
    this.title = itemInfo.title;    
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
    }
}

export class shop{
    constructor(shopInfo){
        this.shopUrl = shopInfo.shopUrl;
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}


export  class GoodsParam{
    constructor(info,rule){
        this.image=info.images?info.images[0]:'';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export function getRecommends(){
    return request({
        url:'/recommend'
    })
}

export class CartProductInfo{
    constructor(product,exactProduct,goodsCount){
        this.title = product.title;
        this.sku = product.skus[exactProduct];
        this.goodsCount = goodsCount;
    }
}

// export class CommentsInfo{
//     constructor(info){
//         this.CommentsInfo = info
//     }
// }

// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;

//     }
// }

// const p = new Person('why',18)