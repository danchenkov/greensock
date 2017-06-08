function onReady(){
    console.log('Hello Chapter 2');
    //.courses_slider li.blue .bg
    var li = $('.courses_slider li');
    console.log(li.css('height'));
    var liHeight = li.css('height');
    var aItems = $('.courses_slider li .bg');
    TweenLite.from(aItems[0],1,
    				{css:{paddingTop:liHeight}, 
    				 delay:1});
    TweenLite.from(aItems[1],1,
    				{css:{paddingTop:liHeight}, 
    				 delay:1.1});
    TweenLite.from(aItems[2],1,
    				{css:{paddingTop:liHeight}, 
    				 delay:1.2});
    //CSSPlugin.defaultTransformPerspective

    li.hover(onNewsOver,onNewsOut);
  	/*TweenLite.from(li,.6,
   			     {skewX:'-10deg',left:'200px'});*/
	TweenLite.set('.banner-new',{transformPerspective:500});
	TweenLite.from('.banner-new',1,
   			     {rotationY:-360,
   			      transformOrigin:'50% 50% -200px'});

   TweenLite.delayedCall(4,flipNews);
}

function flipNews(){
	var li = $('.courses_slider li');
	TweenLite.set(li,{transformPerspective:800});
	TweenLite.to(li,.5,{rotationY:'90deg',
						ease:Linear.easeNone,
						onComplete:changeNewsContent});
}

function changeNewsContent(){
	var li = $('.courses_slider li');

	TweenLite.fromTo(li,.5,{rotationY:'-90deg'},{rotationY:'0deg'});
}

function onNewsOver(){
	var li = $(this);
	TweenLite.to(li.find('.bg'), .6, 
				{paddingTop:li.css('height')});

}

function onNewsOut(){
	var li = $(this);
	TweenLite.to(li.find('.bg'), 1, 
				{paddingTop:'0px'});
}


$(document).ready(onReady);