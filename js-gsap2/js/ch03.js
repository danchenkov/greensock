function onReady(){
    console.log('Hello Chapter 3');
    
    /*$('#button a').mouseover(function(){
    	var index = parseInt($(this).attr('class').charAt(6))-1;

    	TweenLite.to('.slideContainer',1,{left: - 960 * index})

    });*/
	var slide = new o2gSlideShow('#button a','.slideContainer',960);
	console.log(slide.ver);

	TweenLite.to($('.slide h2')[0],1,
			{text:{	value:'Learning Programing Better is Better',
					newClass:'expandedHead',
					oldClass:'olderHead'/*,
					delimiter:' '*/
					},
			 onComplete:onTextComplete

			});

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
	this.ver = '0.001';
	this.stepSize = stepSize;
	this.colors = ['#3F6C4D','#EB880D','#40A8D2','#333333'];

	this.btns = btns  = $(btns);
	for(var i=0; i<btns.length; i++)
		$(btns[i]).data('index',i);

	var that = this;
	btns.mouseover(function(){
    	var index = $(this).data('index');
    	//console.log(that.ver);
    	TweenLite.to(container,1,{left: - stepSize * index});
    	TweenLite.to('.slider',1,{backgroundColor:that.colors[index]});

    	$(that.btns).removeClass('active');
    	$(this).addClass('active');

    });
}

$(document).ready(onReady);