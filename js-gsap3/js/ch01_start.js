var tweenPan;

function onReady() {
	console.log('Hello Chapter 1');
	$('.content').html('<img src="art/bela2.png" />');
	$('.content img').load(onImageLoad);
}

function onImageLoad() {
	var img = $(this);
	var content = $('.content');

	var moveUp = (content.height() - img.height()) + "px";
	var moveLeft = (content.width() - img.width()) + "px";
	console.log(moveUp, moveLeft);

	// TweenLite.from(img, 1, {
	// 		css: {
	// 		opacity: 0
	// 	}
	// });

	// TweenLite.from(img, 1, {
	// 	css: {
	// 		width: "2000px"
	// 	},
	// 	delay: 0.5
	// });

	tweenPan = TweenMax.to(img, 2, {
		css: {
			top: moveUp,
			left: moveLeft
		},
		repeat: 1,
		yoyo: true,
		ease: Power2.easeInOut,
		roundProps:["top", "left"],
		onUpdate: onImageAnimationUpdate,
		onReverseComplete: onImageAnimationComplete,
		// delay: 1
	});

	img.on("click", onTogglePlay);
}

function onImageAnimationUpdate() {
	var percent = this.progress();
	// console.log(r(percent, 2));
	TweenLite.set(".trackerBody", { css: { width: r(percent, 2) } });
}

function onImageAnimationComplete() {
	$(".tracker").on("mousemove", onMouseMove);
	tweenPan.pause();
}

function onMouseMove(e) {
	var percent = e.pageX / $(".tracker").width();
	// console.log(r(percent, 2));
	tweenPan.progress(percent, false);
	jQuery.proxy(onImageAnimationUpdate, tweenPan)();
	// TweenLite.set(".trackerBody", { css: { width: r(percent, 2) } });
	// console.log(e.pageX, $(".tracker"));
}

function r(value, digits) {
	return Math.round(value * 10 ** (digits + 2)) / (10 ** digits) + "%"
}

function onTogglePlay(e) {
	var aT = TweenLite.getTweensOf(e.target);
	if (aT.length > 0) {
	for (var i=0; i<aT.length; i++) {
		aT[i].paused() ? aT[i].play() : aT[i].pause();
	}
	}else {
		tweenPan.restart();
	}
}

$(document).ready(onReady);