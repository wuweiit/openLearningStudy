


var model = 1;

chrome.storage.local.get('mode',function(str){
    model = str.mode;


   if(model == 1){
       console.log("自动学习模式。。。");
       mode1();
   } else if(mode = 2) {
        console.log("周期学习模式。。。");
       mode2();
   }
});


/**
 * 自动学习模式
 */
function mode1() {
    var els = $("#btnNext");
    if (els.length > 0) {

        console.log("找到了下一个按钮！");


        setTimeout(function () {

            // var time = getTime();
            startStudy();


        }, 1000);
    }


    /**
     * 获取学习时间
     */
    function getTime() {

        var text = $(window.parent["w_lms_content"].document).find("#tdRemark").text();
        var start = text.indexOf('最少要求学习');
        var end = text.indexOf('秒');

        var time = parseInt(text.substring(start + 6, end));

        console.log("读取到视频的学习时间为：" + time);

        return time;
    }


    /**
     * 获取当前的学习进度是否完成
     * @returns {*|jQuery}
     */
    function getStatus() {
        var html = $(window.parent["w_lms_content"].document).find("#tdRemark")[0].innerHTML;
        if (html && html.indexOf("completed") != -1) {
            return true;
        }
        return false;
    }


    /**
     * 开始学习
     * @param time
     */
    function startStudy() {

        /**
         * 该自动学习脚本仅用于学习研究，未经作者同意不得用于商业用途。
         *
         * @author marker
         * @date 2017-03-05
         * @type {number}
         */


        /**
         * 自动学习函数
         */
        var myInterval;
        var i = 0;

        function study() {
            i++;
            console.log("自动正在学习中...");

            if (!($("#StudyStatus").length > 0)) {
                $('body').append("<div id='StudyStatus' style='height: 30px; line-height: 30px;background: #e1dfe2;  width: 100%;  text-align: center;position: fixed; z-index: 11111;font-weight: bold; bottom: 0px;  color: red'>自动正在学习中...</div>")
            }

            if ((i % 2) == 1) {
                $('#StudyStatus').html('自动正在学习中...');
            } else {
                $('#StudyStatus').html('自动正在学习中&nbsp; &nbsp;');
            }


            if (getStatus()) { // 判断是否学习完成
                console.log("学习完成...");

                if (window.JQUERY_CUSTERM("#btnNext")) {
                    console.log("进入下一章节...")
                    window.JQUERY_CUSTERM("#btnNext").click();

                    // 清除定时任务
                    clearInterval(myInterval);

                    // 延时执行
                    setTimeout(function () {
                        startRun();
                    }, 1000);


                } else {
                    console.error("没有找到【下一个】按钮");
                    console.log("正在关闭周期循环管理器！");
                    clearInterval(myInterval);

                    $("#StudyStatus").css("color", "green");
                    $("#StudyStatus").html("学习完成!");
                }

            }
        };


        function startRun() {
            console.log("【下一个】按钮获取焦点")
            window.JQUERY_CUSTERM("#btnNext", window.frames['w_main']).focus();
            myInterval = setInterval(study, 1000);
        }


        window.JQUERY_CUSTERM = $;
        console.log("自动学习脚本启动...");


        setTimeout(startRun, 1000);


    }
}




/**
 * 周期学习模式
 */
function mode2(){

    /* 全局变量配置 */
    var STUDY_DELAY_TIME  = 1; // 延时启动。单位：秒
    var STUDY_PERIOD_TIME = 60; // 下一章节周期 单位：秒

    var myInterval;

    /**
     * 监听周期值变化
     */
    chrome.storage.onChanged.addListener(function callback(changes, name){
        if('local' == name){
            STUDY_PERIOD_TIME = changes.time.newValue;

            clearInterval(myInterval);
            myInterval = setInterval(study, STUDY_PERIOD_TIME   * 1000);
        }
    });



    chrome.storage.local.get('time',function(str){
        STUDY_PERIOD_TIME = str.time;
        runStudy();
    });


    /**
     * 自动学习函数
     */
    function study(){
        // 10秒后开始
        if(window.JQUERY_CUSTERM ("#btnNext")){
            console.log("进入下一章节...")
            window.JQUERY_CUSTERM("#btnNext").click();
        } else {
            console.log(window.JQUERY_CUSTERM ("#btnNext"));
            console.error("没有找到【下一个】按钮");
            console.log("正在关闭周期循环管理器！");
            clearInterval(myInterval);
        }
    };
    function startRun(){
        console.log("【下一个】按钮获取焦点")
        window.JQUERY_CUSTERM("#btnNext", window.frames['w_main']).focus();
        myInterval = setInterval(study, STUDY_PERIOD_TIME   * 1000);
    }


    function runStudy(){
        window.JQUERY_CUSTERM = $;
        console.log("自动学习脚本启动...")
        setTimeout(startRun, STUDY_DELAY_TIME * 1000);
    }

}

