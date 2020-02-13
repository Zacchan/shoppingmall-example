export function debounce(fun,delay){
    let timer = null;
    return function(...args){
        if(timer)clearTimeout(timer);
        timer = setTimeout(()=>{
            //console.log("这个this是什么",this)
            fun.apply(this,args);
        },delay)
    }
}

export function throttle(fun,delay){
    let timer = null;
    return function(...args){
        if(timer)return;
        timer = setTimeout(()=>{
            fun.apply(this,args);
            clearTimeout(timer);
        },delay)
        
    }
}




export function formatDate(date,fmt){
 if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,date.getFullYear().toString().substr(4-RegExp.$1.length));

let remainInfo = {   
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
}

            for(let reg in remainInfo){
                if(new RegExp(`(${reg})`).test(fmt)){
                    let str = remainInfo[reg].toString();
                    fmt = fmt.replace(RegExp.$1,addZero(str));
                }
            }
    }

    function addZero(str){   //这个算法用来处理 那些只有一个数字的时间 会默认添加0
        return ('00'+str).substr(str.length);
    }
    return fmt;
}