function onReady(){
    console.log('Hello Chapter 1');

    $('.content').html('<img src="art/bela2.png" />');
    $('.content img').load(onImageLoad);

}
var tweenPan;
var tweenWidth;
function onImageLoad(){
	var img = $(this);
	var content = $('.content');
	var moveUp = (content.height() - img.height()) + "px";
	var moveLeft = (content.width() - img.width()) + "px";
	//console.log(moveUp, moveLeft);
	//TweenLite.set
	TweenLite.from(img,1,{css:{opacity:0}});
	tweenWidth= TweenLite.from(img,3,{css:{width:"2000px"},delay:1.5});

	tweenPan = TweenLite.to(img,4,{css:{top:moveUp,
							 left:moveLeft},
						ease:Quint.easeOut,
						delay:1.5,
						onUpdate:onImageAnimUpdate,
						onComplete:onImageAnimDone
					});

	img.click(onTogglePlay);

}

function onTogglePlay(e){
	var aT = TweenLite.getTweensOf(e.target);
	var isPause = !(aT[0] && aT[0].paused());
	console.log(isPause);
	if(aT[0]){
		for(var i=0; i<aT.length; i++){
			//aT[i].paused() ? aT[i].play() : aT[i].pause();
			aT[i].paused(isPause);
		}
	}else{
		tweenPan.restart();
		tweenWidth.restart();
	}
}


function onImageAnimUpdate(){
	var per = (this.progress() * 100 ) + "%";
	TweenLite.set('.trackerBody',{css:{width:per}});

	//console.log(tweenPan.progress(),tweenPan.totalProgress())
	//console.log(tweenPan.duration(),tweenPan.totalDuration())
	//console.log(tweenPan.time(),tweenPan.totalTime())

}

function onImageAnimDone(){
	$('.tracker').mousemove(onMouseMove);
	tweenPan.pause();
	tweenWidth.pause();
}

function onMouseMove(e){
	var per = e.pageX/ $('.tracker').width();
	tweenPan.progress(per,true);
	tweenWidth.progress(per,true);
	//TweenLite.set('.trackerBody',{css:{width:per*100 + "%"}});
	//onImageAnimUpdate();

	jQuery.proxy(onImageAnimUpdate,tweenPan)();

}


$(document).ready(onReady);