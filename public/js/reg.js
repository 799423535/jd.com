import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
$('#submit').on('click', function () {
    let password = $.md5($('[name=password]').val());
    $.ajax({
        type: "post",
        url: "http://localhost:8888/user/reg",
        data: {
            username: $('[name=username]').val(),
            password: password,
            email: $('[name=email]').val(),
            iphone: $('[name=iphone]').val(),
            address: $('[name=address]').val()
        },
        dataType: "json",
        success: function (data) {
            if(data.error){
                $('.msg').html(data.msg);
            }else{
                location='http://localhost:8888/html/login.html';
            }
        }
    });
});
