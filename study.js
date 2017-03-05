/**
 * 该自动学习脚本仅用于学习研究，未经作者同意不得用于商业用途。
 *
 * @author marker
 * @date 2017-03-05
 * @type {number}
 */

/* 全局变量配置 */
var STUDY_DELAY_TIME  = 1; // 延时启动。单位：秒
var STUDY_PERIOD_TIME = 5; // 下一章节周期 单位：分钟



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
    }else{
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
window.JQUERY_CUSTERM = $;
console.log("自动学习脚本启动...")
setTimeout(startRun, STUDY_DELAY_TIME * 1000);
