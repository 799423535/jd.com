import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
import {baseUrl} from './library/conf.js';

$('#submit').on('click', function () {
    let password = $.md5($('#password').val());
    $.ajax({
        type: "post",
        url: `${baseUrl}/user/login`,
        data: {
            username: $('#username').val(),
            password: password
        },
        dataType: "json",
        success: function (data) {
            if (!data.isLogin) {
                $('#err').html(data.msg);
                $('#username').val('');
                $('#password').val('');
            } else {
                cookie.set('username', data.username);
                cookie.set('isLogin', data.isLogin);
                location = `${baseUrl}/html/home.html`;
            }
        }
    });
});