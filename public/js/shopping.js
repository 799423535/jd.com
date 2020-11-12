import './library/jquery.js';
import { baseUrl } from './library/conf.js';
import cookie from './library/cookie.js';

(function () {

    let shop = JSON.parse(cookie.get('shop'));
    if (shop) {
        let str = shop.map((elm) => elm.pid).join();
        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: { str: str },
            dataType: "json",
            success: function (res) {
                res.forEach((elm,i) => {
                    let tem = '';
                    let arr = shop.filter(el => elm.pid === el.pid);
                    let picture = JSON.parse(elm.picture)[0];
                    tem += `
                <div class="shop-car">
                <div><input type="checkbox"   class="car-ck" data-pid="${elm.pid}">选择商品</div>
                <ul class="clear_fix">
                    <li>
                        <img src="../${picture.src}" alt="">
                        <p >
                            <a href="javascript:;" class="title">${elm.title}</a></p>
                    </li>
                    <li><p></p></li>
                    <li><p ><span>￥</span><span class="price">${elm.price.toFixed(2)}</span></p></li>
                    <li><div><a href="javascript:;" class="min">-</a><input type="text" class="count" value="${arr[0].count}"><a href="javascript:;" class="add">+</a></div></li>
                    <li><p class="cal">${(elm.price * arr[0].count).toFixed(2)}</p></li>
                    <li><p><a href="javascript:;" class="del" data-pid="${elm.pid}">删除</a></p></li>
                </ul>
            </div>
                `;

                    $('#at').append(tem);

                });
                function fn(){
                    let arr=Array.from($('#at .car-ck'));
                    let sum=arr.reduce((prev,elm)=>{
                        let num=$(elm).parent().parent().find('.cal').html();           
                        if(elm.checked){                   
                            return prev+=parseFloat(num);
                        }
                        return prev;             
                    },0);
                    sum=sum.toFixed(2);
                    $('#allPrice').html(sum);
                }               
               
                $('#at .car-ck').on('click', function () {                    
                        fn();  
                        if(Array.from($('#at .car-ck')).every(elm=>elm.checked===true)){
                             $('#allCheck').prop('checked',true);
                        }else{
                            $('#allCheck').prop('checked',false);
                        }
                });
                $('#allCheck').on('click',function(){
                    if($('#allCheck').prop('checked')){
                        $('#at .car-ck').prop('checked',true);
                    }else{
                        $('#at .car-ck').prop('checked',false   );
                    }
                    fn();
                });
                $('.min').on('click',function(){
                    let cn=$(this).siblings('.count');
                    let count = $(this).siblings('.count').val();
                    count--;
                    if (count != 0) {
                        cn.val(count);
                    }
                    let a=$(this).parent().parent().prev().find('.price').html();
                    count = $(this).siblings('.count').val();
                    $(this).parent().parent().next().find('.cal').html(count*a);
                    fn();
                });
                $('.add').on('click',function(){
                    let cn=$(this).siblings('.count');
                    let count = $(this).siblings('.count').val();
                    count++;
                    cn.val(count);
                    let a=$(this).parent().parent().prev().find('.price').html();
                    count = $(this).siblings('.count').val();
                    $(this).parent().parent().next().find('.cal').html(count*a);
                    fn();
                });
                $('.del').on('click',function(){
                    let pid=$(this).attr('data-pid');
                    let str=cookie.get('shop');
                    let arr=JSON.parse(str);
                    console.log(pid);
                    let index=arr.indexOf((elm,i)=>{
                         return elm.pid==pid;
                    });
                    console.log(pid);
                    arr.splice(index,1);
                    cookie.set("shop",JSON.stringify(arr),1);
                    location.reload();
                });
                $('#toPrice').on('click',function(){
                    let arr=[];
                    Array.from($('#at .car-ck')).forEach((elm)=>{
                        if(elm.checked)arr.push(parseInt($(elm).attr('data-pid')));
                                            
                    });
                    
                    let shop=JSON.parse(cookie.get('shop'));
                    let arr1=[];
                    shop.forEach(((elm,i)=>{      
                         if(arr.indexOf(elm.pid)!=-1){
                            arr1.push(i);
                         };
                    }));
                    for(let i=arr1.length-1;i>=0;i--){
                        shop.splice(arr1[i],1);
                    }                 
                    if(shop.length){
                        cookie.set('shop',JSON.stringify(shop),1)
                    }else{
                        cookie.remove('shop');
                    }
                    location.reload();
                });
                
                
            }
        });
    }

})();