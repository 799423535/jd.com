import './library/jquery.js';
import { baseUrl } from './library/conf.js';
import cookie from './library/cookie.js';
import './library/tools.js';
import { fdj } from './library/move.js';

//获取某个商品详情
(function () {
    let pid = location.search.split('=')[1];
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getProduct`,
        data: { "pid": pid },
        dataType: "json",
        success: function (res) {
            let picture = JSON.parse(res[0].picture)[2];
            let tem = `
              <div class="left">
                    <div class="wrap">
                    <div class="biger" id="biger"></div>
                    <div class="imgs">
                        <div class="main" id="main">
                            <div class="mask" id="mask"></div>
                        </div>
                        <ul class="smaller" id="smaller"></ul>
                        </div>
                    </div>   
                </div>
                <div class="right">
                    
                    <p class="title">${res[0].title}</p>
                    <p class="sub">${res[0].sub}</p>        
                    <p><span>京东秒杀</span></p>
                    <div>                     
                        <div class="clear_fix"><span>秒 杀 价</span><em>￥</em><p class="price">${res[0].price}</p></div>
                        <div class="clear_fix"><span>优 惠 券</span><i>满199减40</i><i>满169减30</i></div>
                        <div class="clear_fix"><span>促 销</span><em>满额返券</em><p>购买个人护理部分产品满1元返优惠券包，数量有限，发完为止   详情>></p></div>
                    </div>
                    <div class="clear_fix">
                        <span>配 送 至</span>
                        <div>浙江杭州市江干区九堡镇</div>
                        <i>有货</i>
                    </div>
                    <div class="clear_fix">    
                       <p> 
                            <span>支持</span> 
                            <a href="">可配送海外</a>|
                            <a href="">上门换新</a>|
                            <a href="">破损包退换</a>|
                            <a href="">30天价保</a>
                        </p>
                        <p> 
                            <a href=""></a>
                            <a href="">次日达</a>|
                            <a href="">京尊达</a>|
                            <a href="">预约送货</a>|
                        </p>
                        <p>由 <span style="color: red;">京东</span> 发货, <span style="color: red;">黑人京东自营官方旗舰店</span>提供售后服务. 23:10前下单，预计明天(11月12日)送达</p>
                    </div>
                    
                    <div  class="clear_fix">
                        <div class="clear_fix">
                            <input type="text" value="1" id="val">
                            <div class="count">
                                <a href="javascript:;" id="add">+</a>
                                <a href="javascript:;" id="min">-</a>
                            </div>
                            
                        </div>
                        <a href="javascript:;" id="btn">加入购物车</a>    
                    </div>
                </div>
              `;
           
            $('.detail>.type-page').append(tem);
            $('#add').on('click', function () {
                let a = $('#val').val();
                a++;
                $('#val').val(a);
            });
            $('#min').on('click', function () {
                let a = $('#val').val();
                a--;
                if ($('#val').val() != 1) {
                    $('#val').val(a);
                }
            });
            $('#btn').on('click', function () {
                let count = $('#val').val();
                addItem(res[0].pid, count)
            });
            function addItem(pid, count) {
                let s = { "pid": pid, "count": count };
                let shop = cookie.get('shop');
                if (shop) {
                    shop = JSON.parse(shop);
                    if (shop.some((elm, i) => elm.pid == pid)) {
                        shop.forEach((elm, i) => {
                            if (elm.pid == pid) {
                                elm.count = count;
                            }
                        });
                    } else {
                        shop.push(s);
                    }
                } else {
                    shop = [];
                    shop.push(s);
                }
                shop = JSON.stringify(shop);
                cookie.set("shop", shop, 1);
                location = `${baseUrl}/html/shopping.html`;
            }
            let arr = JSON.parse(res[0].picture);
            fdj(`../${arr[0].src}`, `../${arr[1].src}`, `../${arr[2].src}`, `../${arr[3].src}`, `../${arr[0].src}`);
        }
    });
})();