// ==UserScript==
// @name           Lightbox JS for greasemonkey
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Lightbox JS for greasemonkey
// @include        *
// @exclude        http://image-search.yahoo.co.jp/search?*
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

	// DEBUG FLAG
	var DEBUG = true;

	// images
	var OVERLAYIMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAA+0lEQVR4nO3RsQkAQRDEsO2/qW/ty/ANKFBu8N3dx3PyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyvt+1Vm8m02YIkEAAAAASUVORK5CYII=';
	var LOADINGiMAGE = 'data:image/gif;base64,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';
	var CLOSEBUTTON  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAXUlEQVQ4jWNgGAWDD7x79+4/uXhgDJw+ffp/BwcHrAY4ODj8nz59OmkGOjg4wDEhcaK9jK4ZlyUkhSGyIdgMIytS8Bk2sC6kahhSPZapng4HX9ajxFCcBpJrKDZzAP478L8U4gAcAAAAAElFTkSuQmCC';

	// SITEINFO
	var SITEINFO = [
		/* sample
		{
			url:           //i,
			link:          //i,
			excludeLink:   //i,
			function:      '',
			re:            //i,
			replace:       '',
			getImageUrl:   function(node) { return ... },
		},
		*/

		// google image search
		{
			url:           /^http:\/\/images\.(?:google\.[a-z.]+)\/images/i,
			link:          /^http:\/\/images\.(?:google\.[a-z.]+)\/imgres\?.*?imgurl=(.*?)(?:&.*)?$/i,
			function:      'link',
			replace:       '$1',
		},

		// wikipedia
		{
			url:           /^https?:\/\/(.*?\.)?wikipedia\.org/i,
			link:          /:.*?\.(jpe?g|gif|png)$/i,
			function:      'thumbnail',
			re:            /(.+?)\/thumb\/(.+?)\.(jpe?g|gif|png).*$/i,
			replace:       '$1/$2.$3',
		},

		// ITmedia
		{
			url:           /^http:\/\/(?:www\.itmedia\.co|bizmakoto)\.jp\//i,
			link:          /^(http:\/\/image\.itmedia\.co\.jp)\/l\/im\/(\w+\/articles\/\d{4}\/\d{2}\/l_[\w-]+\.(?:jpg|png))/i,
			function:      'link',
			replace:       '$1/$2',
		},

		// Impress Watch (type1)
		{
			url:           /^http:\/\/[a-z]+\.watch\.impress\.co\.jp\//i,
			link:          /(img\/[a-z]+\/docs\/\d{3}\/\d{3})\/html\/([\w-]+\.(?:jpg|png))\.html/i,
			function:      'link',
			replace:       '$1/$2',
		},
		
		// Impress Watch (type2)
		{
			url:           /^http:\/\/k-tai\.impress\.co\.jp\//i,
			link:          /cda\/parts\/image_for_link\/[\d-]+\.html/i,
			function:      'thumbnail',
			re:            /(cda\/static\/image\/\d{4}\/\d{2}\/\d{2}\/[\w-]+?)_s\.(jpg|png)$/i,
			replace:       '$1l.$2',
		},
		
		// Impress Watch (type3)
		{
			url:           /^http:\/\/k-tai\.impress\.co\.jp\//i,
			link:          /cda\/parts\/image_for_link\/[\d-]+\.html/i,
			function:      'thumbnail',
			re:            /(cda\/static\/image\/\d{4}\/\d{2}\/\d{2}\/[\w-]+?)s\.(jpg|png)$/i,
			replace:       '$1.$2',
		},
		
		// Impress Watch (type4)
		{
			url:           /^http:\/\/www\.watch\.impress\.co\.jp\/akiba\//i,
			link:          /((?:image)?\d{8}\/[\w-]+)\.html/i,
			function:      'link',
			replace:       '$1.jpg',
		},
		
		// Impress Watch (type5)
		{
			url:           /^http:\/\/www\.forest\.impress\.co\.jp\//i,
			link:          /(article\/\d{4}\/\d{2}\/\d{2}\/\w+_\d+r)\.html/i,
			function:      'link',
			replace:       '$1.jpg',
		},

		// amazon
		{
			url:           /^http:\/\/www\.amazon\.(?:co(?:m|\.jp|\.uk)|fr|de|ca)\//i,
			link:          /^http:\/\/www\.amazon\.(?:co(?:m|\.jp|\.uk)|fr|de|ca)\/gp\/product\/images\/(\w{10})\/.*ref=dp_(?:otherviews|image).*$/i,
			function:      'link',
			replace:       'http://ec2.images-amazon.com/images/P/$1.01._SCLZZZZZZZ_.jpg',
		},

		// toranoana (type1)
		{
			url:           /^http:\/\/www.toranoana.jp\/mailorder\/article\/\d{2}\/\d{4}\/\d{2}\/\d{2}\/\d{12}\.html$/i,
			link:          /^javascript:popUpWindow/i,
			function:      'thumbnail',
			re:            /(img(?:18)?\/\d{2}\/\d{4}\/\d{2}\/\d{2}\/\d{12}-\d)\.gif$/i,
			replace:       'popup_$1p.jpg',
		},

		// toranoana (type2)
		{
			url:           /^http:\/\/www.toranoana.jp\/mailorder\/[a-z]{3}\/pagekit\/\d{4}\/\d{2}\/\d{2}\/\d{10}\/index\.html$/i,
			link:          /^javascript:popUpWindow/i,
			function:      'thumbnail',
			re:            /(\w+-\d)\.jpg$/i,
			replace:       '$1p.jpg',
		},

		// danbooru
		{
			url:           /^http:\/\/(?:dan|safe)booru\.donmai\.us/i,
			link:          /^http:\/\/(?:dan|safe)booru\.donmai\.us\/post\/show\/\d+/i,
			getImageUrl:   function(node) {
				var imageUrl = getImageUrl['thumbnail'](node, /^(http:\/\/(?:dan|safe)booru\.donmai\.us\/data\/)preview\/([\w]+)\.jpg/i, '$1$2');
				if (imageUrl) {
					imageUrl['url'] = [imageUrl['url'] + '.jpg', imageUrl['url'] + '.png', imageUrl['url'] + '.gif', imageUrl['url'] + '.bmp'];
					return imageUrl;
				}
			},
		},

		// pixiv
		{
			url:           /^http:\/\/www\.pixiv\.net\//i,
			link:          /^http:\/\/www\.pixiv\.net\/member_illust\.php\?mode=(?:medium|big)&illust_id=/i,
			function:      'thumbnail',
			re:            /(\d+)_[sm]\.(jpg|png|gif)/i,
			replace:       '$1.$2',
		},

		// deviantart
		{
			url:           /^https?:\/\/(?:.*?\.)?deviantart\.(?:com|net)/i,
			link:          /^https?:\/\/.*?\.deviantart\.(?:com|net)\/(?:deviation|print|art)\/.+/i,
			function:      'thumbnail',
			re:            /^http(s)?:\/\/th(\d+)\.deviantart\.(?:com|net)\/([^\/]*)\/[^\/]*\/(.*?)\.(jpe?g|gif|png)$/i,
			replace:       'http$1://fc$2.deviantart.com/$3/$4.$5',
		},

		// Hatena
		{
			url:           /^http:\/\/[dh]\.hatena\.(?:ne\.jp|com)/i,
			link:          /^http:\/\/f\.hatena\.ne\.jp\/[a-zA-Z][\w-]{2,}\/\d{14}$/i,
			function:      'thumbnail',
			re:            /^(http:\/\/f\.hatena\.ne\.jp\/images\/fotolife\/[a-zA-Z]\/[a-zA-Z][\w-]{2,}\/\d{8}\/\d{14}\.(?:jpe?g|gif|png))$/i,
		},

		// flickr
		{
			url:           /^https?:\/\/(.*?\.)?flickr\.com/i,
			link:          /\/photos\/[^\/]+\/[0-9]+/i,
			function:      'thumbnail',
			re:            /_[tsm]\.jpg/i,
			replace:       '.jpg',
		},

		// normal links to images
		{
			url:           /:\/\//i,
			link:          /.*?\.(jpe?g|gif|png|bmp)$/i,
			function:      'link',
		},
	]

	// ====================
	// Global variable
	// ====================

	// SITEINFO used by this page
	var siteinfoToUse = []

	// imageLinks
	//  link:            links to the image file.
	//  imageUrl:        url of image file.
	//  title:           title of image file.
	//  backgroundColor: background-color of image file.
	var imageLinks = []
	imageLinks.nowViewing = 0;
	
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
	//			<span id="gLightboxError" />
	//		</a>
	//		<div id="gLightboxCaption"></div>
	//	</div>
	function insertHTML() {
		var objHead = document.getElementsByTagName('head').item(0);
		var objBody = document.getElementsByTagName('body').item(0);
		
		// insert CSS
		var gLightboxCSS = document.createElement('style');
		gLightboxCSS.type = 'text/css';
		var gLightboxCSSText = '#gLightbox { position: absolute; z-index: 1000100; background-color: #000; padding: 10px; border: none; -moz-border-radius: 10px;}' +
		                       '#gLightboxImage { border: none; clear: both; }' +
		                       '#gLightboxError { color: #FFF; text-align: center; font-size: 10em; }' +
		                       '#gLightboxCaption { color: #DDD; text-align: center; font-size: 0.8em; padding-top: 0.4em; }' +
		                       '#gLightboxCloseButton { top: 5px; right: 5px; }' +
		                       '#gLightboxOverlay { position: absolute; top: 0; left: 0; z-index: 1000090; width: 100%; background-image: url(' + OVERLAYIMAGE + '); }' +
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
		gLightboxLoadingImage.src = LOADINGiMAGE;
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
		
		// create error message
		var gLightboxError = document.createElement("span");
		gLightboxError.style.display = 'none';
		gLightboxError.id = 'gLightboxError';
		gLightboxLink.appendChild(gLightboxError);
		
		// create caption
		var gLightboxCaption = document.createElement("div");
		gLightboxCaption.id = 'gLightboxCaption';
		gLightboxCaption.style.display = 'none';
		gLightbox.appendChild(gLightboxCaption);
	}

	// checkSITEINFO();
	function checkSITEINFO() {
		for (var i = 0; i < SITEINFO.length; i++) {
			if (location.href.match(SITEINFO[i]['url'])) {
				siteinfoToUse.push(SITEINFO[i]);
			}
		}
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
		var lastElement, imageUrl, setEvent;
		
		var links = getElementsByXPath(".//a[@href]", node);
		
		for (var i = 0; i < links.length; i++) {
			for (var j = 0; j < siteinfoToUse.length; j++) {
				if (links[i].href.match(siteinfoToUse[j]['link']) && !(siteinfoToUse[j]['excludeLink'] && links[i].href.match(siteinfoToUse[j]['excludeLink']))) {
					lastElement = imageLinks.length;
					
					// declare eventListener
					setEvent = function(element) {
						links[i].addEventListener('click', function(event) {
							showLightbox(event, element);
						}, true);
					}
					
					if (lastElement > 0 && (links[i].href == imageLinks[lastElement - 1]['link'])) {
						// if duplicate images, reuse before event
						setEvent(lastElement - 1);
					} else {
						// detect image url and title
						if (siteinfoToUse[j]['getImageUrl']) {
							imageUrl = siteinfoToUse[j]['getImageUrl'](links[i]);
						} else {
							imageUrl = getImageUrl[siteinfoToUse[j]['function']](links[i], siteinfoToUse[j]['re'] || siteinfoToUse[j]['link'], siteinfoToUse[j]['replace']);
						}
						
						if (imageUrl) {
							imageLinks[lastElement] = {
								link:            links[i].href,
								imageUrl:        imageUrl['url'],
								title:           imageUrl['title'],
								backgroundColor: searchBackgroundColor(links[i]),
							};
							
							if (DEBUG) { GM_log(lastElement + "(" + i + ", " + j + ")\n" + imageLinks[lastElement]['link'] + "\n" + imageLinks[lastElement]['imageUrl'] + "\n" + imageLinks[lastElement]['title'] + "\n" + imageLinks[lastElement]['backgroundColor']); }
							
							// set eventListener
							setEvent(lastElement);
							
							break;
						}
					}
				}
			}
		}
		
		// set eventListener if exist images
		if (imageLinks.length > 0) {
			document.addEventListener('keyup', getKey, true);
		}
	}

	var getImageUrl = {
		// get image url from link
		link:      function(node, re, replace) {
			if (DEBUG) {GM_log("getImageUrl.link(node, " + re + ", " + replace + ")") };
			
			var imageUrl;
			
			var matchUrl = node.href.match(re);
			
			if (matchUrl) {
				if (replace) {
					imageUrl = decodeURIComponent(node.href.replace(re, replace));
				} else {
					imageUrl = decodeURIComponent(node.href);
				}
			}
			
			var imageTitle = node.title || imageUrl;
			
			return {url: imageUrl, title: imageTitle};
		},
		
		// get image url from thumbnail image
		thumbnail: function(node, re, replace) {
			if (DEBUG) {GM_log("getImageUrl.thumbnail(node, " + re + ", " + replace + ")") };
			
			var matchUrl, imageUrl, imageTitle;
			
			var images = getElementsByXPath(".//img[@src]", node);
			
			for (var i = 0; i < images.length; i++) {
				matchUrl = images[i].src.match(re);
				
				if (matchUrl) {
					if (replace) {
						imageUrl = decodeURIComponent(images[i].src.replace(re, replace));
					} else {
						imageUrl = decodeURIComponent(images[i].src);
					}
					
					imageTitle = images[i].title || node.title || imageUrl;
					
					return {url: imageUrl, title: imageTitle};
				}
			}
		},
	}

	// getKey(event)
	// Gets keycode. If 'x' is pressed then it hides the lightbox.
	function getKey(event) {
		switch (event.keyCode) {
			case 27: // Esc
			case 88: // 'x'
				hideLightbox(event);
				break;
			case 37: // Left(<-)
				loadAnotherImage(-1, event);
				break;
			case 39: // Right(->)
				loadAnotherImage(1, event);
				break;
			case 38: // Up
				loadAnotherImage(-imageLinks.nowViewing, event);
				break;
			case 40: // Down
				loadAnotherImage(-(imageLinks.nowViewing + 1), event);
				break;
		}
	}

	// loadAnotherImage(step, event)
	// load another image
	function loadAnotherImage(step, event) {
		// cancel default events
		stopEvents(event);
		
		var loadImage = (imageLinks.nowViewing + step) % imageLinks.length;
		
		if (loadImage < 0) {
			loadImage = loadImage + imageLinks.length;
		}
		hideLightbox("");
		showLightbox("", loadImage);
	}

	// hideLightbox(event)
	function hideLightbox(event) {
		// cancel opening image
		stopEvents(event);
		
		// prep objects
		var gLightbox             = document.getElementById('gLightbox');
		var gLightboxImage        = document.getElementById('gLightboxImage');
		var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
		var gLightboxPreload      = document.getElementById('gLightboxPreload');
		
		// remove event listener
		gLightboxImage.removeEventListener('load', loaded, false);
		gLightboxPreload.removeEventListener('load', preloaded, false);
		gLightboxPreload.removeEventListener('error', errorMessage, false);
		
		// remove image
		gLightboxImage.src = '';
		
		// hide lightbox and overlay
		gLightbox.style.display = 'none';
		gLightboxOverlay.style.display = 'none';
	}

	// showLightbox(event, element)
	// load images. Pleaces new image in lightbox then centers and displays.
	function showLightbox(event, element) {
		if (event.shiftKey && event.ctrlKey) {
			// shift + ctrl + click => don't use lightbox and open the link in this window.
			stopEvents(event);
			location.href = imageLinks[element]['link'];
			return true;
		} else if (event.shiftKey || event.ctrlKey) {
			// shift + click, ctrl + click => don't use lightbox.
			return true;
		} else {
			// cancel opening image
			stopEvents(event);
			
			// prep objects
			var gLightbox             = document.getElementById('gLightbox');
			var gLightboxImage        = document.getElementById('gLightboxImage');
			var gLightboxCaption      = document.getElementById('gLightboxCaption');
			var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
			var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
			var gLightboxPreload      = document.getElementById('gLightboxPreload');
			
			// get page size and viewport
			var sizeAndPosition = getSizeAndPosition();
			
			// calculate display position
			var calculateDisplayPosition = function(imageWidth, imageHeight) {
				return {
					x: ((sizeAndPosition['page']['x'] - 20 - imageWidth) / 2),
					y: sizeAndPosition['position']['y'] + ((sizeAndPosition['window']['y'] - 35 - imageHeight) / 2),
				}
			};
			var displayPosition = calculateDisplayPosition(gLightboxLoadingImage.naturalWidth, gLightboxLoadingImage.naturalHeight);
			
			// center loadingImage
			gLightboxLoadingImage.style.top = displayPosition['y'] + 'px';
			gLightboxLoadingImage.style.left = displayPosition['x'] + 'px';
			gLightboxLoadingImage.style.display = 'block';
			
			// set height of Overlay to take up whole page and show
			gLightboxOverlay.style.height = sizeAndPosition['page']['y'] + 'px';
			gLightboxOverlay.style.display = 'block';
			
			// after preloading image, places new image in lightbox then centers.
			preloaded = function() {
				// load image
				gLightboxImage.src = gLightboxPreload.src;
				
				// After image is loaded, update the overlay height as the new image might have
				// increased the overall page height.
				sizeAndPosition = getSizeAndPosition();
				gLightboxOverlay.style.height = sizeAndPosition['page']['y'] + 'px';
				
				// get image size
				var imageSize = {
					x: gLightboxPreload.naturalWidth,
					y: gLightboxPreload.naturalHeight,
				};
				// copy values of a object
				var displaySize = {
					x: imageSize['x'],
					y: imageSize['y'],
				};
				
				// center lightbox and make sure that the top and left values are not negative
				// and the image placed outside the viewport
				displayPosition = calculateDisplayPosition(imageSize['x'], imageSize['y']);
				
				// resize if image is larger than screen size
				if (displayPosition['y'] - sizeAndPosition['position']['y'] < 0 || displayPosition['x'] - sizeAndPosition['position']['x'] < 0) {
					// which too bigs?
					if (imageSize['y'] / sizeAndPosition['window']['y'] > imageSize['x'] / sizeAndPosition['window']['x']) {
						// height is too big
						displaySize['y'] = sizeAndPosition['window']['y'] - 50;
						displaySize['x'] = imageSize['x'] * (displaySize['y'] / imageSize['y']);
						
						displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
					} else {
						// width is too big
						displaySize['x'] = sizeAndPosition['page']['x'] - 20;
						displaySize['y'] = imageSize['y'] * (displaySize['x'] / imageSize['x']);
						
						displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
					}
				}
				
				if (DEBUG) { GM_log("loading: " + gLightboxPreload.src + " (" + gLightboxPreload.naturalHeight + "x" + gLightboxPreload.naturalWidth + ", " + imageSize['y'] + "x" + imageSize['x'] + ", " + displaySize['y'] + "x" + displaySize['x'] + ")") };
				
				// set css
				gLightbox.style.left = displayPosition['x'] + 'px';
				gLightbox.style.top  = displayPosition['y'] + 'px';
				gLightboxImage.style.width  = displaySize['x'] + 'px';
				gLightboxImage.style.height = displaySize['y'] + 'px';
				gLightboxCaption.style.width = displaySize['x'] + 'px';
				
				// after loading image, view image
				loaded = function() {
					gLightboxImage.title = gLightboxCaption.innerHTML;
					gLightboxImage.style.backgroundColor = imageLinks[element]['backgroundColor'];
					
					gLightbox.style.display = 'block';
					gLightboxCaption.style.display = 'block';
					gLightboxLoadingImage.style.display = 'none';
					
					// remove event listener
					gLightboxImage.removeEventListener('load', loaded, false);
				}
				// set event listener
				gLightboxImage.addEventListener('load', loaded , false);
				
				// remove event listener
				gLightboxPreload.removeEventListener('load', preloaded, false);
				gLightboxPreload.removeEventListener('error', errorMessage, false);
			}
				// set event listener
			gLightboxPreload.addEventListener('load', preloaded, false);
			gLightboxPreload.addEventListener('error', errorMessage, false);
			
			// select existing url from urls
			var selectImageUrl = function(urls) {
				if (urls.constructor == Array) {
					for (var i = 0; i < urls.length; i++) {
						if (fileFound(urls[i])) {
							return urls[i];
						}
					}
				} else {
					return urls;
				}
			};
			
			// preload image and set caption
			gLightboxPreload.src = selectImageUrl(imageLinks[element]['imageUrl']);
			gLightboxCaption.innerHTML = imageLinks[element]['title'];
			imageLinks.nowViewing = element;
		}
		
	}

	// errorMessage(event)
	function errorMessage(event) {
		var gLightbox             = document.getElementById('gLightbox');
		var gLightboxError        = document.getElementById('gLightboxError');
		var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
		
		gLightboxError.innerHTML = 'file not found!';
		gLightboxError.style.display = 'inline';
		gLightbox.style.display = 'block';
		gLightboxLoadingImage.style.display = 'none';
		
		this.removeEventListener('error', errorMessage, false);
	}

	// ====================
	// Utility functions
	// ====================

	// stopEvents(event)
	// stop default events
	function stopEvents(event) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	// getSizeAndPosition()
	// Returns array with page width, height and window width, height and x,y page scroll values.
	// Original core code from - quirksmode.org (Edit for Firefox by pHaez)
	function getSizeAndPosition() {
		var documentElement;
		
		// detect rendering modes
		if (document.compatMode == "CSS1Compat") {
			documentElement = document.documentElement;
		} else {
			documentElement = document.body;
		}
		
		// get page size and viewport
		var sizeAndPosition = {
			window:   {
				x : documentElement.clientWidth,
				y : documentElement.clientHeight,
			},
			page:     {
				x : documentElement.scrollWidth,
				y : documentElement.scrollHeight,
			} ,
			position: {
				x : window.pageXOffset,
				y : window.pageYOffset,
			}
		}
		
		// for small pages with total height less then height of the viewport
		if (sizeAndPosition['page']['x'] < sizeAndPosition['window']['x']) {
			sizeAndPosition['page']['x'] = sizeAndPosition['window']['x'];
		}
		
		// for small pages with total width less then width of the viewport
		if (sizeAndPosition['page']['y'] < sizeAndPosition['window']['y']) {
			sizeAndPosition['page']['y'] = sizeAndPosition['window']['y'];
		}
		
		return sizeAndPosition;
	}

	// searchBackgroundColor(node)
	function searchBackgroundColor(node) {
		var backgroundColor = getComputedStyle(node, '').backgroundColor;
		
		// #document don't have style.	
		if ((backgroundColor == '' || backgroundColor == 'transparent') && node.parentNode && node.parentNode.parentNode) {
			backgroundColor = searchBackgroundColor(node.parentNode) ;
		}
		
		return backgroundColor;
	}

	// getElementsByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getElementsByXPath(xpath, node) {
		var node = node || document;
		var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var data = [];
		for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
			data.push(nodesSnapshot.snapshotItem(i));
		}
		return data;
	}

	// getFirstElementByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getFirstElementByXPath(xpath, node) {
		var node = node || document;
		var result = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return result.singleNodeValue;
	}

	// check file exists
	function fileFound(url) {
		var req = new XMLHttpRequest(); // XMLHttpRequest object
		try {
			req.open("HEAD", url, false);
			req.send(null);  
			return (req.status == 200) ? true : false;
		} catch(er) {
			return false;
		}
	}

	// ====================
	// Main routine
	// ====================

	insertHTML();
	checkSITEINFO();
	checkNodes();
	
	// for AutoPagerize
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}

})()
