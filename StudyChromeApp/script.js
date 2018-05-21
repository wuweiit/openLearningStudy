

var delayTime = 30;// 秒

var els = $("#btnNext");
if(els.length > 0){

    console.log("找到了下一个按钮！");

    // startStudy();

    setTimeout(function(){

        var time = getTime();
        startStudy(time);


    }, 1000);
}


/**
 * 获取学习时间
 */
function getTime(){

    var text = $(window.parent["w_lms_content"].document).find("#tdRemark").text();
    var start = text.indexOf('最少要求学习');
    var end   = text.indexOf('秒');

    var time = parseInt(text.substring(start+6, end ));

    console.log("读取到视频的学习时间为：" + time);

    return time;
}


/**
 * 开始学习
 * @param time
 */
function startStudy(time) {

    /**
     * 该自动学习脚本仅用于学习研究，未经作者同意不得用于商业用途。
     *
     * @author marker
     * @date 2017-03-05
     * @type {number}
     */

    /* 全局变量配置 */
    var STUDY_DELAY_TIME  = 1; // 延时启动。单位：秒
    var STUDY_PERIOD_TIME = time + delayTime; // 下一章节周期 单位：秒



    /**
     * 自动学习函数
     */
    var myInterval;
    function study(){
        console.log("学习完成，准备下一章节...")
        console.log(window.JQUERY_CUSTERM );
        // 10秒后开始
        if(window.JQUERY_CUSTERM ("#btnNext")){
            console.log("进入下一章节...")
            window.JQUERY_CUSTERM("#btnNext").click();

            // 清楚定时任务
            clearTimeout(myInterval);


            setTimeout(function(){

                // 获取当前课程需要的时间
                STUDY_PERIOD_TIME = getTime() + delayTime;


                startRun();


            }, 1000);


        }else{
            console.error("没有找到【下一个】按钮");
            console.log("正在关闭周期循环管理器！");
            clearTimeout(myInterval);
        }
    };


    function startRun(){
        console.log("【下一个】按钮获取焦点")
        window.JQUERY_CUSTERM("#btnNext", window.frames['w_main']).focus();
        myInterval = setTimeout(study, STUDY_PERIOD_TIME * 1000);
    }


    window.JQUERY_CUSTERM = $;
    console.log("自动学习脚本启动...");


    setTimeout(startRun, STUDY_DELAY_TIME * 1000);



}


