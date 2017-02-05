(function() {
    $("#Logo-bg").css({"display": "block"});
    console.log("aa")
    setTimeout((function(){
        $("#Logo-bg").fadeOut("slow");
    }), 1000);
})();

//フローバーの表示、操作
function FlowcharaMove(){
    
}

// Charaの幅を取得して代入
var FlowcharaWidth = $('footer>#Chara').outerWidth();
var FlowPoint = 6;

// アニメーションを実行する独自関数
var sliding = function(){
  $('.slideSet').animate({
    left: slideCurrent * -slideWidth
  });
}
 
// 次へボタンが押されたとき
$('.slider-next').click(function(){
  slideCurrent++;
  sliding();
});