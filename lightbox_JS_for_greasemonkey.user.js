// ==UserScript==
// @name           Lightbox JS for greasemonkey
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Lightbox JS for greasemonkey
// @include        *
// ==/UserScript==

// ================================= original copyright  =================================

/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
*/

// ================================= original copyright  =================================

(function() {

	// ====================
	// Configuration
	// ====================

	// images
	var loadingImage = 'data:image/gif;base64,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';
	var closeButton = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAXUlEQVQ4jWNgGAWDD7x79+4/uXhgDJw+ffp/BwcHrAY4ODj8nz59OmkGOjg4wDEhcaK9jK4ZlyUkhSGyIdgMIytS8Bk2sC6kahhSPZapng4HX9ajxFCcBpJrKDZzAP478L8U4gAcAAAAAElFTkSuQmCC';
	var overlayImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAA+0lEQVR4nO3RsQkAQRDEsO2/qW/ty/ANKFBu8N3dx3PyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyvt+1Vm8m02YIkEAAAAASUVORK5CYII=';

	// SITEINFO
	var SITEINFO = [
		/* sample
		{
			url:           '',
			link:          '',
			excludeLink:   '',
			thumbnailUrl:  '',
			imageUrl:      '',
		},
		*/
		// Hatena::Fotolife
		// link:         http://f.hatena.ne.jp/kurumigi/20090603164158
		// thumbnailUrl: http://f.hatena.ne.jp/images/fotolife/k/kurumigi/20090603/20090603164158.png
		// imageUrl:     http://img.f.hatena.ne.jp/images/fotolife/k/kurumigi/20090603/20090603164158.png (same file)
		{
			url:           /^http:\/\/[dh]\.hatena\.(?:ne\.jp|com)/i,
			link:          /^http:\/\/f\.hatena\.ne\.jp\/[a-zA-Z][\w-]{2,}\/\d{14}$/i,
			thumbnailUrl:  /^(http:\/\/f\.hatena\.ne\.jp\/images\/fotolife\/[a-zA-Z]\/[a-zA-Z][\w-]{2,}\/\d{8}\/\d{14}\.(?:jpe?g|gif|png))$/i,
			imageUrl:      '$1',
		},
		// normal links to images
		{
			url:           /:\/\//i,
			link:          /.*?\.(jpe?g|gif|png|bmp)$/i,
		},
	]

	// gLightboxImageLinks
	var gLightboxImageLinks = [
		/* sample
		{
			link:         '',
			imageUrl:     '',
			title:        '',
		},
		*/
	]

	// ====================
	// Main routine
	// ====================

	insertHTML();
	checkNodes();

	// for AutoPagerize
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}

	// ====================
	// Functions
	// ====================

	// insertHTML()
	// Function runs on HTML load, inserting html at the top of the page that looks like this:
	//
	//	<img id="gLightboxPreload" />
	//	<div id="gLightboxOverlay">
	//		<a href="#" onclick="hideLightbox(); return false;">
	//			<img id="gLightboxLoadingImage" />
	//		</a>
	//	</div>
	//	<div id="gLightbox">
	//		<a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
	//			<img id="gLightboxImage" />
	//		</a>
	//		<div id="gLightboxDetails">
	//			<div id="gLightboxCaption"></div>
	//		</div>
	//	</div>
	function insertHTML() {
		var objHead = document.getElementsByTagName('head').item(0);
		var objBody = document.getElementsByTagName('body').item(0);
		
		// insert CSS
		var gLightboxCSS = document.createElement('style');
		gLightboxCSS.type = 'text/css';
		var gLightboxCSSText = '#gLightbox { position: absolute; z-index: 1000100; background-color: #000; padding: 10px; border: none; }' +
		                       '#gLightbox img { border: none; clear: both; }' +
		                       '#gLightboxDetails { font-size: 0.8em; padding-top: 0.4em; }' +
		                       '#gLightboxCaption { color: #DDD; text-align: center;}' +
		                       '#gLightboxCloseButton { top: 5px; right: 5px; }' +
		                       '#gLightboxOverlay { position: absolute; top: 0; left: 0; z-index: 1000090; width: 100%; background-image: url(' + overlayImage + '); }' +
		                       '#gLightboxOverlay img { border: none; } ' +
		                       '#gLightboxLoadingImage { position: absolute; z-index: 1000100; }'
		gLightboxCSS.appendChild(document.createTextNode(gLightboxCSSText));
		objHead.insertBefore(gLightboxCSS, objHead.firstChild);
		
		// create overlay div
		var gLightboxOverlay = document.createElement('div');
		gLightboxOverlay.id = 'gLightboxOverlay';
		gLightboxOverlay.style.display = 'none';
		gLightboxOverlay.addEventListener('click', hideLightbox, false);
		objBody.insertBefore(gLightboxOverlay, objBody.firstChild);
		
		// create preloader
		var gLightboxPreload = document.createElement("img");
		gLightboxPreload.id = 'gLightboxPreload';
		gLightboxPreload.style.display = 'none';
		objBody.insertBefore(gLightboxPreload, objBody.firstChild);
		
		// create link to hide lightbox
		var gLightboxLoadingImageLink = document.createElement("a");
		gLightboxLoadingImageLink.href = '';
		gLightboxLoadingImageLink.addEventListener('click', hideLightbox, false);
		gLightboxOverlay.appendChild(gLightboxLoadingImageLink);
		
		// create loading image
		var gLightboxLoadingImage = document.createElement("img");
		gLightboxLoadingImage.src = loadingImage;
		gLightboxLoadingImage.id = 'gLightboxLoadingImage';
		gLightboxLoadingImageLink.appendChild(gLightboxLoadingImage);
		
		// create lightbox div, same note about styles as above
		var gLightbox = document.createElement("div");
		gLightbox.id = 'gLightbox';
		gLightbox.style.display = 'none';
		objBody.insertBefore(gLightbox, gLightboxOverlay.nextSibling);
		
		// create link
		var gLightboxLink = document.createElement("a");
		gLightboxLink.href = '';
		gLightboxLink.addEventListener('click', hideLightbox, false);
		gLightbox.appendChild(gLightboxLink);
		
		// create image
		var gLightboxImage = document.createElement("img");
		gLightboxImage.id = 'gLightboxImage';
		gLightboxLink.appendChild(gLightboxImage);
		
		// create details div, a container for the caption and keyboard message
		var gLightboxDetails = document.createElement("div");
		gLightboxDetails.id = 'gLightboxDetails';
		gLightbox.appendChild(gLightboxDetails);
		
		// create caption
		var gLightboxCaption = document.createElement("div");
		gLightboxCaption.id = 'gLightboxCaption';
		gLightboxCaption.style.display = 'none';
		gLightboxDetails.appendChild(gLightboxCaption);
	}

	// addFilterHandler() 
	function addFilterHandler() {
		if (window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(checkNodes);
		}
	}

	// checkNodes(nodes)
	function checkNodes(nodes) {
		var nodes = nodes || document;
		
		if (nodes.length) {
			nodes.forEach(addImage);
		} else {
			addImage(nodes);
		}
	}

	// addImage(node)
	// Going through link tags looking for links to images.
	// These links receive onclick events that enable the lightbox display for their targets.
	function addImage(node) {
		var lastElement, imageUrl;
		
		var links = getElementsByXPath(".//a[@href]", node);
		
		for (var i = 0; i < links.length; i++) {
			for (var j = 0; j < SITEINFO.length; j++) {
				if (links[i].href.match(SITEINFO[j]['link']) && !(SITEINFO[j]['excludeLink'] && links[i].href.match(SITEINFO[j]['excludeLink']))) {
					lastElement = gLightboxImageLinks.length;
					
					imageUrl = getImageUrl(links[i], SITEINFO[j]);
					
					if (imageUrl) {
						gLightboxImageLinks[lastElement] = {
							link:         links[i].href,
							imageUrl:     imageUrl,
							title:        (links[i].title || links[i].href),
						};
						
						// set eventListener
						var setEvent = function(element) {
							links[i].addEventListener('click', function(event) {
								showLightbox(event, element);
							}, false);
						}
						setEvent(lastElement);
						
						break;
					}
				}
			}
		}
	}

	// getImageUrl(node, siteinfo)
	function getImageUrl(node, siteinfo) {
		if (siteinfo['imageUrl']) {
			var images = getElementsByXPath(".//img[@src]", node);
			
			// thumbnailUrl => imageUrl
			for (var i = 0; i < images.length; i++) {
				if (images[i].src.match(siteinfo['thumbnailUrl'])) {
					return images[i].src.replace(siteinfo['thumbnailUrl'], siteinfo['imageUrl']);
				} 
			}
			
			// link => imageUrl
			return node.href.replace(siteinfo['link'], siteinfo['imageUrl'])
		} else {
			return node.href;
		}
	}

	// showLightbox(event, element)
	// load images. Pleaces new image in lightbox then centers and displays.
	function showLightbox(event, element) {
		if (event.shiftKey && event.ctrlKey) {
			// shift + ctrl + click => don't use lightbox and open the link in this window.
			event.preventDefault();
			location.href = gLightboxImageLinks[element]['link'];
			return true;
		} else if (event.shiftKey || event.ctrlKey) {
			// shift + click, ctrl + click => don't use lightbox.
			return true;
		} else {
			// cancel opening image
			event.preventDefault();
			
			// prep objects
			var gLightbox             = document.getElementById('gLightbox');
			var gLightboxImage        = document.getElementById('gLightboxImage');
			var gLightboxDetails      = document.getElementById('gLightboxDetails');
			var gLightboxCaption      = document.getElementById('gLightboxCaption');
			var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
			var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
			var gLightboxPreload      = document.getElementById('gLightboxPreload');
			
			// get page size
			var arrayPageSize = getPageSize();
			var arrayPageScroll = getPageScroll();
			
			// center loadingImage
			gLightboxLoadingImage.style.top = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - gLightboxLoadingImage.naturalHeight) / 2) + 'px';
			gLightboxLoadingImage.style.left = ((arrayPageSize[0] - 20 - gLightboxLoadingImage.naturalWidth) / 2) + 'px';
			gLightboxLoadingImage.style.display = 'block';
			
			// set height of Overlay to take up whole page and show
			gLightboxOverlay.style.height = arrayPageSize[1] + 'px';
			gLightboxOverlay.style.display = 'block';
			
			// set caption
			gLightboxCaption.innerHTML = gLightboxImageLinks[element]['title'];
			
			// Places new image in lightbox then centers.
			gLightboxPreload.addEventListener('load', function() {
				// load image
				gLightboxImage.src = gLightboxPreload.src;
				
				// After image is loaded, update the overlay height as the new image might have
				// increased the overall page height.
				arrayPageSize = getPageSize();
				arrayPageScroll = getPageScroll();
				gLightboxOverlay.style.height = arrayPageSize[1] + 'px';
				
				// get image size
				var imageHeight = gLightboxPreload.naturalHeight;
				var imageWidth  = gLightboxPreload.naturalWidth;
				var resizedHeight = imageHeight;
				var resizedWidth  = imageWidth;
				
				// center lightbox and make sure that the top and left values are not negative
				// and the image placed outside the viewport
				var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imageHeight) / 2);
				var lightboxLeft = (arrayPageSize[0] - 20 - imageWidth) / 2;
				
				// resize if image is larger than screen size
				if (lightboxTop - arrayPageScroll[1] < 0 || lightboxLeft - arrayPageScroll[0] < 0) {
					// arrayPageSize[3] == windowHeight, arrayPageSize[2] == windowWidth
					if (imageHeight / arrayPageSize[3] > imageWidth / arrayPageSize[2]) {
						// height is too big
						resizedHeight = arrayPageSize[3] - 50;
						resizedWidth = imageWidth * (resizedHeight / imageHeight);
						
						lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - resizedHeight) / 2);
						lightboxLeft = (arrayPageSize[0] - 20 - resizedWidth) / 2;
					} else {
						// width is too big
						resizedWidth = arrayPageSize[0] - 20;
						resizedHeight = imageHeight * (resizedWidth / imageWidth);
						
						lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - resizedHeight) / 2);
						lightboxLeft = (arrayPageSize[0] - 20 - resizedWidth) / 2;
					}
				}
				
				// set css
				gLightbox.style.top = lightboxTop + 'px';
				gLightbox.style.left = lightboxLeft + 'px';
				gLightboxImage.style.height = resizedHeight + 'px';
				gLightboxImage.style.width = resizedWidth + 'px';
				gLightboxCaption.style.width = resizedWidth + 'px';
				
				// view image
				gLightboxImage.addEventListener('load', function() {
					gLightboxImage.title = gLightboxCaption.innerHTML;
					
					gLightbox.style.display = 'block';
					gLightboxCaption.style.display = 'block';
					gLightboxLoadingImage.style.display = 'none';
				}, false);
			}, false);
			
			// preload image
			gLightboxPreload.src = gLightboxImageLinks[element]['imageUrl'];
		}
	}

	// hideLightbox(event)
	function hideLightbox(event) {
		// cancel opening image
		event.preventDefault();
		
		// prep objects
		var gLightbox = document.getElementById('gLightbox');
		var gLightboxOverlay = document.getElementById('gLightboxOverlay');
		
		// hide lightbox and overlay
		gLightbox.style.display = 'none';
		gLightboxOverlay.style.display = 'none';
	}

	// getPageSize()
	// Returns array with page width, height and window width, height
	// Original core code from - quirksmode.org
	// Edit for Firefox by pHaez
	function getPageSize(){
		var bodyWidth, bodyHeight, windowWidth, windowHeight;;
		
		// detect rendering modes
		if (document.compatMode == "CSS1Compat") {
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
			bodyWidth = document.documentElement.scrollWidth;
			bodyHeight = document.documentElement.scrollHeight;
		} else {
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
			bodyWidth = document.body.scrollWidth;
			bodyHeight = document.body.scrollHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if (bodyHeight < windowHeight) {
			pageHeight = windowHeight;
		} else { 
			pageHeight = bodyHeight;
		}
		
		// for small pages with total width less then width of the viewport
		if (bodyWidth < windowWidth) {
			pageWidth = windowWidth;
		} else {
			pageWidth = bodyWidth;
		}
		
		arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
		return arrayPageSize;
	}

	// getPageScroll()
	// Returns array with x,y page scroll values.
	// Original core code from - quirksmode.org
	function getPageScroll(){
		var xScroll, yScroll;
		
		xScroll = window.pageXOffset;
		yScroll = window.pageYOffset;
		
		arrayPageScroll = new Array(xScroll, yScroll)
		return arrayPageScroll;
	}

	// ====================
	// Utility functions
	// ====================

	// getElementsByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getElementsByXPath(xpath, node) {
		var node = node || document;
		var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var data = [];
		for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
			data.push(nodesSnapshot.snapshotItem(i));
		}
		return (data.length >= 1) ? data : null;
	}

	// getFirstElementByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getFirstElementByXPath(xpath, node) {
		var node = node || document;
		var result = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return result.singleNodeValue ? result.singleNodeValue : null;
	}

})()
