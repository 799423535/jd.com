import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';

$('#submit').on('click', function () {
    let password = $.md5($('[name=password]').val());
    $.ajax({
        type: "post",
        url: "http://localhost:8888/user/login",
        data: {
            username: $('[name=username]').val(),
            password: password
        },
        dataType: "json",
        success: function (data) {
            if (!data.isLogin) {
                $('.msg').html(data.msg);
                $('[name=username]').val();
                $('[name=password]').val();
            } else {
                cookie.set('username', data.username,1);
                cookie.set('username', data.password,1);
                cookie.set('isLogin', data.isLogin);
                location = "http://localhost:8888/html/home.html";
            }
        }
    });
});