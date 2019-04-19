
$(function(){
    // 作业答案
    if($("#_block_exam_1").length > 0){
        homeworkAnswer();
    }

    // 写入答案
    if($("#tblDataList").length > 0){

        /**
         * 监听周期值变化
         */
        chrome.storage.onChanged.addListener(function callback(changes, name){
            if('local' == name){
                if(changes.writeAnswert){
                    if($("#_block_exam_1").text().indexOf("查看考卷") == -1) { // 不是查看考卷才写
                        chrome.storage.local.get('answers',function(str){
                            answers = str.answers;
                            if(answers){
                                // 做作业吧
                                doHomework(answers);
                                alert("答题完成！")
                            }
                        });
                    }
                }
            }
        });
    }

});



function homeworkAnswer(){
    var listTable = $("#_block_content_exam_1>form>table>tbody")[0]
    var rows = listTable.rows;
    var results = [];
    for(var i=0; i<rows.length; i++){
        console.log("current index "+ i)
        var item = rows[i];

        var tagName = item.children[1].children[1].children[0].children[1].children[0].children[0].tagName;
        var text = "";
        console.log("current tagName= "+ tagName)
        if("SPAN" == tagName){
            try{
                text = item.children[1].children[1].children[0].children[1].children[0].children[0].children[0].children[1].innerText;
            } catch(e) {}
            try{
                item.children[1].children[1].children[0].children[1].children[0].children[0].children[1].innerText;
            } catch(e) {}
        }else{
            text = item.children[1].children[1].children[0].children[1].children[0].children[1].innerText;
        }



        // "[参考答案：B]  分值：5"

        var index_a = text.indexOf("：")+1;
        var index_b = text.indexOf("]");
        var result = text.substring(index_a, index_b);

        results.push(result);
    }
    console.log(results.join("|"));


    chrome.storage.local.set({'answers': results.join("|") },function(){
        alert("答案读取成功！");
    });

}






/**
 * 自动做作业函数
 * @author marker
 * @param answerStr
 */
function doHomework(answerStr){
    var ans = answerStr.split("|");// 答案列表
    var questionNode = $("#tblDataList>tbody")[0];
    var rows = questionNode.rows;


    for(var i=0; i<rows.length; i++) {
        var item = rows[i];
        var right = ans[i];//正确答案 A =65
        if(!right){
            continue;// 不存在就继续走
        }
        console.log(right);
        if(right.length <= 1) {// 单项选择

            console.log(i+".单选题:"+right);

            var rightIndex = right.charCodeAt() - 65;// 0开始
            // 答案里列表
            var answerListNode = item.children[0].children[0].children[0].children[0].children[1].children[1].children[0].children[1].children[0].children[0].children[0].children[0]
            if(answerListNode.children.length == 1){
                // 选中答案
                try{// 尝试选择判断题/单选题
                    if(rightIndex == 0){
                        answerListNode.children[0].children[0].children[0].click();
                    } else if(rightIndex == 1){
                        answerListNode.children[0].children[3].children[0].click();
                    } else if(rightIndex == 2){
                        answerListNode.children[0].children[6].children[0].click();
                    } else if(rightIndex == 3){
                        answerListNode.children[0].children[9].children[0].click();
                    }
                }catch(e){}

            }else{//
                // 选中答案
                try{// 尝试选择判断题/单选题
                    answerListNode.rows[rightIndex].children[0].children[0].click();
                }catch(e){}
            }


        }else{// 多选题

            console.log(i+".多选题:"+right);

            for(var j=0;j<right.length; j++){
                var crooet = right[j];
                var rightIndex = crooet.charCodeAt() - 65;
                // 答案里列表
                var answerListNode = item.children[0].children[0].children[0].children[0].children[1].children[1].children[0].children[1].children[0].children[0].children[0].children[0]





                // 选中答案
                try{// 尝试选择判断题
                    answerListNode.rows[rightIndex].children[0].children[0].click();
                }catch(e){console.log(e)}
            }


        }




    }


}

