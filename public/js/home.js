import './library/jquery.js';
import './library/jquery.load.js';
import './library/tabs.js';
import './library/swiper.js';
import { baseUrl } from './library/conf.js';
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
$(function () {
    $("img.lazy").lazyload({ effect: "fadeIn" });
});
//菜单栏mouseover事件
$('#left-item>li').hover(function () {
    let index = $('#left-item>li').index(this);
    $('#nav-sec').removeClass('hid');
    $('#nav-sec>div').eq(index).removeClass('hid');
}, function () {
    let index = $('#left-item>li').index(this);
    $('#nav-sec').addClass('hid');
    $('#nav-sec>div').eq(index).addClass('hid');
});
//tabs
$('.tabs').tabs({
    ev: "mouseover"
});
//楼梯

$('#list>li>a').on('click', function () {
    let top = $('#' + $(this).attr('title')).offset().top;
    $('html').animate({
        scrollTop: top-50
    }, 500);

});
$(window).on('scroll', function () {
    let top = $('html').scrollTop()
    if (top < 600) $('#list').css('display', 'none');
    if (top >= 600) $('#list').css('display', 'block');
    if (top < 900) {
        let a = $('#list>li>a');
        a.removeClass('active');
        a.first().addClass('active')
    }
    if (top > 900 && top <= 990) {
        let a = $('#list>li>a');
        a.removeClass('active');
        a.eq(1).addClass('active')
    }
    if (top > 990 && top < 2500) {
        let a = $('#list>li>a');
        a.removeClass('active');
        a.eq(2).addClass('active')
    }
    if (top >= 2500) {
        let a = $('#list>li>a');
        a.removeClass('active');
        a.eq(3).addClass('active')
    }
    if (top >= 3600) {
        let a = $('#list>li>a');
        a.removeClass('active');
        a.eq(4).addClass('active')
    }







    if (top >= 900){
        $('#search').css('display','block');
    }
    if(top<900){
        $('#search').css('display','none');
    }
});

//首页数据渲染
(function () {
    $.ajax({
        type: "get",
        url: `${baseUrl}/product`,
        dataType: "json",
        success: function (res) {
            res.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture)[0];
                $('#con-left-ul>li').eq(i).children('a').attr('href', `${baseUrl}/html/product.html?pid=${res[i].pid}`);
                $('#con-left-ul>li').eq(i).children('a').children('.top').children('img').attr('src', `../${picture.src}`);
            });
        }
    });
})();

//焦点图滚动
(function () {
    fns();
    $('.scroll').hover(() => {
        $('.scroll').stop();
        let left = parseFloat($('.scroll').css('left'));
        let ra = left / 2000;
        let t = -($('.scroll-bar').width() - $('.scroll-points').width()) * ra;
        $('.scroll-points').css('left', t + 'px');
        
    }, () => {
        fns();
    });
    function fns() {
        let s = (2000 - $('.scroll').scrollLeft()) * 12.5;
        $('.scroll').animate({
            left: '-2000'
        }, s, function () {
            $('.scroll').css('left', '0');
            fns();
        });
    }
    
})();

//tabs切换
$('#tabs_self>li>a').on('mouseover',function(){
     let tabli=$('#tabs_self>li');
     let allA=$('#tabs_self>li>a');
     allA.removeClass('active');
     $(this).addClass('active');
     let index=tabli.index($(this).parent());
     $('#ac01').children().removeClass('active').eq(index).addClass('active');
});


$('#input_on').on('input',function(){
    let ipt=$(this);
    $.ajax({
        type: "get",
        url: "/product/getMes",
        data: {'mes':ipt.val()},
        dataType: "json",
        success: function (res) {
             if(res.length){
                  let tem='';
                  res.forEach((elm,i)=>{
                     tem+=`
                    <li><a href="${baseUrl}/html/product.html?pid=${elm.pid}">${elm.pname}</a></li>
                    `;
                  });
                  $('#content').html(tem).removeClass('hid');
             }else{
                $('#content').html('');
             }
        }
    });
});
$('body').on('click',function(){
    $('#content').addClass('hid');
});

$(window).on('blur',function(){
    $('#content').addClass('hid');
});