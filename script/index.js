//フローバーの表示、操作------------------------------
function FlowcharaMove(val) {
  var off = $("footer>#Point #" + val).offset();
  console.log("footer>#Point #" + val)
  console.log(off.left)
  $('footer>#Chara').animate({
    'left': off.left - 20
  }, 1500);

}

//NEXTで次のページへ遷移------------------------------
var Flag_Page = { // ページのフラグ、1=訪問済み/0=未訪問
  "pagestart.html": 1,
  "pageindex.html": 0,
  "page1.html": 0,
  "page2.html": 0,
  "page2_1.html": 0,
  "page2_2.html": 0,
  "page3.html": 0,
  "page4.html": 0,
  "pageend.html": 0,
};

$(function() {
    // ロゴ表示
  $("#Logo-bg").css({
    "display": "block"
  });
  new Vivus('LogoSVG', {
    start: 'autostart',
    type: 'async',
    duration: 100,
    animTimingFunction: Vivus.EASE
  }, function() {
    setTimeout(function() {
      $("#Logo-bg").fadeOut("slow");
    }, 200);
  });

  //ページを表示させる箇所の設定
  var $content = $('.page-display');

  //ページ遷移ボタンをクリックした時の処理
  $(document).on('click', '.next', function(event) {
    $('.next').fadeOut("slow");
    //まだ行ってないページのリンク先を検索、保存
    for (var f in Flag_Page) {
      if (!Flag_Page[f]) {
        var link = f;
        Flag_Page[f] = 1;
        break;
      }
    }
    //ページ内容のフェードアウト、ページ表示へ
    $content.fadeOut(600, function() {
      getPage(link);
      if (link != "pageend.html") {
        $(".next").html("NEXT");
        $('.next').fadeIn("slow");
      }

      //フローキャラの立ち位置を変える
      if (Flag_Page["pageend.html"]) {
        FlowcharaMove("END");
        $('footer>#Chara').css({
          'transform': 'scale(1, 1)' // 反転させて終了の合図
        });
      } else if (Flag_Page["page4.html"]) {
        FlowcharaMove("P4");
      } else if (Flag_Page["page3.html"]) {
        FlowcharaMove("P3");
      } else if (Flag_Page["page2_2.html"]) {
        FlowcharaMove("P2_2");
      } else if (Flag_Page["page2_1.html"]) {
        FlowcharaMove("P2_1");
      } else if (Flag_Page["page2.html"]) {
        FlowcharaMove("P2");
      } else if (Flag_Page["page1.html"]) {
        FlowcharaMove("P1");
      } else if (Flag_Page["pageindex.html"]) {
        FlowcharaMove("INDEX");
      } else if (Flag_Page["pagestart.html"]) {
        FlowcharaMove("START");
      }
    });
  });
  //初期設定
  getPage("pagestart.html");
  console.log("aa");

  //ページを取得してくる関数
  function getPage(elm) {
    $.ajax({
      type: 'GET',
      url: elm,
      dataType: 'html',
      success: function(data) { // データ取得に問題なければページ内容表示
        $content.html(data).fadeIn(600);
        var $container = $('img');
        $container.imagesLoaded(function() {
          //page1の設定---------------------------------
          if (elm == "page1.html") {
            $.each($("#page1 .img-box"), function(i, val) {
              var w = $(val).innerWidth();
              var h = $(val).innerHeight();
              $(val).css({
                'width': w,
                'height': h
              })
            });
          } else if (elm == "page2_1.html") {
            //page2-1の設定---------------------------------
            jQuery(function($) {
              $(".fancybox").attr('rel', 'group1').fancybox();

              var $container = $('#page2-1 #gallery');
              $container.imagesLoaded(function() {

                $container.masonry({
                  itemSelector: '.fancybox',
                  columnWidth: 8,
                  isFitWidth: true, //親要素の幅に合わせてカラム数を自動調整
                  percentPosition: true
                });
              });
            });
          } else if (elm == "page2_2.html") {
            $.each($("#page2-2 .img-box"), function(i, val) {
              var w = $(val).innerWidth();
              var h = $(val).innerHeight();
              $(val).css({
                'width': w,
                'height': h
              })
            });
          }
        });
      },
      error: function() {
        alert('ページ内容を取得できませんでした。');
      }
    });
  }
});