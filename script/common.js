//ライブラリファイルの初期設定---------------------------
jQuery(function($){
    $(".fancybox").attr('rel', 'group1').fancybox();
    
    var $container = $('#gallery');
    $container.imagesLoaded(function(){
//        $.each($("#gallery a"), function(i, val) {
//            var w = $(val).width()/10;
//            var h = $(val).height()/10;
//            console.log("number is"+i);
//            console.log("w is "+w+" h is "+h);
//            $(val).css({
//                'width':w,
//                'height':h
//            })
//        });

        $container.masonry({
        itemSelector: '.fancybox',
        columnWidth: '.fancybox',
        isFitWidth: true,//親要素の幅に合わせてカラム数を自動調整
        percentPosition: true
        });
        
    });
});