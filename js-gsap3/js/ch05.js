var tl = new TimelineMax({paused:true,onUpdate:onUpdateCheck});
var tlInner;
var aElements = [];
var isManual = false;

function onReady(){
    console.log('Hello Chapter 5');
	
	setupControls(); 
	addLabelLogic();
}

function setupControls(){
	var controlBar = $('<div/>');
		controlBar.attr({id:'controlBar'});

	createControl('add',onAdd,controlBar);
	createControl('back',onBack,controlBar);
	createControl('pause',onTogglePlay,controlBar);
	createControl('next',onNext,controlBar);
	createControl('replay',onReplay,controlBar);
	createControl('auto',onManualToggle,controlBar);
	createControl('clear',onClear,controlBar);
	createControl('Remove Recent',onRemoveRecent,controlBar);
	createControl('kill',onKill,controlBar);
	createControl('Add Pause',onAddPause,controlBar);
	createControl('Add Timeline',onTimeline,controlBar);
	createControl('slow down',onSlow,controlBar);
	createControl('speed up',onSpeed,controlBar);
	
	

	$('body').append(controlBar);
}

function onUpdateCheck(){

	updateLabel(this.currentLabel());
}

function updateLabel(val){
	$('#label').text(val || 'No Label');
}

function addLabelLogic(){
	$('<div>').text('No Label').attr({id:'label',contenteditable:true}).appendTo('body').blur(onLabelChange);
}

function onLabelChange(){
	var lbl = $(this).text();
	var cLbl = getTL().currentLabel();



	if(cLbl && getTL().time()==getTL().getLabelTime(cLbl))
		getTL().removeLabel(cLbl);
	

	getTL().addLabel(lbl);
	getTL().addPause(lbl,onLabelUpdate,[lbl],$(this));

	createControl('Play ' + lbl,function(){
								getTL().play(lbl);
									},$('#controlBar'));

	
	var labels = getTL().getLabelsArray();
	for (var i = 0; i < labels.length; i++) {
	   console.log("label name: " + labels[i].name + ", time: " + labels[i].time);
	}

	/*console.log(getTL().getLabelsArray());
	var item = getTL().getLabelsArray()[0];

	for(var s in item)
		console.log(s, item[s]);*/
}

function onLabelUpdate(lbl){
	this.text(lbl);
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

	getTL().set(svg,{opacity:0,x:drag[0].x,y:drag[0].y},0);
	getTL().to(svg,.2,{opacity:1},getTL().totalTime());
}

function onDragStart(){
	this.lastP.stamp = new Date().getTime();
}

function onDragEnd(){
	if(!isManual){
		var sec = ((new Date().getTime()) - this.lastP.stamp )/1000;
		console.log(sec);
		getTL().add(TweenLite.fromTo(this.target, sec, {x:this.lastP.x,y:this.lastP.y},{x:this.x,y:this.y}));
		//getTL().to(this.target,sec,{x:this.x,y:this.y});
		getTL().time(getTL().totalDuration(),true);
		console.log('new time is:', getTL().time(),getTL().totalDuration());
		this.lastP = {x:this.x, y:this.y,stamp:(new Date().getTime())};
		
	}
}

function onTogglePlay(){
	getTL().paused(!getTL().paused());
	$(this).text(getTL().paused()?'play':'pause');
}

function onReplay(){
	getTL().seek(0);
	if(getTL().paused()) getTL().paused(false);

}

function onBack(){
	//getTL().play(getTL().getLabelBefore());

	/*console.log(getTL().time());
	console.log(getTL().getLabelBefore(), getTL().getLabelTime(getTL().getLabelBefore()))*/

	var lbl = 	getTL().getLabelBefore();
				
	var time = getTL().getLabelTime(lbl);
	if(time==-1) time =0;

	updateLabel(lbl);
	//getTL().seek(time);
	TweenLite.to(getTL(),.2,{time:time});
	
}

function onNext(){
	var lbl = getTL().getLabelAfter(); 
	var time = getTL().getLabelTime(lbl);
	updateLabel(lbl);
	//getTL().seek(lbl);
	TweenLite.to(getTL(),3,{time:time,ease:Bounce.easeInOut});

	//getTL().play(lbl);

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
		getTL().add(aT);
		getTL().time(getTL().totalDuration(),true);
	}
}

function onClear(){
	getTL().clear();
}

function onRemoveRecent(){
	var t = getTL().recent();
	getTL().remove(t);

	TweenLite.fromTo(t.target,.1,{x:t.vars.css.x,y:t.vars.css.y},
								{x:t.vars.startAt.x,y:t.vars.startAt.y});
}

function onKill(){
	getTL().kill(null,[aElements[0].target,aElements[1].target]);
}

function onAddPause(){
	getTL().addPause(getTL().time());
}

function getTL(){
	return tlInner || tl;
}


function onTimeline(){
	if(tlInner){
		tl.add(tlInner);
		
		console.log('totalTime',tlInner.totalTime());
		console.log('totalDuration',tlInner.totalDuration());
		console.log('totalProgress',tlInner.totalProgress());

		tlInner = null;
		$(this).text("Add Timeline");




	}else{
		tlInner = new TimelineMax({repeat:-1,yoyo:true});
		$(this).text('Close Timeline');
	}
}

function onSlow(){
	getTL().timeScale(.5);
}

function onSpeed(){
	getTL().timeScale(2);
}

/*
.time( value:Number, suppressEvents:Boolean=false ) : *
.seek( position:*, suppressEvents:Boolean=true ) : *
.duration( value:Number ) : *

"label-=1"
"+=3"





*/





$(document).ready(onReady);