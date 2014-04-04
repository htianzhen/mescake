(function() {
  var jqFristSelection = $($('.js_choose_weight')[0]);
  var attr = jqFristSelection.data('attr');
  var getPriceByAttr = function(attr){
	  window.ATTR = attr;
	  MES.get({
		mod : 'goods',
		action : 'get_price_by_weight',
		param : {
		  id : window.GOODS_ID,
		  attr : attr,
		  number : 1
		},
		callback : function(d) {
		  var price = d.result;
		  $('#price_container').show();
		  $('#staff_price').html(price);
		}
	  });
  }
	  if(window.GOODS_ID==CAT_CAKE){
		var _html='<li class="current">\
					  <p class="flower-mark">（附赠精美花环一枚）</p>\
					</li>';
		$('#more_list').append(_html).show();
		$('body').addClass('cat-mark');
	}
	jqFristSelection.addClass('current');
	jqFristSelection.find('em').addClass('radiobox-checked');
	getPriceByAttr(attr);
  
  var lock =false;
  if(window.GOODS_ID!=CAT_CAKE){
	  $(document).click(function(e){
		 if(lock){
			return;
		 }
		$('#more_list').hide();
	  });

	  $('#show_more_staff').click(function(){
		lock =true;
		$('#more_list').show();
		var mr = ($('#buy_area').width() - $('#more_list').width()-40)/2;
		$('#more_list').css('margin-left',mr);
		setTimeout(function(){
			lock =false;
		},20)
	  });
  }

  $('.js_choose_weight').click(function(){
	$('#more_list').hide();
	var jqThis = $(this);
	var attr = jqThis.data('attr');
	window.ATTR = attr;
	//clear old style
	$('#buy_area').find('li').removeClass('current');
	$('#buy_area').find('em').removeClass('radiobox-checked');
	
	jqThis.addClass('current');
	jqThis.find('em').addClass('radiobox-checked');
	getPriceByAttr(attr);
  });
  function addToCart(goodsId, callback) {
    var goods = {};
    var spec_arr = [];
    var fittings_arr = [];
    var number = 1;
    var formBuy = document.forms['ECS_FORMBUY'];
    var quick = 0;

    // 检查是否有商品规格
    goods.quick = 1;
    //商品重量
    goods.spec = window.ATTR||[];
    goods.goods_id = window.GOODS_ID;
    //数量
    goods.number = 1;
    goods.parent = 0;
    //(typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
	MES.post({
		mod:'order',
		action:'add_to_cart',
		param:{
		  goods : $.toJSON(goods),
		  goods_id : goodsId,
		  parent_id :0
		},
		callback:function(){
		   callback();
		}
	});
  }


  $('#order_now_btn').click(function() {
    addToCart(window.GOODS_ID, function() {
      MES.reload("/checkout");
    });
	return false;
  });

  $('#add_to_cart_btn').click(function() {
    addToCart(window.GOODS_ID, function() {
      require(['ui/tip'], function(tip) {
        new tip('该商品已经添加到购物车');
      });
	  MES.getGoodsCount();
    });
    return false;
  });
  var _html = '<div class="dialog" style=" z-index:1000; width:680px; margin-left:-340px; top:80px;" id="cat_dialog">\
				  <div class="dialog-head">\
					<p class="dia-title">猫蛋糕的诞生</p>\
					<a href="#" id="cat_close" class="close-ico">X</a>\
				  </div>\
				  <div class="dialog-con">\
					<div class="mv-container">\
					  <object width="600" height="400" type="application/x-shockwave-flash" data="http://www.tudou.com/v/GGTaM1Q_1Fs/v.swf"><param value="http://www.tudou.com/v/GGTaM1Q_1Fs/v.swf" name="movie"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="flashvars" value="autoPlay=false&amp;hd=1"></object>\
					</div>\
				  </div>\
				</div>'
  $('#cat_video').click(function(){
	$('body').append(_html).css('overflow','hidden');
	$('body').append('<div class="gray-bg" style="z-index:100;"></div>');
	$('#cat_close').click(function(){
		$('#cat_dialog').remove();
		$('.gray-bg').remove();
		$('body').css('overflow','auto');
	  });
  });
})(); 