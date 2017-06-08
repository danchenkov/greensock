function onReady(){
    console.log('Hello Chapter 1');


   // TweenLite.ticker.fps(15);
    $('.content').html('<img src="art/bela2.png" />');
    $('.content img').load(onImageLoad);

}

var tll;

function onImageLoad(){
	var img = $(this);
	tll = new TimelineLite({onUpdate:onImageAnimUpdate,
							onComplete:onImageAnimDone,
							/*onStart:onTimelineStart,
							onStartParams:['{self}','hello'],
							onStartScope:img,*/
							onReverseComplete:onTLReverseComplete

							/*
							on___Params : []
							on___Scope : item
							*/
							});

	tll.eventCallback("onStart",onTimelineStart,['{self}','hello'],img);
	
	var content = $('.content');
	var moveUp = (content.height() - img.height()) + "px";
	var moveLeft = (content.width() - img.width()) + "px";


		//TimelineLite.add(obj,position,align,stagger)
	var aTweens = [
			TweenLite.from(img,4,{css:{opacity:0}}),
			TweenLite.from(img,4,{css:{width:"2000px"}}),
			/*,delay:3*/
			TweenLite.to(img,4,{css:{top:moveUp,
							 left:moveLeft},
						ease:Quint.easeOut
					})		
	];
	tll.add(aTweens,"+=1","sequence",-3);

		//normal
		//start
		//sequence

	/*tll.add(TweenLite.from(img,1,{css:{opacity:0}}),1);
	tll.add(TweenLite.from(img,4,{css:{width:"2000px"}}));
	tll.add(TweenLite.to(img,4,{css:{top:moveUp,
							 left:moveLeft},
						ease:Quint.easeOut
					}),"-=3");*/


	img.click(onTogglePlay);

}

function onTimelineStart(self,msg){
	tll.eventCallback("onStart",null);
	console.log("onTimelineStart",msg);
	console.log(this==self);
}

function onTLReverseComplete(){
	console.log("onTLReverseComplete");
}


function onTogglePlay(e){
	tll.paused(!tll.paused());
	console.log(tll.time(),tll.totalDuration(),tll.totalTime());
	if(tll.time() ==tll.totalDuration())
		tll.reverse();
	else if(tll.time()==0) tll.play();
}


function onImageAnimUpdate(){
	var per = (this.progress() * 100 ) + "%";
	TweenLite.set('.trackerBody',{css:{width:per}});
}

function onImageAnimDone(){
	console.log(this.vars.onComplete);
	//this.vars.onComplete = null;
	//delete this.vars.onComplete;

	$('.tracker').mousemove(onMouseMove);
	this.pause();
}
var nResumePlay;

function onMouseMove(e){
	var per = e.pageX/ $('.tracker').width();
	tll.progress(per,true);

	if(!tll.paused()) tll.pause();
	
	//TweenLite.set('.trackerBody',{css:{width:per*100 + "%"}});
	//onImageAnimUpdate();

	jQuery.proxy(onImageAnimUpdate,tll)();

	clearTimeout(nResumePlay);
	nResumePlay = setTimeout(resumePlay,1000);

}

function resumePlay(){
	tll.resume();
}


$(document).ready(onReady);