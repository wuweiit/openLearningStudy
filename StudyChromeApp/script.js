

var delayTime = 30;// 秒

var els = $("#btnNext");
if(els.length > 0){

    console.log("找到了下一个按钮！");


    setTimeout(function(){

        // var time = getTime();
        startStudy();


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
 * 获取当前的学习进度是否完成
 * @returns {*|jQuery}
 */
function getStatus(){
    var span = $(window.parent["w_lms_content"].document).find("#tdRemark span");
    return $(span).hasClass("completed");
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
    function study(){
        i++;
        console.log("自动正在学习中...");

        if(!($("#StudyStatus").length > 0)){
            $('body').append("<div id='StudyStatus' style='position: fixed; z-index: 11111;font-weight: bold; bottom: 30px; left: 6px; color: red'>自动正在学习中...</div>")
        }

        if((i%2)==1){
            $('#StudyStatus').text('自动正在学习中...');
        } else{
            $('#StudyStatus').text('自动正在学习中');
        }


        if (getStatus()){ // 判断是否学习完成
            console.log("学习完成...");

            if(window.JQUERY_CUSTERM ("#btnNext")){
                console.log("进入下一章节...")
                window.JQUERY_CUSTERM("#btnNext").click();

                // 清除定时任务
                clearInterval(myInterval);

                // 延时执行
                setTimeout(function(){
                    startRun();
                }, 1000);


            }else{
                console.error("没有找到【下一个】按钮");
                console.log("正在关闭周期循环管理器！");
                clearInterval(myInterval);

                $("#StudyStatus").css("color","green");
                $("#StudyStatus").html("学习完成!");
            }

        }
    };


    function startRun(){
        console.log("【下一个】按钮获取焦点")
        window.JQUERY_CUSTERM("#btnNext", window.frames['w_main']).focus();
        myInterval = setInterval(study, 1000);
    }


    window.JQUERY_CUSTERM = $;
    console.log("自动学习脚本启动...");





    setTimeout(startRun, 1000);



}


