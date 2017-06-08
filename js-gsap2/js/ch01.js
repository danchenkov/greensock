function onReady(){
    console.log('Hello Chapter 1');
    /*TweenLite.to('img',1,{width:0,height:0});
    TweenLite.from('img',1,{width:0,height:0});
    TweenLite.fromTo('img',1,{width:460,height:170},
      						   {width:490,height:197});*/

	//TweenLite.from('img',1,{width:"-=20",height:"-=20"});

	TweenLite.defaultEase = Linear.easeIn;
	TweenLite.fromTo('img',1,{width:"-=20",height:"-=20"},
      						   {width:"+=20",height:"+=20",delay:3});

	typingEffect('.slide h2',3,1);	
	typingEffect('.book_w_slide',5,3);	
}
function typingEffect(selector,time,delay=0){
	var o = {index:0, wordCount:0};
		o.html = $(selector);
		o.copy= o.html.text();
		o.wordCount = o.copy.length;

	TweenLite.to(o,time,{index:o.wordCount,
					onUpdate:onTypeInUpdate,
					onUpdateParams:[o],
					delay:delay,
					immediateRender:true});
	//onTypeInUpdate(o);
}

function onTypeInUpdate(targetObject){
	var index = Math.floor(targetObject.index);
	console.log(index);
	targetObject.html.text(targetObject.copy.slice(0,index));
}

$(document).ready(onReady);