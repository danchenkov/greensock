var tl = new TimelineLite({paused:true});
var aElements = [];
var isManual = false;

function onReady(){
    console.log('Hello Chapter 4');
	
	setupControls(); 
}

function setupControls(){
	var controlBar = $('<div/>');
		controlBar.attr({id:'controlBar'});

	createControl('add',onAdd,controlBar);
	createControl('replay',onReplay,controlBar);
	createControl('auto',onManualToggle,controlBar);
	createControl('clear',onClear,controlBar);
	createControl('Remove Recent',onRemoveRecent,controlBar);
	createControl('kill',onKill,controlBar);
	

	$('body').append(controlBar);
}

function createControl(lbl,callback,parent){
	var btn = $('<span/>');
		btn.text(lbl);
		btn.attr({class:'btn'});
		btn.click(callback);

		parent.append(btn);
}

function onAdd(){
	var aColor = ['#333333','#EB880D','#E54E1F','#3F6C4D'];
	var clr = aColor[Math.floor(Math.random()*aColor.length)];

	var svg = $('<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="'+clr+'" /></svg>');
		svg.attr({class:'elements'});

	$('body').append(svg);

	var drag = Draggable.create(svg,{	onDragStart:onDragStart,
							onDragEnd:onDragEnd});
	drag[0].lastP = {x:drag[0].x, y:drag[0].y,stamp:(new Date().getTime())};
	aElements.push(drag[0]);

	tl.set(svg,{opacity:0,x:drag[0].x,y:drag[0].y},0);
	tl.to(svg,.2,{opacity:1});
}

function onDragStart(){
	this.lastP.stamp = new Date().getTime();
}

function onDragEnd(){
	if(!isManual){
		var sec = ((new Date().getTime()) - this.lastP.stamp )/1000;
		console.log(sec);
		tl.add(TweenLite.fromTo(this.target, sec, {x:this.lastP.x,y:this.lastP.y},{x:this.x,y:this.y}));
		//tl.to(this.target,sec,{x:this.x,y:this.y});
		tl.time(tl.totalDuration());
		this.lastP = {x:this.x, y:this.y,stamp:(new Date().getTime())};
	}
}

function onReplay(){
	tl.seek(0);
	if(tl.paused()) tl.paused(false);

}

function onManualToggle(){
	isManual = !isManual;
	$(this).text(isManual?'manual':'auto');
	var aT=[];

	if(!isManual){
		var element ;
		for(var i=0; i<aElements.length; i++){
			element = aElements[i];
			if(element.x != element.lastP.x ||
				element.y != element.lastP.y ){
				aT.push(TweenLite.fromTo(element.target,.5,
						{x:element.lastP.x,y:element.lastP.y},
						{x:element.x, y:element.y}));
			}
		}
		tl.add(aT);
		tl.time(tl.totalDuration());
	}
}

function onClear(){
	tl.clear();
}

function onRemoveRecent(){
	var t = tl.recent();
	tl.remove(t);

	TweenLite.fromTo(t.target,.1,{x:t.vars.css.x,y:t.vars.css.y},
								{x:t.vars.startAt.x,y:t.vars.startAt.y});
}

function onKill(){
	tl.kill(null,[aElements[0].target,aElements[1].target]);
}


$(document).ready(onReady);