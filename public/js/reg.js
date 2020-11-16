import './library/jquery.js';
import './library/jquery.md5.js';
import './library/cookie.js';
import {baseUrl} from './library/conf.js';
let reg = {
    username: /\w{8,16}/,
    password: /^.{8,16}$/,
    email: /^\w{5,}\@\w+\.(com|net|org)(\.cn)?$/,
    iphone: /^1\d{10}$/,
    address: /.{2,}/
};
let arr = [false,false,false,false,false,false];
$('input').on('blur',function () {
    let tem = $(this);
    if (tem.attr('id') === 'username') {
        let flag = reg['username'].test(tem.val());
        console.log();
        if (!flag) {     
            tem.parent().next().css('color', 'red').html('你的输入账号不符合规则');
            arr[0]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[0]=true;
        }
    }
    if (tem.attr('id') === 'password') {
        let flag = reg['password'].test(tem.val());
        if (!flag) {
            tem.parent().next().css('color', 'red').html('你的输入密码不符合规则');
            arr[1]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[1]=true;
        }
    }
    if (tem.attr('id') === 'password2') {
        let flag = tem.val()==$('#password').val();
        if (!flag) {
            tem.parent().next().css('color', 'red').html('两次密码不一致');
            arr[2]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[2]=true;
        }
    }
    if (tem.attr('id') === 'email') {
        let flag = reg['email'].test(tem.val());
        if (!flag) {
            tem.parent().next().css('color', 'red').html('你的输入邮箱不符合规则');
            arr[3]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[3]=true;
        }
    }
    if (tem.attr('id') === 'iphone') {
        let flag = reg['iphone'].test(tem.val());
        if (!flag) {
            tem.parent().next().css('color', 'red').html('你的输入手机号不符合规则');
            arr[4]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[4]=true;
        }
    }
    if (tem.attr('id') === 'address') {
        let flag = reg['address'].test(tem.val());
        if (!flag) {
            tem.parent().next().css('color', 'red').html('你的输入地址不符合规则');
            arr[5]=false;
        } else {
            tem.parent().next().css('color', 'green').html('验证通过');
            arr[5]=true;
        }
    }

});

$('#submit').on('click', function () {
    if(arr.every(elm=>elm)){     
        let password = $.md5($('#password').val());
        $.ajax({
            type: "post",
            url: `${baseUrl}/user/reg`,
            data: {
                username: $('#username').val(),
                password: password,
                email: $('#email').val(),
                iphone: $('#iphone').val(),
                address: $('#address').val()
            },
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    $('.msg').css('color','red').html(data.msg);
                    $('#submit').next().html('');
                } else {
                    location = `${baseUrl}/html/login.html`;
                }
            }
        });
    }else{
        
        $(this).next().css('color','red').html('请填写完整的注册信息');
    }
});
