//ライブラリファイルの初期設定---------------------------
jQuery(function($){
    $(".fancybox").attr('rel', 'group1').fancybox();
    
    var $container = $('#gallery');
    $container.imagesLoaded(function(){

        $container.masonry({
        itemSelector: '.fancybox',
        columnWidth: '.fancybox',
        isFitWidth: true,//親要素の幅に合わせてカラム数を自動調整
        percentPosition: true
        });
        
    });
});