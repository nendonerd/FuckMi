let id = '2171500001' //路由器ID（测试）
// 黑色尊享版ID ‘2181000005’

function testAjaxLatency() {
    let sendTime = Date.now()
    let recieveTime
    let latency
    $.ajax({
        url: `//cart.mi.com/cart/add/`,
        dataType: 'jsonp',
        jsonp: "jsonpcallback",
        data: {},
        error: function () {
            recieveTime = Date.now()
            latency = recieveTime - sendTime
            console.log(latency)
        },
        success: function (e) {
            recieveTime = Date.now()
            latency = recieveTime - sendTime
            console.log(latency)
        }
    })
}

//buytime '15 May 2018 09:59:59 UTC+8'

//加入购物车
function fuckmi() {
    let id = '2171500001' //路由器ID（测试） 黑色尊享版ID ‘2181000005’
    let waitTime = Date.parse('11 May 2018 16:17:30 UTC+8') - Date.now()
    console.log(waitTime)
    let frequency = 1000
    setTimeout(() => {
        let intervalll = setInterval(() => {
            $.ajax({
                url: `//cart.mi.com/cart/add/${id}`,
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                data: {
                    code: 1,
                    message: `${id}_0_buy`,
                    msg: `${id}_0_buy`
                },
                error: function () {
                    console.log('addcart failed')
                },
                success: function (e) {
                    if (e.code === 1) {
                        clearInterval(intervalll)
                        console.log('addcart success!')
                        // confirm()
                    } else {
                        console.log(`addcart error: ${e.code}`)
                    }
                }
            })
        }, frequency)
    }, waitTime)
}



//购物车提交
function checkOuttt() {
    $.ajax({
            url: "//order.mi.com/buy/checkoutPreCheck.php?r=" + randomNummm(),
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            timeout: 5e3,
            error: function () {
                console.log('checkOut failed')
            },
            success: function (t) {
                    if (1 === t.code)
                        {
                            console.log('checkout success!');
                            // location.href = "//order.mi.com/buy/checkout?r=" + randomNummm()
                            // confirm()
                        }
                    else {console.log(`checkout error: ${t.code}`)}
            }
        })
}

function randomNummm() {
    return parseInt(9e4 * Math.random() + 1e4) + "." + parseInt(Date.now() / 1e3)
}

//结算
function confirm() {
    // let serviceToken = '9np75fwefDaKz1t8pvAnppG2dKFtTacli'
    // let xm_order_sid = '751e19d0ace21cba6f1d732883a15a82'
    let address_id = "11000000004352691"

    // let cookie = `serviceToken=${serviceToken}; xm_order_sid=${xm_order_sid}; ${document.cookie}`
    let ccc = {
        address_id,
        best_time: "1",
        coupons_type: "",
        coupons_value: "",
        invoice_email: "",
        invoice_tel: "",
        invoice_title: "个人",
        invoice_type: "4",
        pay_id: "1",
        pickup_id: "",
        shipment_id: "2"
    }
    $.ajax({
        type: "POST",
        url: "https://order.mi.com/buy/submit" + "?" + Math.random(),
        // beforeSend: function (jqXHR, settings) {
        //     jqXHR.setRequestHeader('Cookie', cookie);
        //     jqXHR.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
        //     jqXHR.setRequestHeader('Referer', `https://order.mi.com/buy/checkout?r=${randomNummm()}`);
        //     jqXHR.setRequestHeader('Upgrade-Insecure-Requests', '1');
        // },
        dataType: "json",
        data: {
            Checkout: ccc,
            risk_token: '',
            quick_order: ''
        },
        timeout: 1e4,
        error: function () {console.log('confirm failed')},
        success: function (e) {
            e && 1 === e.code ? (console.log('confirm success!'), location.href = "https://order.mi.com/buy/confirm?id=" + e.data.order_id)
                : console.log(`confirm error: ${e.code}`)
        }
    })
}
