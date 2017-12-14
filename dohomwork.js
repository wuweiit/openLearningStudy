/**
 * Created by marker on 2017/6/25.
 */


/**
 * 该自动做作业脚本仅用于学习研究，未经作者同意不得用于商业用途。
 *
 *
 *
 * @author marker
 * @date 2017-06-25
 */





/**
 * 自动做作业函数
 * @author marker
 * @param answerStr
 */
function doHomework(answerStr){
    var ans = answerStr.split("|");// 答案列表
    var questionNode = $("#tblDataList>tbody");
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

                var rightIndex = right.charCodeAt() - 65;
                // 答案里列表
                var answerListNode = item.children[0].children[0].children[0].children[0].children[1].children[1].children[0].children[1].children[0].children[0].children[0].children[0]

                // 选中答案
                try{// 尝试选择判断题
                    answerListNode.rows[rightIndex].children[0].children[0].click();
                }catch(e){}
                // 尝试选择单选题
                try{
                    answerListNode.rows[rightIndex].children[0].children[0].click();
                }catch(e){}


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

// 做作业吧
doHomework("AB|ABCD|C|B|D|B|D|ABD|C|ABC|ABD|ABCD|ABCD|A|ACD|B|C|ABCD|ABCD|C");


