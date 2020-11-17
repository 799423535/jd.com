const nodemailer = require("nodemailer");

function code(email){
    let cd=getcode();
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "799423535@qq.com", //生成的用户
            pass: "zsqtipbtnojzbeea", // 生成的密码
        },
    });
    let obj = {
        from: '"root" <799423535@qq.com>', // 发送方地址
        to: email, // 接收器列表
        subject: "验证码", // 主题
        // text: "Hello world?", // plain text body
        html: `<b>你的验证码是${cd}</b>`, // html body
    }
    transporter.sendMail(obj);
    
    function ram(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getcode() {
        let temp = '';
        for (let i = 0; i < 6; i++) {
            let tem = ram(1, 3);
            switch (tem) {
                case 1:
                    temp += String.fromCharCode(ram(48, 57));
                    break;
                case 2:
                    temp += String.fromCharCode(ram(65, 90));
                    break;
                case 3:
                    temp += String.fromCharCode(ram(97, 122));
                    break;
    
            }
        }
        return temp;
    }
    return cd;
}
module.exports=code;