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
// ==== Configuration ===
	// DEBUG FLAG
	var DEBUG = true;

	// images
	var OVERLAYIMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAA+0lEQVR4nO3RsQkAQRDEsO2/qW/ty/ANKFBu8N3dx3PyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyoQ8AFMm5AGYMiEPwJQJeQCmTMgDMGVCHoApE/IATJmQB2DKhDwAUybkAZgyIQ/AlAl5AKZMyAMwZUIegCkT8gBMmZAHYMqEPABTJuQBmDIhD8CUCXkApkzIAzBlQh6AKRPyAEyZkAdgyvt+1Vm8m02YIkEAAAAASUVORK5CYII=';
	var LOADINGIMAGE = 'data:image/gif;base64,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';
	var CLOSEBUTTON  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAXUlEQVQ4jWNgGAWDD7x79+4/uXhgDJw+ffp/BwcHrAY4ODj8nz59OmkGOjg4wDEhcaK9jK4ZlyUkhSGyIdgMIytS8Bk2sC6kahhSPZapng4HX9ajxFCcBpJrKDZzAP478L8U4gAcAAAAAElFTkSuQmCC';

	// SITEINFO
	var SITEINFO = [
		/* help
			url          : RegExp   : URL of pages.
			function     : String   : function name.
			link         : RegExp   : search URL of link.
			excludeLink  : RegExp   : [optional] exclude URL of links.
			thumbnail    : RegExp   : [optional] search URL of thumbnail images.
			xPath        : String   : [optional] xPath of search elements (link or thumbnail).
			replace      : String   : [optional] replace string of search elements (link or thumbnail).
			titleXPath   : String   : [optional] xPath of title.
			image        : RegExp   : [only if function == 'parseHTMLs'] search URL from linked page.
			imageReplace : String   : [only if function == 'parseHTMLs'] replace string of image.
			getImageUrl  : Function : [only if function == ''] function to get image URLs.
		*/
		/* template
		{
			url:          //,
			function:     '',
			link:         //,
			excludeLink:  //,
			thumbnail:    //,
			xPath:        '',
			replace:      '',
			titleXPath:   '',
			image:        //,
			imageReplace: '',
			getImageUrl:  function(node) { return ... },
		},
		*/

		// google image search
		{
			url:          /^http:\/\/images\.(?:google\.[a-z.]+)\/images/i,
			function:     'page',
			link:         /^http:\/\/images\.(?:google\.[a-z.]+)\/imgres\?.*?imgurl=(.*?)(?:&.*)?$/i,
			replace:      '$1',
		},
		
		// wikipedia
		{
			url:          /^https?:\/\/(?:.*?\.)?wikipedia\.org/i,
			function:     'page',
			link:         /^https?:.*?:.*?\.(?:jpe?g|gif|png)$/i,
			thumbnail:    /^(http:\/\/upload\.wikimedia\.org\/.*?\/)thumb\/(.+?)\.(jpe?g|gif|png).*$/i,
			replace:      '$1$2.$3',
		},

		// uncyclopedia japan
		{
			url:          /^https?:\/\/(?:(?:.*?\.)?(?:uncyclopedia\.info|uncyc\.org)|ansaikuropedia\.org)\//i,
			function:     'page',
			link:         /^https?:.*?:.*?\.(?:jpe?g|gif|png)$/i,
			thumbnail:    /^(http:\/\/images\.uncyc\.org\/.*?\/)(?:thumb\/)?(.+?)\.(jpe?g|gif|png).*$/i,
			replace:      '$1$2.$3',
		},

		// ITmedia
		{
			url:          /^http:\/\/(?:www\.itmedia\.co|bizmakoto)\.jp\//i,
			function:     'page',
			link:         /\/l\/im(\/\w+\/articles\/\d{4}\/\d{2}\/l_[\w-]+\.(?:jpg|png))/i,
			replace:      '$1',
		},

		// Impress Watch (type1)
		{
			url:          /^http:\/\/[a-z]+\.watch\.impress\.co\.jp\//i,
			function:     'page',
			link:         /(\/img\/[a-z]+\/docs\/\d{3}\/\d{3})\/html\/([\w-]+\.(?:jpg|png))\.html/i,
			replace:      '$1/$2',
		},
		
		// Impress Watch (type2)
		{
			url:          /^http:\/\/k-tai\.impress\.co\.jp\//i,
			function:     'parseHTMLs',
			link:         /cda\/parts\/image_for_link\/[\d-]+\.html/i,
			thumbnail:    /\/cda\/static\/image\/\d{4}\/\d{2}\/\d{2}\/[\w-]+?_?s\.(?:jpg|png)$/i,
			image:        /\/cda\/static\/image\/\d{4}\/\d{2}\/\d{2}\/[\w-]+\.(?:jpg|png)(?=")/i, // "
			imageReplace: 'http://k-tai.impress.co.jp/$1',
		},
		
		// Impress Watch (type3)
		{
			url:          /^http:\/\/(?:akiba-pc\.watch\.impress\.co\.jp|www\.watch\.impress\.co\.jp\/akiba)\//i,
			function:     'page',
			link:         /(\/(?:image\d{8}|\d{8}\/image)\/[\w-]+)\.html/i,
			replace:      '$1.jpg',
		},
		
		// Impress Watch (type4)
		{
			url:          /^http:\/\/www\.forest\.impress\.co\.jp\//i,
			function:     'page',
			link:         /(\/article\/\d{4}\/\d{2}\/\d{2}\/\w+_\d+r)\.html/i,
			replace:      '$1.jpg',
		},

		// amazon
		{
			url:          /^http:\/\/www\.amazon\.(?:co(?:m|\.jp|\.uk)|fr|de|ca)\//i,
			function:     'page',
			link:         /http:\/\/www\.amazon\.(?:co(?:m|\.jp|\.uk)|fr|de|ca)\/gp\/product\/images\/(\w{10})\/.*ref=dp_(?:otherviews|image).*$/i,
			replace:      'http://ec2.images-amazon.com/images/P/$1.01._SCLZZZZZZZ_.jpg',
		},

		// toranoana (type1)
		{
			url:          /^http:\/\/www.toranoana.jp\/mailorder\/article\/\d{2}\/\d{4}\/\d{2}\/\d{2}\/\d{12}\.html$/i,
			function:     'page',
			link:         /^javascript:popUpWindow/i,
			thumbnail:    /(img(?:18)?\/\d{2}\/\d{4}\/\d{2}\/\d{2}\/\d{12}-\d)\.gif$/i,
			replace:      'popup_$1p.jpg',
		},
		
		// toranoana (type2)
		{
			url:          /^http:\/\/www.toranoana.jp\/mailorder\/[a-z]{3}\/pagekit\/\d{4}\/\d{2}\/\d{2}\/\d{10}\/index\.html$/i,
			function:     'page',
			link:         /^javascript:popUpWindow/i,
			thumbnail:    /(\/\w+-\d)\.jpg$/i,
			replace:      '$1p.jpg',
		},

		// gema gema (type1)
		{
			url:          /^http:\/\/www\.broccoli\.co\.jp\/dejiko\/gema(_\d+-\d+)?\.html$/i,
			function:     'page',
			link:         /^javascript:/i,
			thumbnail:    /\/menu\/menu(1\d{2})\.gif/i,
			replace:      '/gema/gema$1.jpg',
		},
		
		// gema gema (type2)
		{
			url:          /^http:\/\/www\.broccoli\.co\.jp\/dejiko\/gema(_\d+-\d+)?\.html$/i,
			function:     '',
			link:         /^javascript:/i,
			getImageUrl:  function(node) {
				var imageUrl = {};
				
				try {
					imageUrl['url']   = absolutePath((new RegExp("(gema_img\/gema\/gema" + getElementsByXPath(".//img", node)[0].src.match(/gema_img\/menu\/menu(\d+(?:_ex)?).gif/i)[1] + "\.(?:gif|jpg|png))")).exec(document.documentElement.innerHTML)[1]);
					imageUrl['title'] = imageUrl['url'];
				} catch (error) {}
				
				return imageUrl;
			},
		},

		// pixiv
		{
			url:          /^http:\/\/www\.pixiv\.net\//i,
			function:     'page',
			link:         /^http:\/\/www\.pixiv\.net\/member_illust\.php\?mode=(?:medium|big)&illust_id=/i,
			thumbnail:    /(\/\d+)_(?:[sm]|100)\.(jpg|png|gif)/i,
			replace:      '$1.$2',
			titleXPath:   './following-sibling::div[@class="pdgTop5"] | //div[@class="f18b"]/text()',
		},

		// deviantart
		{
			url:          /^https?:\/\/(?:.*?\.)?deviantart\.(?:com|net)/i,
			function:     'page',
			link:         /^https?:\/\/.*?\.deviantart\.(?:com|net)\/(?:deviation|print|art)\/.+/i,
			thumbnail:    /th(\d+)\.deviantart\.(?:com|net)\/([^\/]*)\/[^\/]*\/(.*?)\.(jpe?g|gif|png)$/i,
			replace:      'fc$1.deviantart.com/$2/$3.$4',
		},

		// Gelbooru
		{
			url:          /^http:\/\/(?:www\.)?gelbooru\.com\/index\.php\?page=post&s=list/i,
			function:     'parseHTMLs',
			link:         /^http:\/\/(?:www\.)?gelbooru\.com\/index\.php\?page=post&s=view&id=/i,
			thumbnail:    /^http:\/\/(?:www\.)?gelbooru\.com\/thumbs\/\d+\/thumnail_\w+\.jpg/i,
			image:        /http:\/\/img\d+\.gelbooru\.com\/\/?(?:images|samples)\/\d+\/[\w_]+\.(?:jpe?g|png|gif|bmp)(?:\?\d+?)?(?=")/i, // "
		},

		// danbooru / nekobooru / sankaku channel (with supplementary script)
		{
			url:          /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/(?!post\/show\/\d+)/i,
			function:     'page',
			link:         /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/post\/show\/\d+(?:\/|$)/i,
			thumbnail:    /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/data\/(?!preview\/)[\/\w-]+\.(?:jpg|png|gif|bmp)/i,
			xPath:        './span[@class="hidden"]',
			titleXPath:   './img[@title]',
		},

		// imagefap
		{
			url:          /^https?:\/\/(.*?\.)?imagefap\.com/i,
			function:     'page',
			link:         /\/image.php\?id=|gallery\/\d+/i,
			thumbnail:    /\/images\/(?:thumb|mini)\/(\d+)\/(\d+)\/(\d+)\.jpg/i,
			replace:      '/images/full/$1/$2/$3.jpg',
		},

		// subvariance
		{
			url:          /^https?:\/\/(.*?\.)?subvariance\.com/i,
			function:     'page',
			link:         /\/image\/[0-9]+/i,
			thumbnail:    /(\/\/images\/\d+\/\d+)\/[a-z]\.(jpg|JPG)/i,
			replace:      '$1/l.$2',
		},

		// FFFFOUND!
		{
			url:          /^https?:\/\/(?:.*?\.)?ffffound\.com/i,
			function:     'page',
			link:         /\/image\/\w+$/i,
			thumbnail:    /(img)(?:-thumb)?(\.ffffound\.com\/static-data\/assets\/\w\/\w+?)(?:_[a-z]+)?(\.jpe?g|gif|png)$/i,
			replace:      '$1$2$3',
		},

		// imagesocket
		{
			url:          /:\/\//i,
			function:     'page',
			link:         /^(https?:\/\/)(?:.*?\.)?imagesocket\.com\/(?:view|thumbs|images)\/(.*?\.(?:jpe?g|gif|png))$/i,
			replace:      '$1content.imagesocket.com/images/$2',
		},

		// flickr
		{
			url:          /^https?:\/\/(?:.*?\.)?flickr\.com/i,
			function:     'page',
			link:         /\/photos\/[^\/]+\/[0-9]+/i,
			thumbnail:    /_[tsm]\.jpg/i,
			replace:      '.jpg',
		},

		// Hatena (type1)
		{
			url:          /^http:\/\/[dh]\.hatena\.(?:ne\.jp|com)/i,
			function:     'page',
			link:         /^http:\/\/f\.hatena\.ne\.jp\/[a-zA-Z][\w-]{2,}\/\d{14}$/i,
			thumbnail:    /^http:\/\/(?:img\.)?f\.hatena\.ne\.jp(\/images\/fotolife\/[a-zA-Z]\/[a-zA-Z][\w-]{2,}\/\d{8}\/\d{14}\.(?:jpe?g|gif|png))(?:\?\d+)?$/i,
		},
		
		// Hatena (type2)
		{
			url:          /^http:\/\/h\.hatena\.(?:ne\.jp|com)\/(?:keyword\/.+\?mode=)?album/i,
			function:     'page',
			link:         /^http:\/\/h\.hatena\.ne\.jp\/[a-zA-Z][\w-]{2,}\/\d+$/i,
			thumbnail:    /^(.+\.(?:jpe?g|gif|png))$/i,
		},

		// myspace
		{
			url:          /^https?:\/\/(?:.*?\.)?myspace\.com/i,
			function:     'page',
			link:         /imageID=\d+/i,
			thumbnail:    /m_(.+)\.jpg/i,
			replace:      'l_$1.jpg',
		},

		// mixi
		{
			url:          /^http:\/\/mixi.jp\/view_(?:diary|bbs)\.pl/i,
			function:     'parseHTMLs',
			link:         /(?:^javascript\:void\(0\);$|MM_openBrWindow\('(.+?)'.*\))/,
			xPath:        './@onclick',
			replace:      '$1',
			image:        /http:\/\/ic\.mixi\.jp\/p\/\w+\/\w+\/(?:diary|bbs_comm)\/\d+_\d+\.jpg(?=")/i, // "
		},

		// normal links to images
		{
			url:          /:\/\//i,
			function:     'page',
			link:         /.*?\.(jpe?g|gif|png|bmp)$/i,
			excludeLink:  /:\/\/.*?\/.*:/i,
		},
	]

	// SITEINFO used by this page
	var siteinfoToUse = []

// === Utility functions ===
	// stopEvents(event)
	// stop default events
	function stopEvents(event) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	// absolutePath(path)
	// original code from http://d.hatena.ne.jp/brazil/20070103/1167788352
	function absolutePath(path) {
		if (/^[\w.]+:\/\//.test(path)) {
			return path;
		} else {
			var span = document.createElement('span');
			span.innerHTML = '<a href="' + path + '" />';
			return span.firstChild.href;
		}
	}

	// getElementsByXPath(xPath, node, xml)
	function getElementsByXPath(xPath, node, xml) {
		var xPathSnapshot = (xml || document).evaluate(xPath, (node || document), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var xPathArray    = [];
		
		for (var i = 0; i < xPathSnapshot.snapshotLength; i++) {
			xPathArray[i] = xPathSnapshot.snapshotItem(i);
		}
		
		return xPathArray;
	}

	// getFirstElementByXPath(xPath, node,xml)
	function getFirstElementByXPath(xpath, node, xml) {
		var xPathFirstElement = (xml || document).evaluate(xpath, (node || document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return xPathFirstElement.singleNodeValue;
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
			window:   { x : documentElement.clientWidth, y : documentElement.clientHeight },
			page:     { x : documentElement.scrollWidth, y : documentElement.scrollHeight },
			position: { x : window.pageXOffset,          y : window.pageYOffset           }
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
		var backgroundColor;
		var node = node;
		
		do {
			backgroundColor = getComputedStyle(node, '').backgroundColor;
			
			node = node.parentNode;
		} while ((backgroundColor == '' || backgroundColor == 'transparent') && node && (node.nodeName != '#document'))
		
		return backgroundColor;
	}

	// getGeckoVer()
	// original code from http://taken.s101.xrea.com/blog/article.php?id=561
	function getGeckoVer() {
		var ua = navigator.userAgent;
		
		if (ua.indexOf("Gecko/") != -1) {
			var ver = ua.match(/rv:([\d\.]+?)[ab\)]/)[1];
			verArray = ver.split('.');
			ver = verArray.shift() + ".";
			ver += verArray.join("");
			return parseFloat(ver);
		}
	}

	// manipulate classsName
	var className = {
		// className.add(currentClassName, addClassName)
		// Add className
		add: function(currentClassName, addClassName) {
			return (currentClassName + (((currentClassName == '' || currentClassName.charAt(currentClassName.length - 1 ) == ' ')) ? '' : ' ') + addClassName);
		},
		// className.remove(currentClassName, removeClassName)
		// Remove className
		remove: function(currentClassName, removeClassName) {
			return currentClassName.replace(new RegExp('\\b' + removeClassName + '\\b'), '');
		},
		// className.replace(currentClassName, oldClassName, newClassName)
		// Replace className
		replace: function(currentClassName, oldClassName, newClassName) {
			return currentClassName.replace(new RegExp('\\b' + oldClassName + '\\b'), newClassName);
		},
		// className.check(currentClassName, checkClassName)
		// Check className
		check: function(currentClassName, checkClassName) {
			return (new RegExp('\\b' + checkClassName + '\\b')).test(currentClassName);
		},
	}

// === main functions ===
	// checkSITEINFO();
	function checkSITEINFO() {
//	if (DEBUG) { GM_log("checkSITEINFO : " + location.href ); }
		
		for (var i = 0; i < SITEINFO.length; i++) {
			if (location.href.match(SITEINFO[i]['url'])) {
				if (DEBUG) { GM_log("checkSITEINFO : using " + SITEINFO[i]['url']); }
				
				siteinfoToUse.push(SITEINFO[i]);
			}
		}
	}

	// checkNodes(nodes)
	function checkNodes(nodes) {
		var nodes = (nodes || document);
		
		if (nodes.length) {
			nodes.forEach(addImage);
		} else {
			addImage(nodes);
		}
	}

	// addFilterHandler() 
	function addFilterHandler() {
		if (window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(checkNodes);
		}
	}

	// addImage(node)
	// Going through link tags looking for links to images.
	// These links receive onclick events that enable the lightbox display for their targets.
	function addImage(node) {
		if (DEBUG) { var startTime = new Date; }
		
		var links, startElement, lastElement, addImageUrl = {};
		
		links = getElementsByXPath(".//a[@href]", node);
		startElement = (lightbox.imageLinks.length || 0);
		
		// declare eventListener
		var addEvent = function(node, element, siteinfo) {
			node.addEventListener('click', function(event) { lightbox.show(event, element); }, true);
			if (DEBUG) { GM_log( i + "-> lightbox.imageLinks[" + element + "] (" + siteinfo['link'] + ")\n" + lightbox.imageLinks[element]['link'] + "\n" + lightbox.imageLinks[element]['imageUrl'] + "\n" + lightbox.imageLinks[element]['title'] + "\n" + lightbox.imageLinks[element]['backgroundColor'] ); }
		}
		
		for (var i = 0; i < links.length; i++) {
			for (var j = 0; j < siteinfoToUse.length; j++) {
				if (siteinfoToUse[j]['link'].test(links[i].href)) {
					if (siteinfoToUse[j]['excludeLink'] && siteinfoToUse[j]['excludeLink'].test(links[i].href)) {
						break;
					}
					
					lastElement = lightbox.imageLinks.length;
					
					// detect image url and title
					if (!(siteinfoToUse[j]['function'])) {
						addImageUrl = siteinfoToUse[j]['getImageUrl'](links[i]);
					} else {
						addImageUrl = getImageUrl[siteinfoToUse[j]['function']](links[i], siteinfoToUse[j]);
					}
					
					if (addImageUrl && addImageUrl['url']) {
						// if duplicate images, reuse before event
						if (lastElement > 0 && (links[i].href == lightbox.imageLinks[lastElement - 1]['link']) && !(isUrlJavaScript(links[i].href))) {
							addEvent(links[i], lastElement - 1, siteinfoToUse[j]);
						} else {
							lightbox.imageLinks[lastElement] = {
								link:            links[i].href,
								imageUrl:        addImageUrl['url'],
								title:           addImageUrl['title'],
								backgroundColor: searchBackgroundColor(links[i]),
							};
							
							// insert HTML and set event listener if get first image
							if (lastElement == 0) {
								lightbox.init();
							}
							
							// set eventListener
							addEvent(links[i], lastElement, siteinfoToUse[j]);
						}
						
						break;
					}
				}
			}
		}
		
		if (DEBUG) { GM_log( "addImage: " + (new Date - startTime) + " ms"); }
	}

	var getImageUrl = function() {
	// --- Private methods ---
		// matchUrl(node, re, replace, xpath) : check url and replace
		var matchUrl = function(node, re, replace, xPath) {
			var url, imageUrl = {};
			var nodes = xPath ? getElementsByXPath(xPath, node) : [node];
			
			for (var i = 0; i < nodes.length; i++) {
				url = (nodes[i].href || nodes[i].src || nodes[i].nodeValue || nodes[i].textContent);
				
				if (url.match(re)) {
					if (replace) {
						imageUrl['url'] = decodeURIComponent(absolutePath(url.replace(re, replace)));
					} else {
						imageUrl['url'] = decodeURIComponent(absolutePath(url));
					}
					
					if (nodes[i].title) {
						imageUrl['title'] = nodes[i].title;
					}
					
					return imageUrl;
				}
			}
		};
		// getFile(url)
		var getFile = function(url) {
			var req = new XMLHttpRequest();
			
			try {
				req.open('GET', url, false); 
				req.send(null);
				
				if(req.status == 200) {
					return req.responseText;
				}
			} catch (error) {}
		};
	
	// --- Public methods ---
		return {
			// get image urls from this page.
			page: function(node, siteinfoToUse) {
				var xPath, imageNode, imageTitle, imageUrl = {}, thumbnailUrl = {};
				
				if (siteinfoToUse['xPath']) {
					xPath = siteinfoToUse['xPath'];
				} else if (siteinfoToUse['thumbnail']) {
					xPath = './/img[@src]';
				} else {
					xPath = '.';
				}
				
				imageUrl = matchUrl(node, (siteinfoToUse['thumbnail'] || siteinfoToUse['link']), siteinfoToUse['replace'], xPath);
				if (imageUrl) {
					if (siteinfoToUse['titleXPath']) {
						imageNode = getFirstElementByXPath(siteinfoToUse['titleXPath'], node);
						if (imageNode) {
							imageTitle = (imageNode.title || imageNode.nodeValue || imageNode.textContent);
						}
					}
					if (siteinfoToUse['thumbnail']) {
						thumbnailUrl = matchUrl(node, siteinfoToUse['thumbnail'], '', './/img[@src]');
						if (thumbnailUrl) {
							imageTitle = (imageTitle || thumbnailUrl['title']);
						}
					}
					imageUrl['title'] = (imageTitle || imageUrl['title'] || node.title || imageUrl['url']);
					
//				if (DEBUG) { GM_log("getImageUrl.page : " + imageUrl['url'] + ", " + imageUrl['title']); }
				}
				
				return imageUrl;
			},
			// get image url from linked pages
			parseHTMLs: function(node, siteinfoToUse) {
				var htmlUrl, html, imageNode, imageTitle, imageUrl = {}, thumbnailUrl = {};
				
				if (siteinfoToUse['xPath']) {
					xPath = siteinfoToUse['xPath'];
				} else {
					xPath = '.';
				}
				
				htmlUrl = matchUrl(node, (siteinfoToUse['link']), siteinfoToUse['replace'], xPath);
				if (htmlUrl) {
					try {
						html = getFile(htmlUrl['url']);
						
						imageUrl['url'] = html.match(siteinfoToUse['image'])[0].replace(siteinfoToUse['image'], siteinfoToUse['imageReplace']);
						
						if (siteinfoToUse['titleXPath']) {
							imageNode = getFirstElementByXPath(siteinfoToUse['titleXPath'], node);
							if (imageNode) {
								imageTitle = (imageNode.title || imageNode.nodeValue || imageNode.textContent);
							}
						}
						if (siteinfoToUse['thumbnail']) {
							thumbnailUrl = matchUrl(node, siteinfoToUse['thumbnail'], '', './/img[@src]');
							if (thumbnailUrl) {
								imageTitle = (imageTitle || thumbnailUrl['title']);
							}
						} 
						imageUrl['title'] = (imageTitle || node.title || imageUrl['url']);
						
//					if (DEBUG) { GM_log("getImageUrl.parseHTMLs : " + imageUrl['url'] + ", " + imageUrl['title']); }
					} catch (error) {}
				}
				
				return imageUrl;
			},
		};
	}();

	// openImage(event, newWindow, suffix)
	function openImage(event, newWindow, suffix) {
		stopEvents(event);
		
		link = openImageGetUrl(suffix || lightbox.nowViewing);
		
		if (newWindow) {
			GM_openInTab(link);
		} else {
			location.href = link;
		}
}

	// openImageGetUrl(suffix)
	function openImageGetUrl(suffix) {
		var link = lightbox.imageLinks[suffix]['link'];
		
		if (isUrlJavaScript(link)) {
			link = lightbox.imageLinks[suffix]['imageUrl'];
		}
		
		return link;
	}

	// isUrlJavaScript(url)
	function isUrlJavaScript(url) {
		return /^(?:#|javascript:|$)/.test(url);
	}

	var lightbox = function() {
	// --- Private propaties ---
		var elements = {};
	
	// --- Private methods ---
		// hiddenFlashs(hidden)
		var hiddenFlashs = function(hidden) {
			var flashs = getElementsByXPath("//embed[not(@wmode='transparent')] | //object[not(./param[@name='wmode']/@value='transparent')]", document);
			
			for (var i = 0; i < flashs.length; i++) {
				if (hidden) {
					flashs[i].className == className.add(flashs[i].className, 'gL_hidden');
				} else {
					flashs[i].className == className.remove(flashs[i].className, 'gL_hidden');
				}
			}
		};
		// changeDisplay(node,shown)
		var changeDisplay = function(node, shown) {
			if (shown) {
				node.className = className.replace(node.className, 'gL_hidden', 'gL_shown');
			} else {
				node.className = className.replace(node.className, 'gL_shown', 'gL_hidden');
			}
			
//		if (DEBUG) { GM_log(node.id + " / " + node.className); }
		};
		// isDisplay(node)
		var isDisplay = function(node) {
			return className.check(node.className, 'gL_shown');
		};
	
		return {
	// --- Public propaties ---
			// lightbox.imageLinks
			//  link:            links to the image file.
			//  imageUrl:        url of image file.
			//  title:           title of image file.
			//  backgroundColor: background-color of image file.
			imageLinks: [],
			nowViewing: 0,
			
			// type of resizing
			resizeType: 'normal',
			
			// rotating angle
			angle: 0,
			
			// slideshow flag and timeout ID
			slideshow: false,
		
	// --- Public methods ---
			init: function() {
//			if (DEBUG) { GM_log('lightbox.init'); }
				
				// Function runs on HTML load, inserting html at the top of the page that looks like this:
				//	<img id="gLightboxPreload" />
				//	<div id="gLightboxOverlay">
				//		<a href="#" onclick="Lightbox.hide(); return false;">
				//			<img id="gLightboxLoadingImage" />
				//		</a>
				//	</div>
				//	<div id="gLightbox">
				//		<a href="#" onclick="Lightbox.hide(); return false;" title="Click anywhere to close image">
				//			<img id="gLightboxImage" />
				//			<div id="gLightboxError"></div>
				//		</a>
				//		<div id="gLightboxCaption"></div>
				//	</div>
				var objHead = document.getElementsByTagName('head').item(0);
				var objBody = document.getElementsByTagName('body').item(0);
				
				// insert CSS
				elements.css = document.createElement('style');
				elements.css.type = 'text/css';
				elements.css.appendChild(document.createTextNode([
					'#gLightbox',
						' { position: absolute; z-index: 1000150; background-color: #000; padding: 10px; border: none; -moz-border-radius: 10px;} ',
					'#gLightbox.gL_hidden',
						' { display: none; } ',
					'#gLightbox.gL_shown',
						' { display: block; } ',
					'#gLightbox.gL_r90',
						' { -moz-transform: rotate( 90deg); -moz-transform-origin: 50% 50%; } ',
					'#gLightbox.gL_r180',
						' { -moz-transform: rotate(180deg); -moz-transform-origin: 50% 50%; } ',
					'#gLightbox.gL_r270',
						' { -moz-transform: rotate(270deg); -moz-transform-origin: 50% 50%; } ',
					'#gLightbox a, #gLightbox img, ',
					'#gLightbox a:hover,  #gLightbox img:hover, ',
					'#gLightbox a:focus,  #gLightbox img:focus, ',
					'#gLightbox a:link,   #gLightbox img:link, ',
					'#gLightbox a:active, #gLightbox img:active',
						' { border: none; clear: both; } ',
					'#gLightbix div',
						' { background-color: #000; } ',
					'#gLightboxImage.gL_hidden',
						' { display: none; } ',
					'#gLightboxImage.gL_shown',
						' { display: inline; } ',
					'#gLightboxError',
						' { width: 600px; height: 50px; color: #FFF; text-align: center; font-size: 3em; padding: 0; margin: 0; } ',
					'#gLightboxError.gL_hidden',
						' { display: none; } ',
					'#gLightboxError.gL_shown',
						' { display: block; } ',
					'#gLightboxCaption',
						' { color: #DDD; text-align: center; font-size: 0.8em; padding-top: 0.4em; } ',
					'#gLightboxCaption.gL_hidden',
						' { display: none; } ',
					'#gLightboxCaption.gL_shown',
						' { display: block; } ',
					'#gLightboxCaption a',
						' { color: #FFF; } ',
					'#gLightboxOverlay',
						' { position: absolute; top: 0; left: 0; z-index: 1000090; width: 100%; background-color: transparent; background-image: url(' + OVERLAYIMAGE + '); } ',
					'#gLightboxOverlay.gL_hidden',
						' { display: none; } ',
					'#gLightboxOverlay.gL_shown',
						' { display: block; } ',
					'#gLightboxLoadingImage',
						' { position: absolute; z-index: 1000100; } ',
					'#gLightboxLoadingImage.gL_hidden',
						' { display: none; } ',
					'#gLightboxLoadingImage.gL_shown',
						' { display: block; } ',
					'#gLightboxPreload',
						' { display: none; } ',
					'embed.gL_hidden, object.gL_hidden',
						' { visibility: hidden; } ',
				].join("")));
				objHead.appendChild(elements.css);
				
				// create overlay div
				elements.overlay = document.createElement('div');
				elements.overlay.id = 'gLightboxOverlay';
				elements.overlay.className = 'gL_hidden';
				elements.overlay.addEventListener('click', lightbox, false);
				objBody.appendChild(elements.overlay);
				
				// create link to hide lightbox
				elements.loadingImageLink = document.createElement("a");
				elements.loadingImageLink.href = '';
				elements.loadingImageLink.addEventListener('click', lightbox, false);
				elements.overlay.appendChild(elements.loadingImageLink);
				
				// create loading image
				elements.loadingImage = document.createElement("img");
				elements.loadingImage.src = LOADINGIMAGE;
				elements.loadingImage.id = 'gLightboxLoadingImage';
				elements.loadingImage.className = 'gL_hidden';
				elements.loadingImageLink.appendChild(elements.loadingImage);
				
				// create lightbox div, same note about styles as above
				elements.div = document.createElement("div");
				elements.div.id = 'gLightbox';
				elements.div.className = 'gL_hidden';
				objBody.appendChild(elements.div);
				
				// create link
				elements.link = document.createElement("a");
				elements.link.href = '';
				elements.link.addEventListener('click', lightbox, false);
				elements.div.appendChild(elements.link);
				
				// create image
				elements.image = document.createElement("img");
				elements.image.id = 'gLightboxImage';
				elements.image.className = 'gL_shown';
				elements.link.appendChild(elements.image);
				
				// create error message
				elements.error = document.createElement("div");
				elements.error.id = 'gLightboxError';
				elements.error.className = 'gL_hidden';
				elements.error.innerHTML = 'This file is not found!';
				elements.link.appendChild(elements.error);
				
				// create caption
				elements.caption = document.createElement("div");
				elements.caption.id = 'gLightboxCaption';
				elements.caption.className = 'gL_shown';
				elements.div.appendChild(elements.caption);
				
				// create preloader
				elements.preload = document.createElement("img");
				elements.preload.id = 'gLightboxPreload';
				objBody.appendChild(elements.preload);
				
				// add events
				window.addEventListener('keydown', lightbox, false);
				window.addEventListener('resize',  lightbox, false);
			},
			// event handler
			handleEvent: function(event) {
//			if (DEBUG) { GM_log('lightbox.handleEvent'); }
				
				switch (event.type) {
					case 'click':
						lightbox.hide(event);
						break;
					case 'resize':
						lightbox.resize('');
						break;
					case 'keydown':
						// shortcut keys are vaild only if lightbox is shown.
						if (isDisplay(elements.overlay)) {
							// Gets keycode.
//						if (DEBUG) { GM_log("keyCode is " + event.keyCode + " ( " + event.shiftKey + " / " + event.ctrlKey + " ) "); }
							switch (event.keyCode) {
								case 86: // 'v'
									if (!event.ctrlKey) {
										stopEvents(event);
										lightbox.stopSlideshow();
										openImage(event, event.shiftKey);
									}
									break;
								case 81: // 'q'
								case 88: // 'x'
								case 27: // Esc
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.hide(event);
									}
									break;
								case 49: // '1' + shiftKey -> '!'
									if (event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.startSlideshow();
									}
									break;
								case 75: // 'k'
								case 37: // Left(<-)
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.hide(event);
										lightbox.show(event, lightbox.nowViewing - 1);
									}
									break;
								case 74: // 'j'
								case 39: // Right(->)
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.hide(event);
										lightbox.show(event, lightbox.nowViewing + 1);
									}
									break;
								case 36: // Home
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.hide(event);
										lightbox.show(event, 0);
									}
									break;
								case 35: // End
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.hide(event);
										lightbox.show(event, lightbox.imageLinks.length - 1);
									}
									break;
								case 67: // 'c'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.toggleCaption();
									}
									break;
								case 48: // '0'
								case 96: // num '0'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.rotate(-lightbox.angle);
										lightbox.resize('normal');
									}
									break;
								case 87: // 'w'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.resize('width');
									}
									break;
								case 72: // 'h'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.resize('height');
									}
									break;
								case 76: // 'l'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.rotate(90);
									}
									break;
								case 82: // 'r'
									if (!event.shiftKey && !event.ctrlKey) {
										stopEvents(event);
										lightbox.rotate(-90);
									}
									break;
							}
						}
				}
			},
			// show lightbox
			show: function(event, suffix) {
//			if (DEBUG) { GM_log('lightbox.show'); }
				
				// shift + click, ctrl + click => don't use lightbox.
				// shift + ctrl + click => don't use lightbox and open the link in this window.
				if (event.shiftKey || event.ctrlKey) {
					if (event.shiftKey && event.ctrlKey) {
						openImage(event, false, suffix);
					}
					return true;
				}
				
				// cancel opening image
				stopEvents(event);
				
				// do nothing if lightbox is shown
				if (!(isDisplay(elements.div))) {
					// prep objects
					// get page size and viewport
					var sizeAndPosition = getSizeAndPosition();
					
					// center loadingImage
					elements.loadingImage.style.top  = sizeAndPosition['position']['y'] + ((sizeAndPosition['window']['y'] - 20 - elements.loadingImage.naturalHeight) / 2) + 'px';
					elements.loadingImage.style.left = ((sizeAndPosition['page']['x'] - 20 - elements.loadingImage.naturalWidth) / 2) + 'px';
					changeDisplay(elements.loadingImage, true);
					
					// set height of Overlay to take up whole page and show
					elements.overlay.style.height = sizeAndPosition['page']['y'] + 'px';
					changeDisplay(elements.overlay, true);
					
					// set event listener
					elements.preload.addEventListener('load',  lightbox.preloaded, false);
					elements.preload.addEventListener('error', lightbox.error,     false);
					
					// set nowViewing
					lightbox.nowViewing = ((suffix || 0) + lightbox.imageLinks.length) % lightbox.imageLinks.length;
//				if (DEBUG) { GM_log("nowViewing = " + lightbox.nowViewing); }
					
					// preload image and set caption
					elements.preload.src = lightbox.imageLinks[lightbox.nowViewing]['imageUrl'];
					elements.caption.innerHTML = lightbox.imageLinks[lightbox.nowViewing]['title'] + '<br /><a href="' + openImageGetUrl(lightbox.nowViewing) + '">View image on original page.</a>';
				}
			},
			// after preloading image, places new image in lightbox then centers.
			preloaded: function() {
//			if (DEBUG) { GM_log('lightbox.preloaded'); }
				
				// load image
				elements.image.src = elements.preload.src;
				hiddenFlashs(true);
				changeDisplay(elements.error, false);
				changeDisplay(elements.image,  true);
				
				// set event listener
				elements.image.addEventListener('load', lightbox.loaded, false);
				
				// remove event listener
				elements.preload.removeEventListener('load',  lightbox.preloaded, false);
				elements.preload.removeEventListener('error', lightbox.error,     false);
			},
			// after loading image, view image
			loaded: function() {
//			if (DEBUG) { GM_log('lightbox.loaded'); }
				
				// set title and background color
				elements.image.title = lightbox.imageLinks[lightbox.nowViewing]['title'];
				elements.image.style.backgroundColor = lightbox.imageLinks[lightbox.nowViewing]['backgroundColor'];
				
				// resize lightbox
				lightbox.resize('');
				
				// show lightbox
				changeDisplay(elements.div,           true);
				changeDisplay(elements.overlay,       true);
				changeDisplay(elements.loadingImage, false);
				
				// remove event listener
				elements.image.removeEventListener('load', lightbox.loaded, false);
				
				// run setTimeout if slideshow mode.
				if (lightbox.slideshow) {
					lightbox.slideshow = window.setTimeout(lightbox.startSlideshow, 3 * 1000);
//				if (DEBUG) { GM_log("timeoutID = " + lightbox.slideshow); }
				}
			},
			// show error message
			error: function(event) {
//			if (DEBUG) { GM_log('lightbox.error'); }
				
				// resize lightbox
				elements.image.src = '';
				lightbox.resize('', 600, 50);
				
				// show lightbox
				changeDisplay(elements.div,           true);
				changeDisplay(elements.image,        false);
				changeDisplay(elements.error,         true);
				changeDisplay(elements.loadingImage, false);
				
				// remove event listener
				try {
					elements.image.removeEventListener('load',    lightbox.loaded,    false);
					elements.preload.removeEventListener('load',  lightbox.preloaded, false);
					elements.preload.removeEventListener('error', lightbox.error,     false);
				} catch(error) {}
			},
			// hide lightbox
			hide: function(event) {
//			if (DEBUG) { GM_log('lightbox.hide'); }
				
				// cancel opening image
				stopEvents(event);
				
				// if event is defined, this function called from event handler. Therefore slideshow should be stopped.
				if (event) {
					lightbox.stopSlideshow();
				}
				
				// remove event listener
				try {
					elements.image.removeEventListener('load',    lightbox.loaded,    false);
					elements.preload.removeEventListener('load',  lightbox.preloaded, false);
					elements.preload.removeEventListener('error', lightbox.error,     false);
				} catch(error) {}
				
				// remove image
//			elements.preload.src = '';
				elements.image.src = '';
				
				// hide lightbox and overlay
				changeDisplay(elements.div,          false);
				changeDisplay(elements.overlay,      false);
				changeDisplay(elements.loadingImage, false);
				hiddenFlashs(false);
			},
			// start slideshow
			startSlideshow: function() {
//			if (DEBUG) { GM_log('lightbox.startSlideshow'); }
				
				lightbox.slideshow = true;
				
				if (isDisplay(elements.div)) {
					lightbox.hide('');
					lightbox.show('', lightbox.nowViewing + 1);
				} else {
					lightbox.show('', lightbox.nowViewing);
				}
			},
			// stop slideshow
			stopSlideshow: function() {
//			if (DEBUG) { GM_log('lightbox.stopSlideshow'); }
				
				if (lightbox.slideshow) {
					clearTimeout(lightbox.slideshow);
					lightbox.slideshow = false;
				}
			},
			rotate: function(angle) {
				// CSS Transforms are supported after Firefox 3.5 (Gecko 1.9.1)
				if (getGeckoVer() >= 1.91) {
					lightbox.angle = (lightbox.angle + angle + 360) % 360;
					
					if (lightbox.angle == 0) {
						elements.div.className = className.remove(elements.div.className, 'gL_r\\d+');
					} else {
						elements.div.className = className.add(className.remove(elements.div.className, 'gL_r\\d+'), 'gL_r' + lightbox.angle);
					}
					if (DEBUG) { GM_log('lightbox.rotate : ' + lightbox.angle + " / " + elements.div.className); }
					
					lightbox.resize('');
				}
			},
			resize: function(resizeType, imageWidth, imageHeight) {
//			if (DEBUG) { GM_log('lightbox.resize'); }
				
				// check modes
				var isDisplayImage = isDisplay(elements.image);
				var isRotate = (lightbox.angle % 180 == 90);
				
				// check arguments
				var resizeType  = resizeType  || lightbox.resizeType;
				var imageWidth  = imageWidth  || (isDisplayImage ? elements.image.naturalWidth  : 600);
				var imageHeight = imageHeight || (isDisplayImage ? elements.image.naturalHeight :  50);
				
				// if image rotated, swap height for width
				if (isDisplayImage && isRotate) {
					[imageWidth, imageHeight] = [imageHeight, imageWidth];
				}
				
				// preserve resizetype
				lightbox.resizeType = resizeType;
				
				// get page size and viewport
				var sizeAndPosition = getSizeAndPosition();
				
				// get image size and copy values of a object
				var imageSize =   { x: imageWidth, y: imageHeight };
				var displaySize = { x: imageWidth, y: imageHeight };
				
				// estimate caption height
				var captionHeight = function(imageWidth, imageHeight) {
					return (isDisplay(elements.caption) ? ((imageWidth >= imageHeight) ? 35 : 50) : 0);
				}
				// calculate display position
				var calculateDisplayPosition = function(imageWidth, imageHeight) {
					return {
						x: ((sizeAndPosition['page']['x'] - 20 - imageWidth) / 2),
						y: sizeAndPosition['position']['y'] + ((sizeAndPosition['window']['y'] - 20 - captionHeight(imageWidth, imageHeight) - imageHeight) / 2),
					}
				};
				
				// center lightbox and make sure that the top and left values are not negative
				// and the image placed outside the viewport
				var displayPosition = calculateDisplayPosition(imageSize['x'], imageSize['y']);
				
				// resize routines
				var resize = {
					normal : function() {
						// which too bigs?
						if ((imageSize['y'] / sizeAndPosition['window']['y']) > (imageSize['x'] / sizeAndPosition['window']['x'])) {
							// height is too big
							displaySize['y'] = sizeAndPosition['window']['y'] - 20 - captionHeight(imageWidth, imageHeight);
							displaySize['x'] = imageSize['x'] * (displaySize['y'] / imageSize['y']);
						} else {
							// width is too big
							displaySize['x'] = sizeAndPosition['page']['x'] - 20;
							displaySize['y'] = imageSize['y'] * (displaySize['x'] / imageSize['x']);
						}
						
						if (isRotate) {
							displayPosition = calculateDisplayPosition(displaySize['y'], displaySize['x']);
						} else {
							displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
						}
					},
					width  : function() {
						displaySize['x'] = sizeAndPosition['page']['x'] - 20;
						
						if (displaySize['x'] >= imageSize['x']) {
							displaySize['x'] = imageSize['x'];
							displaySize['y'] = imageSize['y'];
						} else {
							displaySize['y'] = imageSize['y'] * (displaySize['x'] / imageSize['x']);
						}
						
						displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
						
						if (sizeAndPosition['position']['y'] > displayPosition['y']) {
							displayPosition['y'] = sizeAndPosition['position']['y'];
						}
					},
					height : function() {
						displaySize['y'] = sizeAndPosition['window']['y'] - 20 - captionHeight(imageWidth, imageHeight);
						
						if (displaySize['y'] >= imageSize['y']) {
							displaySize['y'] = imageSize['y'];
							displaySize['x'] = imageSize['x'];
						} else {
							displaySize['x'] = imageSize['x'] * (displaySize['y'] / imageSize['y']);
						}
						
						displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
						
						if (sizeAndPosition['position']['x'] > displayPosition['x']) {
							displayPosition['x'] = sizeAndPosition['position']['x'];
						}
					},
				}
				
				// resize if image is larger than screen size
				if ((displayPosition['y'] < sizeAndPosition['position']['y']) || (displayPosition['x'] < sizeAndPosition['position']['x'])) {
					resize[resizeType]();
				}
				
				if (DEBUG) { GM_log("lightbox.resize : " + elements.preload.src + " (" + imageSize['y'] + "x" + imageSize['x'] + ", " + displaySize['y'] + "x" + displaySize['x'] + ")") };
				
				// set css
				elements.div.style.left = displayPosition['x'] + 'px';
				elements.div.style.top  = displayPosition['y'] + 'px';
				elements.image.style.width  = (isRotate ? displaySize['y'] : displaySize['x']) + 'px';
				elements.image.style.height = (isRotate ? displaySize['x'] : displaySize['y']) + 'px';
				elements.caption.style.width = (isRotate ? displaySize['y'] : displaySize['x']) + 'px';
				
				// After image is loaded, update the overlay height as the new image might have
				// increased the overall page height.
				sizeAndPosition = getSizeAndPosition();
				elements.overlay.style.height = sizeAndPosition['page']['y'] + 'px';
			},
			toggleCaption: function() {
//			if (DEBUG) { GM_log('lightbox.toggleCaption'); }
				
				changeDisplay(elements.caption, !isDisplay(elements.caption));
				lightbox.resize('');
			},
		};
	}();

	// === Main routine ===
	checkSITEINFO();
	checkNodes();
	
	// for AutoPagerize
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}

})()
