(function() {
    $("#Logo-bg").css({"display": "block"});
    console.log("aa")
    setTimeout((function(){
        $("#Logo-bg").fadeOut("slow");
    }), 1000);
})();

function imgBoxP2_2Show(){
    $("#P2_2 .img-box:last-child").fadeIn("slow");
};

//フローバーの表示、操作------------------------------
function FlowcharaMove(){
    
}

// Charaの幅を取得して代入
var FlowcharaCurrent;
var FlowcharaWidth = $('footer>#Chara').outerWidth();
var FlowPoint = 6;
console.log(FlowcharaWidth);
 
// NEXTボタンが押されたとき
$('footer>#Chara').click(function(){
  FlowcharaCurrent += FlowcharaWidth;
  $('.slideSet').animate({
//      marginLeft: "20px";
  });
});

var Flag_Page = {
    "pageindex.html":0, "page1.html":0, "page2.html":0,
    "page2_1.html":0, "page2_2.html":0, "page3.html":0,
    "page4.html":0,
};

//NEXTで次のページへ遷移------------------------------
$(function(){
	//ページを表示させる箇所の設定
	var $content = $('.pageDisplay');
	//ボタンをクリックした時の処理
	$(document).on('click', '.next', function(event) {
        $('.next').fadeOut("slow");
        //        $(".next").stop().animate({opacity:'0'},500);
        //まだ行ってないページのリンク先を検索、保存
        for(var f in Flag_Page){
            if(!Flag_Page[f]){
                var link = f;
                Flag_Page[f] = 1;
                break;
            }
            var link = "pagethanks.html";
        }
        //ページ内容のフェードアウト、ページ表示へ
        $content.fadeOut(600, function() {
            getPage(link);
            if(link != "pagethanks.html"){
                $(".next").html("NEXT");
                $('.next').fadeIn("slow");
    //            $(".next").stop().animate({opacity:'1'},500);
            }
        });		
	});
	//初期設定
	getPage("pagestart.html");
 
	//ページを取得してくる関数
    function getPage(elm){
    	$.ajax({
            type: 'GET',
            url: elm,
            dataType: 'html',
            success: function(data){
                $content.html(data).fadeIn(600);
                var $container = $('img');
                $container.imagesLoaded(function(){
                    //page1の設定---------------------------------
                    if(elm == "page1.html"){
                        $.each($("#P1 .img-box"), function(i, val) {
                            var w = $(val).innerWidth();
                            var h = $(val).innerHeight();
                            $(val).css({
                                'width':w,
                                'height':h
                            })
                        });
                    }else if(elm == "page2_1.html"){
                        //page2-1の設定---------------------------------
                        jQuery(function($){
                            $(".fancybox").attr('rel', 'group1').fancybox();

                            var $container = $('#P2_1 #gallery');
                            $container.imagesLoaded(function(){

                                $container.masonry({
                                itemSelector: '.fancybox',
                                columnWidth: 8,
                                isFitWidth: true,//親要素の幅に合わせてカラム数を自動調整
                                percentPosition: true
                                });
                            });
                        });
                    }else if(elm == "page2_2.html"){
                        $.each($("#P2_2 .img-box"), function(i, val) {
                            var w = $(val).innerWidth();
                            var h = $(val).innerHeight();
                            $(val).css({
                                'width':w,
                                'height':h
                            })
                        });
                    }
                });
            },
            error:function() {
                       alert('問題がありました。');
                   }
    	});
    }
});

