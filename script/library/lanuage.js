var cn = {"know" : "知道 了","see" : "去看看","message" : "消息", "finish" : "完成", "cacle" : "取消","edit" : "编辑","home" : "主页","favorite" : "关注","cart" : "购物车","me" : "我的"};
var en = {"know" : "I Know", "see" : "See", "message" : "Message", "finish" : "Finish", "cacle" : "Cancel","edit" : "Edit","home" : "Home","favorite" : "Favorite","cart" : "Cart","me" : "Me"};

/**
 *读取语言
 */
function readLanuage(){
	$('[set-lan]').each(function(){
	    var me = $(this);
	    var a = me.attr('set-lan').split(':');
	    var p = a[0];
	    var m = a[1];
	
	    var lan = global.getLanuage();
	
	    //选取语言文字
	    var t;
	    switch(lan){
	        case 'zh':
	            t = cn[m];
	            break;
	        case 'en':
	            t = en[m];
	            break;
	        default:
	            cn[m];
	    }
	
	    if(t==undefined) t = cn[m];
	    if(t==undefined) t = en[m];
	
	    if(t==undefined) return true;
	
	    switch(p){
	        case 'html':
	            me.html(t);
	            break;
	        case 'val':
	        case 'value':
	            me.val(t);
	            break;
	        default:
	            me.html(t);
	    }
	});
}

/**
 *读取语言 
 */
function get_lan(m){
    var lan = global.getLanuage();
    var t;
    switch(lan){
        case 'zh':
            t = cn[m];
            break;
        case 'en':
            t = en[m];
            break;
        default:
            t = cn[m];
    }

    if(t==undefined) t = cn[m];
    if(t==undefined) t = en[m];

    if(t==undefined) t = m;

    return t;
}
