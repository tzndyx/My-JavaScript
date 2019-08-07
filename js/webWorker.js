var i = 0;
function timeCount(){
	postMessage(i);//用于向 HTML 页面传回一段消息。
	console.log(i);
	i = i+1;
	setTimeout('timeCount()',1000);
}

timeCount();
