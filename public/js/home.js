import './library/jquery.js';
import './library/jquery.load.js';
import './library/tabs.js';
import 'https://unpkg.com/swiper/swiper-bundle.js';
//大轮播图

(() => {
    var mySwiper = new Swiper('.slider .swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        pagination: {
            el: '.slider .swiper-pagination',
            clickable: true
        },
        loop: true,
        autoplay: true,
        fadeEffect: {
            crossFade: true,
        }
    })
    
})();
//小轮播图
(() => {
    let certifySwiper = new Swiper('#certify>.swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '#certify .swiper-pagination',
            //clickable :true,
        },
        on: {
            progress: function (progress) {
                for (let i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    let modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    let translate = slideProgress * modify * 260 + 'px';
                    let scale = 1 - Math.abs(slideProgress) / 5;
                    let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function (transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }

    })

})();
//懒加载
$(function() {
    $("img.lazy").lazyload({effect: "fadeIn",});
});
//菜单栏mouseover事件
$('#left-item>li').hover(function(){
    let index=$('#left-item>li').index(this);
    $('#nav-sec').removeClass('hid');
    $('#nav-sec>div').eq(index).removeClass('hid');
},function(){
    let index=$('#left-item>li').index(this);
    $('#nav-sec').addClass('hid');
    $('#nav-sec>div').eq(index).addClass('hid');
});
//tabs
$('.tabs').tabs({
    ev:"mouseover"
});
//楼梯

$('#list>li>a').on('click', function () {
    let top = $('#' + $(this).attr('title')).offset().top;
    $('html').animate({
        scrollTop: top
    }, 500);
   
});
$(window).on('scroll', function () {
    let top=$('html').scrollTop()
    if(top<600)$('#list').css('display','none');
    if(top>=600)$('#list').css('display','block');
    if(top<900){
        let a=$('#list>li>a');
        a.removeClass('active');
        a.first().addClass('active')
    } 
    if(top>900&&top<=990 ){
        let a=$('#list>li>a');
        a.removeClass('active');
        a.eq(1).addClass('active')
    } 
    if(top>990&&top<=1553 ){
        let a=$('#list>li>a');
        a.removeClass('active');
        a.eq(2).addClass('active')
    }
    if(top>1553&&top<=2593 ){
        let a=$('#list>li>a');
        a.removeClass('active');
        a.eq(3).addClass('active')
    }
});