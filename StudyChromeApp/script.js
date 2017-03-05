
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    alert(tab.url);
})
 

function autoStart(){
	
	alert(" dsad ");
}
$(function(){
	
	
	
	
$("#taskItem").click(function(){
	
	alert();
});
	
	
	
})
console.log($("#tdRemark").text());

if($("#tdRemark").text().indexOf("已经学习完毕") != -1){
	alert("学习完成了的哈@");
}