function onReady(){
    console.log('Hello Chapter 4');
    
    /*$('#button a').mouseover(function(){
    	var index = parseInt($(this).attr('class').charAt(6))-1;

    	TweenLite.to('.slideContainer',1,{left: - 960 * index})

    });*/

	var slide = new o2gSlideShow('#button circle','.slideContainer',960);
		slide.addTriggers(0,onSlide0Enter,onSlide0Exit);
		slide.addTriggers(3,onSlide3Enter,onSlide3Exit)
	console.log(slide.ver);


	TweenLite.from('#button circle',.5,{attr:{cx:10},
									delay:.1,
									roundProps:"cx"});
	
	$('#jumptop').click(function(event){
		event.preventDefault();
		TweenLite.to(window,2,{scrollTo:{y:0}});
	});
	TweenLite.to(window,2,{scrollTo:{y:'max'}});

}
function onSlide0Exit(index){
	$($('.slide h2')[0]).text('Learning better is better');
}

function onSlide0Enter(index){
	TweenLite.to($('.slide h2')[0],1,
			{text:{	value:'Learning Programing Better is Better',
					newClass:'expandedHead',
					oldClass:'olderHead'/*,
					delimiter:' '*/
					},
			 onComplete:onTextComplete

			});
}

function onSlide3Exit(index){
	TweenLite.to($('.slide')[index],.1,{directionalRotation:'0_cw',delay:1});

	TweenLite.to($('.slide img')[index],.1,{directionalRotation:'0_cw'});
}

function onSlide3Enter(index){
	TweenLite.set($('.slide')[index],{css:{rotation:'0deg'}});
	TweenLite.set($('.slide img')[index],{css:{rotation:'0deg'}});
	
	TweenLite.to($('.slide')[index],1,{directionalRotation:'+=360_cw',delay:1});

	TweenLite.to($('.slide img')[index],1,{directionalRotation:{rotationX:'-=360_cw'},delay:1.4});

}


function onTextComplete(e){
	var span = $(this.target).find('.expandedHead');
	span.html('Learning <span>Programing</span> Better is Better');

	TweenLite.to(span.find('span'),1,{delay:2,
										text:{
											value:'JavaScript',
											oldClass:'olderHead',
											padSpace:true
										}});


}

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