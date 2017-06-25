/**
 * 该自动做作业脚本仅用于学习研究，未经作者同意不得用于商业用途。
 *
 *
 *
 * @author marker
 * @date 2017-06-25
 */

var listTable = $("#_block_content_exam_1>form>table>tbody")
var rows = listTable.rows;
var results = [];
for(var i=0; i<rows.length; i++){
    var item = rows[i];
    var text = item.children[1].children[1].children[0].children[1].children[0].children[1].innerText
    // "[参考答案：B]  分值：5"

    var index_a = text.indexOf("：")+1;
    var index_b = text.indexOf("]");
    var result = text.substring(index_a, index_b);

    results.push(result);
}
console.log(results.join(","))
