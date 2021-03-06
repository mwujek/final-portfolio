/*jshint devel:true */
function delegateStuff(href){
	console.log(href + ": delegated");
	var otherSections;
	var hiddenSection;
	var hiddenSections;
	if (href === "work.html"){

		function collapseProjects(activeSection, btn){
			hiddenSections = activeSection.siblings('.work-hidden-section');
			otherSections = activeSection.parents('#container').find('.work-visible-section:not(.active-project)');
			btn.velocity({opacity:0},{duration:300, visibility: 'hidden'});
			console.log(hiddenSection);
			console.log(otherSections);
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
						height:530
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
				var imageData = el.css('background-image');
				console.log(imageData);
				el.hover(function() {
					if ( $(this).hasClass('active-thumbnail') ){
						imageTitle.velocity({left:10},{duration:100, loop:1});
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
							mediaContainer.css('background-image',imageData);
						}
					}).velocity({opacity:1},{duration:300, delay:300});

				}

				}); // end click
			}); // end each thumbnail
	}); // end each hidden section

	} else if (href === "bio.html"){
		// bio btn
		function bounceEl(el, moveDirection, distance, aLength, callback){
			//console.log(el, direction, distance, aLength);
			//direction.replace('"','_');
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
				console.log('run');
				el.velocity({paddingRight: distance},{loop: 1, duration: aLength});
			}
		}


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
});


			// end of delegation

	} else {

	}



} // end of delegate function
var router = {
	render: function () {
		switch (location.hash) {
			case '#home': // draw things for subsection "one"
			break;
			case '#work':
			break;
			case '#bio':
			break;
			default:
		}
	},

	navigateTo: function (subsection, url) {
		history.pushState({}, window.title, '#' + subsection.data('link'));
		//processAJAX(url);
		console.log(subsection.data('link'));
		router.render();
	}
};

$(function () {
	$('nav li a').on('click', function () {
		var url = $(this).attr('href');
					//console.log(url);
					router.navigateTo($(this),url);
				});

	$(window).on('popstate', function() {
		router.render();
					//console.log('works here');
				});

				router.render(); // initial page load
			});


$(document).ready(function(){
	var $content = $('#ajax-content');
	var ajaxContent = $('#ajax-content');
	var middleCol = $('.middle-col');
	//once
	ajaxContent.data({state:'empty', active: false, loadingC: false});


	function sectionAnimation(state, href){
		var loadingCircle = $('.loading-circle');
		var loadingCircleContent = loadingCircle.find('span');
		var line = $('.indicator-line');
		var arrowTop = $('.arrow-line-top');
		var arrowBottom = $('.arrow-line-bottom');
//console.log(href);
if ( state === 'empty'){
	console.log('only at BEGIN');
	loadingCircle.velocity({scale:0},{duration:0});
	// load ajax stuffs
  $('#container').remove(); // Remove old content
  $('#ajax-content').load(href + ' #container', function(){
  	delegateStuff(href);
  }); // New content
  line.velocity({width:'90%'},{easing:'ease-out',duration:500,
  	begin: function(){
  		middleCol.velocity({scaleY:0},{duration:0});
  	},
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

  ajaxContent.data({state: href, loadingC: false});


} else if (state !== 'empty' && href !== 'index.html') { // close then open new section
	ajaxContent.velocity({opacity:0},{duration:500, visibility: 'hidden',
		// reset circle
		begin: function(){
			loadingCircle.velocity({scale:0},{duration:300,
				complete: function(){
					loadingCircleContent.velocity({top:12, opacity:1},{duration:0});
				}
			});
		},
		complete: function(){
			middleCol.velocity({opacity:0},{duration: 300,
				complete: function(){
					// load AJAX
					$('#container').remove(); // Remove old content
  				$('#ajax-content').load(href + ' #container'); // New content
  				delegateStuff(href);
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
									middleCol.velocity({opacity:1},{duration: 300});
									ajaxContent.velocity({opacity:1},{duration:500, delay: 300, visibility: 'visible'});
								}
							});
						}
					});
				}
			});
		}
	});
ajaxContent.data({state: href, loadingC: true});
console.log(ajaxContent.data());

} else {  // index.html only
	console.log(ajaxContent.data());
	ajaxContent.velocity({opacity:0},{duration:500, visibility: 'hidden',
		complete: function(){
			middleCol.velocity({width:1},{duration: 300, delay:200})
			.velocity({scaleY:0},{duration:300, delay:200,
				complete:function(){
					if (ajaxContent.data('loadingC') === true){
						// reset circles
						//console.log('circle IS true');
						loadingCircle.velocity({scale:0},{duration:300,
							complete: function(){
								loadingCircleContent.velocity({top:12, opacity:1},{duration:0});
							}
						});
						ajaxContent.data({state: 'empty', loadingC: false});
					} else {
						//console.log('circle not true');
						arrowTop.velocity({rotateZ: "0deg"},{duration:300, delay:200});
						arrowBottom.velocity({rotateZ: "0deg"},{duration:300, delay:200});
					}
					// load ajax
			$('#container').remove(); // Remove old content
  		$('#ajax-content').load(href + ' #container'); // New content
  		delegateStuff(href);
  		line.velocity({width:'20%'},{easing:'ease-out',duration:500, delay: 600});
  		$('#bg-image').velocity({opacity:1}, {duration:500,delay:1200});
  	}

  });
		}
	});
}
} // end of animation function





	$('nav ul > li > a').click(function(e) {
		e.preventDefault();
		var link = $(this);
		var listEl = link.parent();
		var list = listEl.parent();
		var activeCircle = listEl.find('span');
		var href = link.attr('href');
		var bgOpacity = $('#bg-image').css('opacity');
//console.log(bgOpacity);


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
		//processAJAX(href , link);
		sectionAnimation(contentState, href);
	}
}

});




}); // end ready