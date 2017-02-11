(function() {
    $("#Logo-bg").css({"display": "block"});
    console.log("aa")
    
    new Vivus('LogoSVG',
               {
                start: 'autostart',
                type: 'async',
                duration: 200,
                animTimingFunction: Vivus.EASE
               }, function(){
        setTimeout(function(){
            $("#Logo-bg").fadeOut("slow");
        },500);
    });
    
})();

function imgBoxP2_2Show(){
    $("#P2_2 .img-box:last-child").fadeIn("slow");
};

//フローバーの表示、操作------------------------------
function FlowcharaMove(val){
    var off = $("footer>#Point #"+val).offset();
    console.log("footer>#Point #"+val)
    console.log(off.left)
    $('footer>#Chara').animate({'left': off.left-20}, 1500);

}

var Flag_Page = {
    "pagestart.html":1, "pageindex.html":0, "page1.html":0, "page2.html":0,
    "page2_1.html":0, "page2_2.html":0, "page3.html":0,
    "page4.html":0, "pagethanks.html":0,
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
        }
        //ページ内容のフェードアウト、ページ表示へ
        $content.fadeOut(600, function() {
            getPage(link);
            if(link != "pagethanks.html"){
                $(".next").html("NEXT");
                $('.next').fadeIn("slow");
            }
            //フローキャラの立ち位置を変える
            if(Flag_Page["pagethanks.html"] == 1){
                FlowcharaMove("THANKS");
                $('footer>#Chara').css({'transform': 'scale(1, 1)'});
            }
            else if(Flag_Page["page4.html"] == 1){ FlowcharaMove("P4"); }
            else if(Flag_Page["page3.html"] == 1){ FlowcharaMove("P3"); }
            else if(Flag_Page["page2_2.html"] == 1){ FlowcharaMove("P2_2"); }
            else if(Flag_Page["page2_1.html"] == 1){ FlowcharaMove("P2_1"); }
            else if(Flag_Page["page2.html"] == 1){ FlowcharaMove("P2"); }
            else if(Flag_Page["page1.html"] == 1){ FlowcharaMove("P1"); }
            else if(Flag_Page["pageindex.html"] == 1){ FlowcharaMove("INDEX"); }
            else if(Flag_Page["pagestart.html"] == 1){ FlowcharaMove("START"); }
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

