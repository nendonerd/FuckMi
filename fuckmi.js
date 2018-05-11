// ==UserScript==
// @name         FuckMi
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://item.mi.com/product/*
// @match        https://order.mi.com/buy/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @require      https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// ==/UserScript==

function testAjaxLatency() {
  let sendTime = Date.now();
  let recieveTime;
  let latency;
  $.ajax({
    url: `//cart.mi.com/cart/add/`,
    dataType: "jsonp",
    jsonp: "jsonpcallback",
    data: {},
    error: function() {
      recieveTime = Date.now();
      latency = recieveTime - sendTime;
      console.log("latency: " + latency);
    },
    success: function(e) {
      recieveTime = Date.now();
      latency = recieveTime - sendTime;
      console.log("latency: " + latency);
    }
  });
}

function addCarttt() {
  let id = "2171500001"; //路由器ID（测试） 黑色尊享版ID ‘2181000005’
  let waitTime = Date.parse("11 May 2018 16:17:30 UTC+8") - Date.now();
  console.log(waitTime);
  let frequency = 1000;
  setTimeout(() => {
    let intervalll = setInterval(() => {
      $.ajax({
        url: `//cart.mi.com/cart/add/${id}`,
        dataType: "jsonp",
        jsonp: "jsonpcallback",
        data: {
          code: 1,
          message: `${id}_0_buy`,
          msg: `${id}_0_buy`
        },
        error: function() {
          console.log("addcart failed");
        },
        success: function(e) {
          if (e.code === 1) {
            clearInterval(intervalll);
            console.log("addcart success!");
            location.href = "//order.mi.com/buy/checkout?r=" + randomNummm();
          } else {
            console.log(`addcart error: ${e.code}`);
          }
        }
      });
    }, frequency);
  }, waitTime);
}

function randomNummm() {
  return parseInt(9e4 * Math.random() + 1e4) + "." + parseInt(Date.now() / 1e3);
}

function confirmmm() {
  let address_id = "11000000004352691";
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
  };
  let state = 0;
  $.ajax({
    type: "POST",
    url: "https://order.mi.com/buy/submit" + "?" + Math.random(),
    dataType: "json",
    data: {
      Checkout: ccc,
      risk_token: "",
      quick_order: ""
    },
    timeout: 1e4,
    error: function() {
      console.log("confirm failed");
    },
    success: function(e) {
      e && 1 === e.code
        ? (console.log("confirm success!"),
          state++,
          (location.href =
            "https://order.mi.com/buy/confirm?id=" + e.data.order_id))
        : state === 0
          ? (console.log("confirm error: " + e.code + " retrying"), confirmmm())
          : console.log("confirm successed");
    }
  });
}

let htmlll = `

`

function settingThings() {

}

(function() {
  let location = window.location.href;
  if (location.includes("item.mi.com")) {
    //testAjaxLatency();
    $("body").append(htmlll);
    // addCarttt();
  } else if (location.includes("order.mi.com")) {
    confirmmm();
  }
})();
