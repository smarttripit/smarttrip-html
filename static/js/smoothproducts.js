// Add some markup & set some CSS
$('.sp-wrap').append('<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>');//在.sp-wrap这个div后面加2个div
$('.sp-wrap a').appendTo('.sp-thumbs');
$('.sp-thumbs a:first').addClass('sp-current').clone().removeClass('sp-current').appendTo('.sp-large');

$('.sp-wrap').css('display', 'inline-block');
var slideTiming = 300;
var maxWidth = $('.sp-large img').width();

// Prevent clicking while things are happening
$(document.body).on('click', '.sp-thumbs' ,function(event){
    event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
});

// Clicking a thumbnail
    $(document.body).on('click', '.sp-tb-active a' ,function(event){
    $('.sp-current').removeClass();
    $('.sp-thumbs').removeClass('sp-tb-active');
    //$('.sp-zoom').remove();

    var currentHeight = $('.sp-large').height();
    $('.sp-large').css({
        overflow: 'hidden',
        height: currentHeight + 'px'
    });

    $('.sp-large a').remove();
    $(this).addClass('sp-current').clone().hide().removeClass('sp-current').appendTo('.sp-large').fadeIn(slideTiming, function () {
        var autoHeight = $('.sp-large img').height();
        $('.sp-large').height(currentHeight).animate({
            height: autoHeight
        }, 'fast', function () {
            $('.sp-large').css('height', 'auto');
        });

        $('.sp-thumbs').addClass('sp-tb-active');
    });
    event.preventDefault();
});



