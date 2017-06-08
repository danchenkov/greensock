function onReady(){
	console.log('Hello Chapter 5');

	var me = $('#me');
	var offsetWidth = -Math.round(me.width()/2);
	var offsetHeight = -Math.round(me.height()/2);
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
		canvas.height = 400;
		canvas.width = 800;
		context.strokeStyle = '#0f8';
		context.moveTo(200,200);
		context.lineTo(500,100);
		context.lineTo(700,200);
		context.lineTo(700,10);
		// context.lineTo(700,290);

		context.stroke();

		context.strokeStyle = '#ff0000';
		context.beginPath();
		context.moveTo(200,200);
		// context.quadraticCurveTo(250,200,700,10);
		// context.bezierCurveTo(200,200,700,290,700,10);
		context.bezierCurveTo(500,100,700,200,700,10);
		context.bezierCurveTo(500,100,700,200,200,200);

		context.closePath();
		context.stroke();


	// TweenLite.set(
	// 	me,
	// 	{
	// 		css: {
	// 			left: 200+offsetWidth,
	// 			top: 200+offsetHeight
	// 		},
	// 	},
	// );

	// TweenLite.to(
	// 	me,
	// 	1,
	// 	{
	// 		css: {
	// 			left: 600+offsetWidth,
	// 			top: 200+offsetHeight
	// 		},
	// 		ease: Bounce.easeOut
	// 	}
	// );

	// TweenLite.set(me, {css:{left:200+offsetWidth,top:200+offsetHeight}});
	TweenLite.to(me, 3, {bezier:{type:"cubic", values:[
		{left:200+offsetWidth,top:200+offsetHeight},
		{left:500+offsetWidth,top:100+offsetHeight},
		{left:700+offsetWidth,top:200+offsetHeight},
		{left:700+offsetWidth,top:10+offsetHeight},
		{left:500+offsetWidth,top:100+offsetHeight},
		{left:700+offsetWidth,top:200+offsetHeight},
		{left:200+offsetWidth,top:200+offsetHeight}
		]},ease: Power4.easeInOut});

   /* TweenLite.to(me,3, {bezier:[
		{left:700+offsetWidth,top:300+offsetHeight},
		{left:700+offsetWidth,top:10+offsetHeight}
		]});*/

	/*TweenLite.to(me,3, {bezier:{type:"quadratic",values:[
		{left:150+offsetWidth,top:10+offsetHeight},
		{left:250+offsetWidth,top:200+offsetHeight},
		{left:700+offsetWidth,top:10+offsetHeight},
		{left:250+offsetWidth,top:200+offsetHeight},
		{left:150+offsetWidth,top:10+offsetHeight}
		]}});*/

	// TweenLite.to(me,3, {bezier:{type:"cubic",values:[
 //    	{left:100+offsetWidth,top:10+offsetHeight},
 //    	{left:500+offsetWidth,top:100+offsetHeight},
 //    	{left:700+offsetWidth,top:290+offsetHeight},
 //    	{left:700+offsetWidth,top:10+offsetHeight},
 //    	{left:500+offsetWidth,top:100+offsetHeight},
 //    	{left:700+offsetWidth,top:290+offsetHeight},
 //    	{left:100+offsetWidth,top:10+offsetHeight}
 //    	],
 //    	autoRotate:['left','top','rotation',60*Math.PI/180,true]

 //    }});


	/*var obj = {x:100, y:150, r:4,color:'#aaaaaa'};

	TweenLite.to(obj,6,{x:700,y:200,r:40, colorProps:{color:'#0F8FF5'},

		onUpdate:onUpdateCanvas,onUpdateParams:["{self}",context,obj]})*/

}

// function onUpdateCanvas(t,context,obj){
// 	var x = parseInt(obj.x);
// 	var y = parseInt(obj.y);
// 	var r = parseInt(obj.r);

// 	context.strokeStyle = obj.color;
// 	context.beginPath();
// 	context.arc(x,y,r,0,Math.PI*2,true);
// 	context.closePath();

// 	context.stroke();
// }



$(document).ready(onReady);