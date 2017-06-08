var geekII= {index:1,last:8};
function onReady(){
    console.log('Hello Chapter 3');
    geekII.height = 600;
    geekII.content = $('body');
    geekII.width = geekII.content.width();
    geekII.sliceWidth =  Math.ceil(geekII.width/geekII.last);
    geekII.aImages=[];
	
	var h1 = $('h1');

    geekII.H1Value = h1.text().slice(2);
    //$('h1').text('10' + geekII.H1Value );

   h1.html("<span>" + h1.text().split("").join("</span><span>") + "</span>");

 	var aSpans = $('h1 span');
 	var len = aSpans.length;
 	var aTweens = [];

 	for(var i=0; i<len; i++){
 		aTweens.push(TweenLite.from(aSpans[i],1,{opacity:0}));
 	} 


   geekII.tl = new TimelineLite({onComplete:onTLComplete,tweens:aTweens,stagger:.2,align:'normal'});

   //geekII.tl.staggerFrom($('h1 span'),1,{opacity:0},.2,1);
   geekII.tl.call(onH1Done,null,h1,"-=3");
    
    loadImage();
}

function onH1Done(){
	this.text('10' + geekII.H1Value);
}


function loadImage(){
	var img = $('<img src="art/bela'+geekII.index+'.png">');
		img.load(onImageLoaded);
}

function onImageLoaded(){
	// clip : rect (top, right, bottom, left)
	geekII.aImages.push(this);
	//var left = geekII.sliceWidth *(geekII.index-1);
	//var right = geekII.sliceWidth *(geekII.index);
	TweenLite.set(this, {css:{	left:'0px',
							  	top:'0px',
							  	position:'absolute',
							  	/*clip:'rect(0px,'+right+'px,'+geekII.height+'px,'+left+'px)'*/
							  	opacity:0
							  	}});
	geekII.content.append(this);
	//geekII.tl.to(this,1,{clip:'rect(0px,'+right+'px,'+geekII.height+'px,'+left+'px)'},'-=.5')
	//geekII.tl.from(this,1,{clip:'rect(0px,0px,0px,0px)'},'-=.5');
	/*
	geekII.tl.set(this,{opacity:1},'-=.5');
	geekII.tl.fromTo(this,1,
				{ clip:'rect(0px,'+Math.max(geekII.sliceWidth,right-geekII.sliceWidth)+'px,'+geekII.height+'px,'+Math.max(0,left-geekII.sliceWidth)+'px)'},
				{clip:'rect(0px,'+right+'px,'+geekII.height+'px,'+left+'px)'},

				'-=.5');*/
	geekII.tl.to(this,.5,{opacity:1},"+=1")
	geekII.tl.call(updateCopy,[geekII.index],geekII,"-=.2");

	if(geekII.index<geekII.last){
		++geekII.index;
		loadImage();
	}

}

function onTLComplete(){
	delete geekII.tl.vars.onComplete;
	console.log('hello');
	var aT = [];
	var t ;
	var left ;
	var right;
	// clip : rect (top, right, bottom, left)
	for(var i=0; i<geekII.aImages.length;i++){
		left = geekII.sliceWidth *(i);
		right = geekII.sliceWidth *(i+1);
		t = TweenLite.fromTo(geekII.aImages[i],1,

				{ clip:'rect(0px,'+geekII.width+'px,'+geekII.height+'px,0px)'},


				{clip:'rect(0px,'+right+'px,'+geekII.height+'px,'+left+'px)'});
		aT.push(t);

	}
	geekII.tl.add(aT);

}

function updateCopy(index){
	$('h1').text('0'+ (this.last - index+2) + this.H1Value );
}




$(document).ready(onReady);