(function ($) {
    $.fn.extend({
        tabs: function (parm) {
           let  defaults = {
                ev: 'click',
                active: 'active',
                content: 'active'
            }
            $.extend(defaults, parm);
            let list = $(this).children('ul').children('li');
            let divs = $(this).children('div');
            list.on(defaults.ev, function () {
                let _index = list.index(this);
                $(this).children('a').addClass('active');
                $(this).siblings().children('a').removeClass(defaults.active);      
                divs.eq(_index).addClass(defaults.content).siblings().removeClass(defaults.content);
            });
        }
    });
})(jQuery);