(function() {
    $("#Logo-bg").css({"display": "block"});
    console.log("aa")
    setTimeout((function(){
        $("#Logo-bg").fadeOut("slow");
    }), 1000);
})();

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
    "page4.html":0, "page5.html":0,
};

//NEXTで次のページへ遷移------------------------------
$(function(){
	//ページを表示させる箇所の設定
	var $content = $('.pageDisplay');
	//ボタンをクリックした時の処理
	$(document).on('click', '.next', function(event) {
        $(".next").fadeOut("slow");
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
                $(".next").fadeIn("slow");
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
            },
            error:function() {
                       alert('問題がありました。');
                   }
    	});
    }
});

