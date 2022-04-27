$(function () {
   // 作业答案
   if ($("#_block_exam_1").length > 0) {
      homeworkAnswer();
   } else if ($("#_block_content_exam_2").length > 0) {
      fillingInput($("#_block_content_exam_2"));
   }

   // 写入答案
   let tblDataList = $("#tblDataList").length > 0;
   let _block_content_exam = $("#_block_content_exam").length > 0;

   if (tblDataList || _block_content_exam) {
      /**
       * 监听周期值变化
       */
      chrome.storage.onChanged.addListener(function callback(changes, name) {
         if ("local" == name) {
            if (changes.writeAnswert) {
               if ($("#_block_exam_1").text().indexOf("查看考卷") == -1) {
                  chrome.storage.local.get("answers", function (str) {
                     if (!str.answers) return;
                     answers = str.answers;
                     console.log(answers);
                     // 做作业吧
                     if (tblDataList) {
                        doHomework(answers);
                     } else if (_block_content_exam) {
                        doFilling(answers);
                     }
                     alert("答题完成！");
                  });
               }
            }
         }
      });
   }
});

//表单选择题 写入
function homeworkAnswer() {
   var listTable = $("#_block_content_exam_1>form>table>tbody")[0];
   var rows = listTable.rows;
   var results = [];
   for (var i = 0; i < rows.length; i++) {
      console.log("current index " + i);
      var item = rows[i];

      var tagName =
         item.children[1].children[1].children[0].children[1].children[0]
            .children[0].tagName;
      var text = "";
      console.log("current tagName= " + tagName);
      if ("SPAN" == tagName) {
         try {
            text =
               item.children[1].children[1].children[0].children[1].children[0]
                  .children[0].children[0].children[1].innerText;
         } catch (e) {}
         try {
            item.children[1].children[1].children[0].children[1].children[0]
               .children[0].children[1].innerText;
         } catch (e) {}
      } else {
         text =
            item.children[1].children[1].children[0].children[1].children[0]
               .children[1].innerText;
      }

      // "[参考答案：B]  分值：5"

      var index_a = text.indexOf("：") + 1;
      var index_b = text.indexOf("]");
      var result = text.substring(index_a, index_b);

      results.push(result);
   }
   console.log(results.join("|"));

   chrome.storage.local.set({ answers: results.join("|") }, function () {
      alert("答案读取成功！");
   });
}

/*
 * 填空选择题
 * @author jiuyin
 * @param blank
 */

function fillingInput(el) {
   let str = el[0].innerText;
   let fillingAnswer = str.match(/[a-z]/gi);
   chrome.storage.local.set({ answers: fillingAnswer }, function () {
      alert("答案读取成功！");
   });
}

/**
 * 自动做作业函数
 * @author marker
 * @param answerStr
 */
function doHomework(answerStr) {
   var ans = answerStr.split("|"); // 答案列表
   var questionNode = $("#tblDataList>tbody")[0];
   var rows = questionNode.rows;

   for (var i = 0; i < rows.length; i++) {
      var item = rows[i];
      var right = ans[i]; //正确答案 A =65
      if (!right) {
         continue; // 不存在就继续走
      }
      console.log(right);
      if (right.length <= 1) {
         // 单项选择

         console.log(i + ".单选题:" + right);

         var rightIndex = right.charCodeAt() - 65; // 0开始
         // 答案里列表
         var answerListNode =
            item.children[0].children[0].children[0].children[0].children[1]
               .children[1].children[0].children[1].children[0].children[0]
               .children[0].children[0];
         if (answerListNode.children.length == 1) {
            // 选中答案
            try {
               // 尝试选择判断题/单选题
               if (rightIndex == 0) {
                  answerListNode.children[0].children[0].children[0].click();
               } else if (rightIndex == 1) {
                  answerListNode.children[0].children[3].children[0].click();
               } else if (rightIndex == 2) {
                  answerListNode.children[0].children[6].children[0].click();
               } else if (rightIndex == 3) {
                  answerListNode.children[0].children[9].children[0].click();
               }
            } catch (e) {}
         } else {
            //
            // 选中答案
            try {
               // 尝试选择判断题/单选题
               answerListNode.rows[rightIndex].children[0].children[0].click();
            } catch (e) {}
         }
      } else {
         // 多选题

         console.log(i + ".多选题:" + right);

         for (var j = 0; j < right.length; j++) {
            var crooet = right[j];
            var rightIndex = crooet.charCodeAt() - 65;
            // 答案里列表
            var answerListNode =
               item.children[0].children[0].children[0].children[0].children[1]
                  .children[1].children[0].children[1].children[0].children[0]
                  .children[0].children[0];
            // 选中答案
            try {
               // 尝试选择判断题
               answerListNode.rows[rightIndex].children[0].children[0].click();
            } catch (e) {
               console.log(e);
            }
         }
      }
   }
}

function doFilling(arr) {
   let elArr = $("#_block_content_exam table tr");
   let arrOut = [];
   for (let i = 0; i < elArr.length; i++) {
      let input = elArr[i].querySelectorAll("input");
      for (let index = 0; index < input.length; index++) {
        let itemName=input[index].name;
        arrOut.push(itemName)
      }
   }
   arrOut.forEach((item,index)=>{
       $(`#${item}`).val(arr[index])
   })
}
