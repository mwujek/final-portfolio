/*jshint devel:true */



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
	var ajaxURL = obj.url;
	var hiddenSection;


		if (ajaxURL === 'work.html'){

		hiddenSection = $('#ajax-content').find('.work-hidden-section');
		hiddenSection.each(function(){
			var section = $(this);
			var clickableParent = section.parent().find('.work-visible-section');
			var backBtn = clickableParent.parent().find('.go-back-btn');
			var notActive;



			// // each && click event for expanding / collapsing element
				// click a project
				clickableParent.click(function() {
					var el = $(this);
					var sectionID = el.attr('id');
					var currrentHiddenSection = $(this).parent().find('.work-hidden-section');
					var sectionHeight;
					var sectionURL;

					switch (sectionID) {
						case 'work-everlane':
							sectionURL = "everlane.html";
							sectionHeight = 535;
							break;
						case 'work-scoot':
							sectionURL = "scoot.html";
							sectionHeight = 615;
							break;
						case 'work-revolver':
							sectionURL = "revolver.html";
						sectionHeight = 670;
							break;
						case 'work-muni':
							sectionURL = "muni.html";
						sectionHeight = 800;
							break;
						// case 'work-misc':
						// 	sectionURL = "misc.html";
						// sectionHeight = 512
						// 	break;
						default:
					}
					el.addClass('active-project');
					notActive = el.parent().parent().find('.work-visible-section:not(.active-project)');
					notActive.each(function(i){
						$(this).velocity({height:0, opacity: 0},{duration:250, delay:250 * i});
					});
       			el.siblings('.work-hidden-section').velocity({
							height:sectionHeight,
							opacity:1
						},{
							duration:500,
							delay: 1200,
							visibility: 'visible',
							complete: function(){
								backBtn.velocity({opacity:0.3 },{duration: 500, visibility: 'visible', complete: function(){
									if( currrentHiddenSection.data('loadedAJAX') !== true ){
											currrentHiddenSection.load(sectionURL + ' .work-ajax-container', function(){
												//var adjustHeight = el.parent().find('.work-ajax-container').outerHeight();
												//console.log(adjustHeight);
												el.siblings('.work-hidden-section').css('height','auto');
												//el.parent().find('.work-ajax-container').velocity({height:adjustHeight},{duration:300});
											});
											currrentHiddenSection.data({loadedAJAX:true});
									}
								}
							});
							}
						});
				}); // end of project click

			backBtn.click(function(){
				//console.log(clickableParent);
				//collapseProjects(clickableParent, $(this),e);
				var otherSections = clickableParent.parents('#container').find('.work-visible-section:not(.active-project)');
				$(this).velocity({opacity:0},{duration:300, visibility: 'hidden'});
				section.velocity({height:0, opacity:0},{duration:300, visibility: 'hidden',
					complete: function(){
						clickableParent.removeClass('active-project');
						console.log('asd');
						otherSections.each(function(i){
							$(this).velocity({height:97, opacity: 1},{duration: 250, visibility: 'visible', delay: 250 * (i+1)});
						});
					}
				});
			});





	}); // end each hidden section



} else if(ajaxURL !== "work.html" && ajaxURL !== "bio.html"){

			var section = $('#ajax-content').find('.active-project').siblings('.work-hidden-section');
			var mediaContainer = section.find('.media-container');
			var video = mediaContainer.find('.video-container iframe');
			var thumbnailList = section.find('.thumbnail-list');
			var thumbnail = thumbnailList.find('li.img-thumbnail');
			var imageTitle = section.find('.image-title');
			var imageTitleHover = section.find('.img-thumbnail-hover');

			// set data for hovering
			thumbnailList.data({animating: false});

			thumbnail.each(function(){
				var el = $(this);
				var hoverData = el.attr('text-value');
				var videoData = el.attr('video-index');
				el.hover(function() {
					if ( $(this).hasClass('active-thumbnail') ){
						imageTitle.velocity({left:14},{duration:100, loop:1});
					} else {
						if ( thumbnailList.data('animating') === true){
							imageTitleHover.velocity("stop", true).velocity('reverse',{ duration:0});
							thumbnailList.data({animating:false});
						} else {
							thumbnailList.data({animating:true});
							imageTitleHover.velocity({opacity:0.4},{duration:300,
								begin:function(){
									imageTitleHover.html(hoverData);
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
							videoString = "https://www.youtube.com/embed/o_9MeMma0jA?rel=0&amp;showinfo=0";
							break;
						case 'e2':
							videoString = "https://www.youtube.com/embed/kwMT3kOMmLI?rel=0&amp;showinfo=0";
							break;
						case 'e3':
							videoString = "https://www.youtube.com/embed/1V9a3PfBnj4?rel=0&amp;showinfo=0";
							break;
						case 'e4':
							videoString = "https://www.youtube.com/embed/no36AIBt_WI?rel=0&amp;showinfo=0";
							break;
						default:
					}
el.click(function() {
	var videoData = el.attr('video-index');
	var youtubeHref;

							//set strings for external links
			switch (videoData) {
						case 'e1':
							youtubeHref = "http://share.framerjs.com/lkeu2ptmzog8/";
							break;
						case 'e2':
							youtubeHref = "http://share.framerjs.com/j8ln2wkuv75v/";
							break;
						case 'e3':
							youtubeHref = "http://share.framerjs.com/hzwl2dkuajxa/";
							break;
						case 'e4':
							youtubeHref = "http://mattwujek.com/emc/";
							break;
						default:
					}
				var externalLinkHTML = '<a class="title-link" target="_blank" href="' + youtubeHref + '">External Link <span class="external-btn fa fa-external-link"></span></a>';
	if ( $(this).hasClass('active-thumbnail') ){
	} else {
		thumbnailList.find('.active-thumbnail').removeClass('active-thumbnail');
		$(this).toggleClass('active-thumbnail');
		mediaContainer.velocity({opacity:0},{duration:300,
			begin: function(){
				imageTitleHover.velocity({opacity:0},{duration:300});
				imageTitle.velocity({opacity:0},{duration:200,complete:function(){
					imageTitle.html(hoverData + ' ' + externalLinkHTML);
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

} else {
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

	}

}); // end of ajax




$(document).ready(function(){
	//var $content = $('#ajax-content');
	var ajaxContent = $('#ajax-content');
	var middleCol = $('.middle-col');
	//once
	ajaxContent.data({state:'empty', active: false});
	TweenLite.to('#top',0,{drawSVG:"0 14"});
  TweenLite.to('#bottom',0,{drawSVG:"0 14"});
  //$('.menu-btn').velocity({opacity:0.4},{duration:300,visibility:'visible'});
	$('nav').velocity({opacity:1},{duration:500, delay: 500});
		


function sectionAnimation(state, href){
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
		  //console.log(href + ' #container')
		  $('#ajax-content').load(href + ' #container');
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
var bottomLine = menuBtn.find('.bottom-line');
var tweenDuration = 300;
var navListItems = $('nav ul li');



var moveTop = TweenLite.to('#top',0.8,{drawSVG:"27 94%",delay:0.1, ease: Back.easeInOut.config(1.5)}).reverse();
var moveMid = TweenLite.to('#mid',0.5,{opacity: 1, drawSVG:"100% 100%", ease: Back.easeInOut.config(1.5)}).reverse();
var moveBot = TweenLite.to('#bottom',0.8,{drawSVG:"27 94%",delay:0.3, ease: Back.easeInOut.config(1.5)}).reverse();

function animateToCross(){
	menuBtn.toggleClass('active-menu-btn');
	if(!moveTop.isActive()){
		moveTop.reversed(!moveTop.reversed());
		moveMid.reversed(!moveMid.reversed());
		moveBot.reversed(!moveBot.reversed());
		navListItems.each(function(i){
  	$(this).velocity({opacity:1},{duration: tweenDuration, visibility: 'visible', delay: i * (tweenDuration - 100)});
  });
	}
}

function animateToBurger(){
	menuBtn.toggleClass('active-menu-btn');
  if(!moveTop.isActive()){
		moveTop.reversed(!moveTop.reversed());
		setTimeout(function(){
			moveMid.reversed(!moveMid.reversed());
		},300);
		moveBot.reversed(!moveBot.reversed());
		navListItems.each(function(i){
  	$(this).velocity({opacity:0},{duration: tweenDuration, visibility: 'visible', delay: i * (tweenDuration - 100)});
  	});
	}
}




// 	navListItems.velocity({opacity:0},{duration: tweenDuration, visibility: 'hidden'});
// }
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