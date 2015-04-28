/*jshint devel:true */

$(function(){
  TweenLite.to('#top',0,{drawSVG:"0 14"});
  TweenLite.to('#bottom',0,{drawSVG:"0 14"});
});  


	function bounceEl(el, moveDirection, distance, aLength, callback){
			var argLength = arguments.length;
			if (moveDirection === "top"){
				el.velocity({top: distance},{loop: 1, duration: aLength});
			}
			if (moveDirection === "left"){
				if (argLength !== 5){
					el.velocity({left: distance},{loop: 1, duration: aLength});
				} else {
					el.velocity({left: distance},{loop: 1, duration: aLength, complete: callback});
				}
			}
			if (moveDirection === "padding-right"){
				el.velocity({paddingRight: distance},{loop: 1, duration: aLength});
			}
		}


// function delegateStuff(href){
$(document).ajaxSuccess(function(a,b,obj) {
	var otherSections;
	var hiddenSection;
	var hiddenSections;
	//var objUrl = obj.url;

		function collapseProjects(activeSection, btn){
			hiddenSections = activeSection.siblings('.work-hidden-section');
			otherSections = activeSection.parents('#container').find('.work-visible-section:not(.active-project)');
			btn.velocity({opacity:0},{duration:300, visibility: 'hidden'});
			//console.log(hiddenSection);
			//console.log(otherSections);
			hiddenSection.velocity({height:0, opacity:0},{duration:300, visibility: 'hidden',
				complete: function(){
					activeSection.removeClass('active-project');
					otherSections.each(function(i){
						$(this).velocity({height:97, opacity: 1},{duration: 250, visibility: 'visible', delay: 250 * (i+1)});
					});
				}
			});
		}

		hiddenSection = $('#ajax-content').find('.work-hidden-section');
		hiddenSection.each(function(){
			var section = $(this);
			var mediaContainer = section.find('.media-container');
			var video = mediaContainer.find('.video-container iframe');
			var thumbnailList = section.find('.thumbnail-list');
			var thumbnail = thumbnailList.find('li.img-thumbnail');
			var imageTitle = section.find('.image-title');
			var imageTitleHover = section.find('.img-thumbnail-hover');
			var clickableParent = section.parent().find('.work-visible-section');
			var backBtn = clickableParent.parent().find('.go-back-btn');


			// each && click event for expanding / collapsing element
			clickableParent.each(function(){
				var el = $(this);

				// click a project
				el.click(function() {
					el.addClass('active-project');
					var notActive = el.parent().parent().find('.work-visible-section:not(.active-project)');
					notActive.each(function(i){
						$(this).velocity({height:0, opacity: 0},{duration:250, delay:250 * i});
					});
					el.siblings('.work-hidden-section').velocity({
						opacity:1,
						height:830
					},{
						duration:500,
						delay: 1200,
						visibility: 'visible',
						complete: function(){
							backBtn.velocity({
								opacity:0.3
							},{
								duration: 500,
								visibility: 'visible'
							});
						}
					});
				});
			}); // end of project click

			backBtn.click(function(){
				console.log(clickableParent);
				collapseProjects(clickableParent, $(this));
			});
			// set data for hovering
			thumbnailList.data({animating: false});

			thumbnail.each(function(){
				var el = $(this);
				var hoverData = el.attr('text-value');
				var videoData = el.attr('video-index');
				//console.log(imageData);
				el.hover(function() {
					if ( $(this).hasClass('active-thumbnail') ){
						imageTitle.velocity({left:14},{duration:100, loop:1});
						//console.log();
					} else {
						if ( thumbnailList.data('animating') === true){
							imageTitleHover.velocity("stop", true).velocity('reverse',{ duration:0});
							thumbnailList.data({animating:false});
						} else {
							thumbnailList.data({animating:true});
							imageTitleHover.velocity({opacity:1},{duration:300,
								begin:function(){
									imageTitleHover.text(hoverData);
								},
								complete: function(){
									thumbnailList.data({animating:false});
								}
							});
						} // end data conditional statement
					}
				}, function() {
					if ( $(this).hasClass('active-thumbnail') ){

					} else{
						if ( thumbnailList.data('animating') === true){
							imageTitleHover.velocity({opacity:0},{duration:0});
						} else{
							imageTitleHover.velocity({opacity:0},{duration:300,
								begin:function(){
									imageTitleHover.text(hoverData);
								},
								complete: function(){
									thumbnailList.data({animating:false});
								}
							});
						}
					}
				});

//video data

var videoString;
switch (videoData) {
						case 'e1':
							videoString = "https://www.youtube.com/embed/obox5-IxFH8?rel=0&amp;showinfo=0";
							break;
						case 'e2':
							videoString = "https://www.youtube.com/embed/a-XPAfXo1Cs?rel=0&amp;showinfo=0";
							break;
						case 'e3':
							videoString = "https://www.youtube.com/embed/P0-ZKaWVYSk?rel=0&amp";
							break;
						case 'e4':
							videoString = "https://www.youtube.com/watch?v=a-XPAfXo1Cs";
							break;
						case 'e5':
							videoString = "https://www.youtube.com/watch?v=KXUiiMe-2C0";
							break;
						case 's1':
							videoString = "asdasd";
							break;
						case 's2':
							videoString = "asdasd";
							break;
						case 's3':
							videoString = "asdasd";
							break;
						default:
					}
el.click(function() {
	if ( $(this).hasClass('active-thumbnail') ){
	} else {
		thumbnailList.find('.active-thumbnail').removeClass('active-thumbnail');
		$(this).toggleClass('active-thumbnail');
		mediaContainer.velocity({opacity:0},{duration:300,
			begin: function(){
				imageTitleHover.velocity({opacity:0},{duration:300});
				imageTitle.velocity({opacity:0},{duration:200,complete:function(){
					imageTitle.text(hoverData);
				}
			}).velocity({opacity:1},{duration:300,delay:800});
			},
			complete: function(){
				video.attr('src',videoString);
			}
		}).velocity({opacity:1},{duration:300, delay:1000});

	}

				}); // end click
			}); // end each thumbnail
	}); // end each hidden section



// external links
		$('.work-btn-list .btn-text').each(function(){
			var hiddenEl = $(this).parent().find('.hidden-btn');
			var hiddenWidth = hiddenEl.outerWidth();
			var el = $(this);
			el.data({active:false});
			hiddenEl.velocity({width:0, borderColor: '#fff', padding:0},{duration:0});
			el.click(function() {
				var attribute = $(this).parent().attr('class');
				if (el.data('active') === false){

					if(attribute === 'btn-email'){
						hiddenEl.velocity({width:200, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
						$('.email-address').typed({
							strings: ["mattwujek@gmail.com"],
							contentType: 'html',
							typeSpeed: 50,
							showCursor: false
						});
					} else {
						bounceEl($(this),'padding-right',25,100);
						hiddenEl.velocity({width:hiddenWidth, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
					}
					el.data({active:true});
				} else{
					console.log('shrink');
					hiddenEl.velocity({width:0, borderColor: '#fff', paddingRight:0,paddingLeft:0},{duration:500});
					el.data({active:false});
				}
			});
		});
// bio section
// bio
		//var bioBtns = $();
		$('.bio-btn-list .btn-text').each(function(){
			var hiddenEl = $(this).parent().find('.hidden-btn');
			var hiddenWidth = hiddenEl.outerWidth();
			var el = $(this);
			el.data({active:false});
			hiddenEl.velocity({width:0, borderColor: '#fff', padding:0},{duration:0});
			el.click(function() {
				var attribute = $(this).parent().attr('class');
				if (el.data('active') === false){

					if(attribute === 'btn-email'){
						hiddenEl.velocity({width:200, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
						$('.email-address').typed({
							strings: ["mattwujek@gmail.com"],
							contentType: 'html',
							typeSpeed: 50,
							showCursor: false
						});
					} else {
						bounceEl($(this),'padding-right',25,100);
						hiddenEl.velocity({width:hiddenWidth, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
					}
					el.data({active:true});
				} else{
					console.log('shrink');
					hiddenEl.velocity({width:0, borderColor: '#fff', paddingRight:0,paddingLeft:0},{duration:500});
					el.data({active:false});
				}
			});
		});

		// giants link
		var giantsLink = $('.giants-link');
		var picture = $('.profile-pic');
		var goBack = $('.profile-back-btn');
		picture.data({state:'profile'});
		giantsLink.click(function() {
			if (picture.data('state') === 'profile'){
				picture.velocity({opacity:0},{
					duration:500,
					begin: function(){
						bounceEl(giantsLink, "top", -5 , 100);
					},
					complete: function(){
						picture.css({'background':'url(img/giants-yeah.jpg)', 'background-size': 'cover'});
					}
				})
				.velocity({opacity:1},{duration:500,delay:300,
					complete: function(){
						goBack.velocity({left:6},{duration:300, visibility:'visible', easing: 'easeOutCubic' });
					}
				});
				picture.data({state:'giants'});
			}
		});
		
		// change back to profile pic
		goBack.click(function() {
			goBack.velocity({left:-30},{duration:300, visibility:'visible', easing: 'easeInCubic',
				complete: function(){
					picture.velocity({opacity:0},{duration:500,
						complete: function(){
							picture.css({'background':'url(img/profile.jpg)', 'background-size': 'cover'});
						}
					}).velocity('reverse', {duration: 500, delay:300,
						complete: function(){
							picture.data({state:'profile'});
						}
					});

				}
			});
		}); // end of go-back btn for bio profile picture

}); // end of ajax




$(document).ready(function(){
	//var $content = $('#ajax-content');
	var ajaxContent = $('#ajax-content');
	var middleCol = $('.middle-col');
	//once
	ajaxContent.data({state:'empty', active: false});


		


function sectionAnimation(state, href, level){
		var loadingCircle = $('.loading-circle');
		var loadingCircleContent = loadingCircle.find('span');
		var line = $('.indicator-line');
		var arrowTop = $('.arrow-line-top');
		var arrowBottom = $('.arrow-line-bottom');

		if ( state === 'empty'){
		  animateToBurger();
		  loadingCircle.velocity({scale:0},{duration:0});
		  middleCol.velocity({scaleY:0},{duration:0});
			// load ajax stuffs
		  $('#container').remove(); // Remove old content
		  $('#ajax-content').load(href + ' #container');
		  setTimeout(function(){
		  	console.log('only at BEGIN');
		  	line.velocity({width:'90%'},{easing:'ease-out',duration:500, delay: 500,
		  	complete: function(){
		  		arrowTop.velocity({rotateZ: "45deg"},{duration:300});
		  		arrowBottom.velocity({rotateZ: "-45deg"},{duration:300});
		  		middleCol.velocity({scaleY:1},{duration:500, delay:500})
		  		.velocity({width:10},{duration: 300, delay: 200,
		  			complete: function(){
		  				ajaxContent.velocity({opacity:1},{duration:500, delay: 200, visibility: 'visible'});
		  			}
		  		});
		  	}
		  });

		  },500);

		  ajaxContent.data({state: href});


		} else if (state !== 'empty' && href !== 'index.html') { // close then open new section
			ajaxContent.velocity({opacity:0},{duration:500, visibility: 'hidden',
				// reset circle
				begin: function(){
					animateToBurger();
					loadingCircle.velocity({scale:0},{duration:300,
						complete: function(){
							loadingCircleContent.velocity({top:12, opacity:1},{duration:0});
						}
					});
				},
				complete: function(){
					middleCol.velocity({width:1},{duration: 300,
		  		}).velocity({scaleY:0},{duration: 300, delay:200,
		  			complete: function(){
							// load AJAX
							$('#container').remove(); // Remove old content
		  				$('#ajax-content').load(href + ' #container'); // New content
		  			}
		  		});
					arrowTop.velocity({rotateZ: "0deg"},{duration:300, delay:500});
					arrowBottom.velocity({rotateZ: "0deg"},{duration:300, delay:500});
					loadingCircle.velocity({scale:1},{duration:300, delay: 1000,
						complete: function(){
							loadingCircleContent.velocity({top:0, opacity:1},{duration:1200, easing:[0.89,0.06,0.69,0.97],
								complete: function(){
									loadingCircle.velocity({scale:1.3},{duration:125, easing:'ease-in-out', loop:1,
										complete:function(){
											loadingCircle.velocity({scale:0},{duration:300, delay: 200, easing:'ease-in-out',
												complete: function(){
													arrowTop.velocity({rotateZ: "45deg"},{duration:300, delay:300});
													arrowBottom.velocity({rotateZ: "-45deg"},{duration:300, delay:300});
													middleCol.velocity({scaleY:1},{duration:500, delay:600})
										  		.velocity({width:10},{duration: 300, delay: 200,
										  			complete: function(){
										  				ajaxContent.velocity({opacity:1},{duration:500, delay: 300, visibility: 'visible'});
										  			}
										  		});
													
												}
										});
									}
								});
							}
						});
						}
					});
				}
			});
		ajaxContent.data({state: href});
		console.log(ajaxContent.data());

		} else {  // index.html only
			//console.log(ajaxContent.data());
			ajaxContent.data({state:'empty', active:false});
			animateToBurger();
			ajaxContent.velocity({opacity:0},{duration:500, visibility: 'hidden',
				complete: function(){
					middleCol.velocity({width:1},{duration: 300, delay:200})
					.velocity({scaleY:0},{duration:300, delay:200,
						complete:function(){
								// reset circles
								//console.log('circle IS true');
								loadingCircle.velocity({scale:0},{duration:300,
									complete: function(){
										loadingCircleContent.velocity({top:12, opacity:1},{duration:0});
									}
								});
							// load ajax
								$('#container').remove(); // Remove old content
					  		$('#ajax-content').load(href + ' #container'); // New content
					  		arrowTop.velocity({rotateZ: "0deg"},{duration:300, delay:300});
								arrowBottom.velocity({rotateZ: "0deg"},{duration:300, delay:300});
					  		line.velocity({width:'20%'},{easing:'ease-out',duration:500, delay: 800});
					  		$('#bg-image').velocity({opacity:1}, {duration:500,delay:1200});
		  				}

		  		});
				}
			});
		}
} // end of animation function


// nav btn

var menuBtn = $('.menu-btn');
var menuIcon = menuBtn.find('.menu-icon');
var topLine = menuBtn.find('.top-line');
var midLine = menuBtn.find('.mid-line');
var bottomLine = menuBtn.find('.bottom-line');
var tweenDuration = 300;
var delayDuration = 200;
var bezierCurve = [0.89,0.06,0.69,0.97];
var navListItems = $('nav ul li');

function animateToCross(){
	menuBtn.toggleClass('active-menu-btn');

	TweenLite.to('#top',0.8,{drawSVG:"27 94%",delay:0.1});
  TweenLite.to('#mid',0.5,{opacity: 1, drawSVG:"100% 100%",delay:0});
  TweenLite.to('#bottom',0.8,{drawSVG:"27 94%",delay:0.3});
  navListItems.velocity({opacity:1},{duration: tweenDuration, visibility: 'visible'});

	// menuIcon.velocity({rotateZ:'90deg', top:10},{easing: bezierCurve, duration:tweenDuration,
	// 	complete: function(){
	// 		midLine.velocity({left:-30,opacity:0},{duration:tweenDuration, delay:delayDuration,
	// 			complete:function(){
	// 				menuIcon.velocity({top:12},{duration:tweenDuration, delay: delayDuration});
	// 				topLine.velocity({rotateZ:'45deg'},{duration:tweenDuration, delay:delayDuration});
	// 				bottomLine.velocity({rotateZ:'-45deg'},{duration:tweenDuration, delay:delayDuration});
	// 			}
	// 		});
	// 	}
	// });
}

function animateToBurger(){
	menuBtn.toggleClass('active-menu-btn');
  TweenLite.to('#top',0.8,{drawSVG:"0 14"});
  TweenLite.to('#mid',0.8,{opacity: 1, drawSVG:"0% 100%",delay:0.3});
  TweenLite.to('#bottom',0.8,{drawSVG:"0 14"});



	navListItems.velocity({opacity:0},{duration: tweenDuration, visibility: 'hidden'});
}
menuBtn.click(function() {
	var btn = $(this);
	if (btn.hasClass('active-menu-btn') ){
		animateToBurger();
	} else {
		animateToCross();
	}
});
// nav click events
$('nav ul > li > a').click(function(e) {
	e.preventDefault();
	var link = $(this);
	var listEl = link.parent();
	var list = listEl.parent();
	var activeCircle = listEl.find('span');
	var href = link.attr('href');
	var bgOpacity = $('#bg-image').css('opacity');


if ( activeCircle.hasClass('active-nav-link') ){

} else {
	list.find('.active-nav-link').removeClass('active-nav-link');
	activeCircle.toggleClass('active-nav-link');
	link.toggleClass('active-nav-link');
	var contentState = ajaxContent.data('state');
	if (bgOpacity == 1){
		//console.log('run');
		$('#bg-image').velocity({opacity:0}, {duration:500,
			complete: function(){
				//processAJAX(href, link);
				sectionAnimation(contentState, href);
			}
		});
	} else{
		sectionAnimation(contentState, href);
	}
}

}); // end of click function for navigation links




}); // end ready