function onReady(){
    console.log('Hello Chapter 6');


	var slide = new o2gSlideShow('#button circle','.slideContainer',960);
		//slide.addTriggers(0,onSlide0Enter,onSlide0Exit);

	var stepEase = new SteppedEase(10);
	var buttons = $('#button circle');
	TweenMax.from(buttons,1,{attr:{cx:10},
									delay:.1,
									roundProps:"cx",
									//ease:Linear.easeNone
									//ease:stepEase
									//ease:SteppedEase.config(10)
									ease:Elastic.easeOut.config(3.5,.1),
									repeat:4,
									repeatDelay:1,
									yoyo:true,
									onStart:onMaxStart,
									onRepeat:onMaxRepat
									/*onStart:onButtonsStart,
									onStartParams:["{self}"],
									onStartScope: buttons,
									onComplete:onButtonsComplete,
									onCompleteParams:["{self}"],
									onReverseComplete:onButtonsReverseComplete,
									data:{index:0}*/
									});

}

function onMaxStart(){
	console.log('start');
}

function onMaxRepat(){
	console.log('repeat');
}

/*
function onButtonsReverseComplete(){
	++this.data.index;
	console.log(this.data.index);
	//this.vars.onComplete = null; // undefined 
	if(this.data.index>=3)delete this.vars.onComplete;
	this.play();
}

function onButtonsStart(tw){
	//the this here is the jQuery object
	//console.log("animation started", this);
}

function onButtonsComplete(tw){
	//the this here is the tween itself
	//console.log("animation completed",this);
	this.reverse();
}*/


function o2gSlideShow(btns, container,stepSize){
	this.name = '02GEEK SlideShow';
	this.ver = '0.002';
	this.stepSize = stepSize;
	this.colors = ['#3F6C4D','#EB880D','#40A8D2','#333333'];

	this.btns = btns  = $(btns);
	for(var i=0; i<btns.length; i++)
		$(btns[i]).data('index',i);

	this.currentIndex = -1;
	this.highlightButton = function(index){
		TweenLite.to(btns[index],.5,{fill:this.colors[index]});
		if(this.currentIndex!=index && this.currentIndex!=-1){
			 TweenLite.to(btns[this.currentIndex],.5,{fill:'white'});
			 if(this.callBacks[this.currentIndex]) 
			 		this.callBacks[this.currentIndex].onExit(this.currentIndex);
		}


		if(this.callBacks[index]) this.callBacks[index].onEnter(index);
		this.currentIndex = index;
		/*for(var i=0; i<btns.length; i++)
			if(index!=i) TweenLite.to(btns[i],.5,{fill:'white'});*/
	}
	this.callBacks = [];
	this.addTriggers= function(index,onEnter,onExit){
		this.callBacks[index] = {onEnter:onEnter,onExit:onExit};
	}


	var that = this;
	btns.mouseover(function(){
    	var index = $(this).data('index');
    	//console.log(that.ver);
    	TweenLite.to(container,1,{left: - stepSize * index});
    	TweenLite.to('.slider',1,{backgroundColor:that.colors[index]});

    	//logic
    	that.highlightButton(index);

    });

    this.highlightButton(0);
}

$(document).ready(onReady);