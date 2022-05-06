/*
 * @Author: jiu yin
 * @Date: 2022-04-26 11:40:10
 * @LastEditTime: 2022-04-26 13:56:59
 * @LastEditors: jiu yin zhen jing
 * @FilePath: \openLearningStudy\StudyChromeApp\js\script.js
 * jiu
 */

// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
//     alert(tab.url);
//
//
// })

$(function () {
   // 读取模式

   chrome.storage.local.get("mode", function (obj) {
      console.log(obj, 1);
      if (obj.mode) {
         $("#model_" + obj.mode).attr("checked", true);
         if (obj.mode == 1) {
            $("#inputTimeRoundEl").hide();
         }
      } else {
         chrome.storage.local.set({ mode: 1 });
         $("#inputTimeRoundEl").hide();
      }
   });
   chrome.storage.local.get("time", function (obj) {
      console.log(obj, 2);
      chrome.storage.local.set({ time: obj.time });
      $("#inputTimeRound").val(obj.time);
   });

   $("#onlineStudy").click(function () {
      window.open("http://www.uestcedu.com/ifree/console/index.html");
   });

   $("#mybutton").click(function () {
      window.open("https://github.com/wuweiit/openLearningStudy");
   });

   $("#site").click(function () {
      window.open("http://www.yl-blog.com/");
   });

   $("input[name='model']").click(function () {
      if (this.value == 1) {
         // 自动模式
         chrome.storage.local.set({ mode: 1 });
         $("#inputTimeRoundEl").hide();
      } else if (this.value == 2) {
         // 周期模式
         chrome.storage.local.set({ mode: 2 });
         $("#inputTimeRoundEl").show();
      }
      reload();
      chrome.notifications.create("msg_" + Math.random() * 10000000, {
         type: "basic",
         title: "消息通知",
         message: "注意：切换模式正在刷新浏览器！",
         iconUrl: "images/logo.png",
      });
   });
   $("#inputTimeRoundEl button").click(function () {
      let value = $("#inputTimeRound").val();
      chrome.storage.local.set({ time: parseInt(value) });
      reload();
   });
   // $("#inputTimeRound").change(function(){
   //     chrome.storage.local.set({'time': parseInt(this.value)});
   // });

   $("#myModelWrite").click(function () {
      chrome.storage.local.set({ writeAnswert: Math.random() * 1000000 });
   });

   //刷新浏览器
   function reload() {
      chrome.tabs.getSelected(null, function (tab) {
         var code = "window.location.reload();";
         chrome.tabs.executeScript(tab.id, { code: code });
      });
   }

   
});
