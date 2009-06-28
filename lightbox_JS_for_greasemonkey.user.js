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
	var LOADINGIMAGE = 'data:image/gif;base64,R0lGODlhfgAWANUiAFJSUi4uLjAwMElJSVBQUE9PT0xMTEhISCwsLDU1NUFBQUtLSy8vL0VFRUZGRlNTU2pqZy8vLDs7N1paWj09PVNTTkJCPjExMTIyMjY2Njg4ODQ0NDk5OW5ubjo6OkBAQC0tLTMzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAiACwAAAAAfgAWAAAG/8CQcEgsGo/IpHLJbDqfx450Sq1ar9isdsvter/Th7DzKZvP6LR6zW673/C43Dz+gBB4kH7P7/v/gIGCg4SFhn94CCBkdQgUDQ0OB5MKegqTmAeVIBhGGHqdRZ+cnqClpKKmqahEo6GtqrCsGBcXDAiMIWQIkJIDvwMBAcDEwQEbyMnIwsrKzM3Lx9Abz9DVzdfO0tbb2N0htBe4H42RBwML6QYCAgbu7+7sGfP08/L19Pf4Gfr4/fX/8gnYZ28gwYAFMyRYuAGcuFxkQPhaYKCAxVoWM2aspaGjx44cP3oMKVIDSZEnP6YceaEkyJYuV770qLDhJ4h2JlEsQKAnBv8MPYMG/cmhqNGiRI8aTaqUA1OlT49GXYqhKdKqVqdeNapBoZBF5HTlRMezJwAhANKqTSvEg9u3btvCfSt3roe6c/HC1Us3hN24fv/yBeyBa4KGYOuAOLegLNsQa9cOvhvY7uTLlfNm3ru571/Kn+UW1XA4RGKxi8maPQs58uPQnQkLjg16NuzbtnOPLp04AgQJqRsHZe36dW7LtDHjRr5c823DiH9HQK2z4lCgQq9bdYq1qVbu27+L7w6VvFTzVLl6NY1TIuOKFy9o1CjTJMyS9fPfR7lfZX+WLtkXIEk1gXPaLuagow478MCDED8G7fPghBH6UyFAFwpEEIQbyrN0UGm0jFNOgsAIU0yJ3WgzDTUpJpONiy1Gs+KLMk5DI4vKOPRQWLs8Yg4llmQCJCtDuHLKK0XGkiSRQhi5CpJNKhklkwbOUsst7SVyyJZcdunll4jkgRMYZJZp5ploahHWA3O06eabcMb5BhR01mnnnXhCEQQAIfkEBQAAIgAsBAAEABwADgAABnhAxuWCCRkxoqRymVQcnlDFsLipbphY0WDL3RJDm4Q4k2UazugzNZHRuMvLgnwuN7I1nDxcSej7+2AJeHkee0kAiImIgYMehYaKioyEj3uRiZOEhiKXiyF3eRybf39rbW+GdHRfYWObaWlTYFabXV1CX0ebTlBPCkEAIfkEBQAAIgAsDgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsGAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsIgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsLAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsNgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsQAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsSgAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsVAAEABwADgAABmlATGhIxIiOyORRcWg6FZuoNKqsigbYLDbD7XKtSoN4LNaYz2ZwssBusznwOFyNJNjvdo9+r6cfAYCBgHx8fiKCgoR7hoiBin1+jYBycoZ4eGhohm5uXl6GZGRTU4ZaWkJEQ0Z+TE5NCkEAIfkEBQAAIgAsXgAEABwADgAABnxATGhIxIiOyORRcWg6Gg3KZkqdKq+igXZweDYy4DAYqzQsztynZs1ek5OFuDnNqdvrbyRhXzA3PYCBgHlHAHsEBQtcgoKEIgCGiIoHjIGOkHyTlYOEkZJcd3eOh30LTW1tjnGlaWJijmZoXQ1VVY5baVBCRENGhExOUBRBACH5BAUAACIALAQABAB6AA4AAAavQEqj4TgYFaKkcslsOp/QqHRKFWFC2Cxm+jgMi4PwoEoum8/TjXqtnk684IXcgK7b79GMfq93H+IGBYJ4hIV1GoiJiH5GC4EEkIaSk1IclpeWjAMLBZAEAJShokkepaalmpyQAKCjroanp6mdn62vt3axprOetri/ZbqoUhUWjY+RwMpVmJh+gIIFy9NSiop+RAebc9TdTnx82NliY97mSWxsfkLZR+fnV1lYW1JdQQA7';
	var CLOSEBUTTON  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAXUlEQVQ4jWNgGAWDD7x79+4/uXhgDJw+ffp/BwcHrAY4ODj8nz59OmkGOjg4wDEhcaK9jK4ZlyUkhSGyIdgMIytS8Bk2sC6kahhSPZapng4HX9ajxFCcBpJrKDZzAP478L8U4gAcAAAAAElFTkSuQmCC';

	// SITEINFO
	var SITEINFO = [
		/* sample
		{
			url:          //,
			function:     '',
			link:         //,
			excludeLink:  //,
			thumbnail:    //,
			replace:      '',
			extra:        {},
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
			extra:        {
				image:      	/\/cda\/static\/image\/\d{4}\/\d{2}\/\d{2}\/[\w-]+\.(?:jpg|png)(?=")/i, // "
				replace:    	'http://k-tai.impress.co.jp/$1',
			},
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
			thumbnail:    /(\/\d+)_[sm]\.(jpg|png|gif)/i,
			replace:      '$1.$2',
			extra:        {
				titleXPath: 	'./following-sibling::div[@class="pdgTop5"]',
			},
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
			extra:        {
				image:      	/http:\/\/img\d+\.gelbooru\.com\/\/?(?:images|samples)\/\d+\/[\w_]+\.(?:jpe?g|png|gif|bmp)(?:\?\d+?)?(?=")/i, // "
			},
		},

		// danbooru / nekobooru / sankaku channel (with supplementary script)
		{
			url:          /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/(?!post\/show\/\d+)/i,
			function:     'page',
			link:         /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/post\/show\/\d+(?:\/|$)/i,
			thumbnail:    /^http:\/\/(?:(?:dan|safe)booru\.donmai\.us|nekobooru\.net|chan\.sankakucomplex\.com)\/data\/(?!preview\/)[\/\w-]+\.(?:jpg|png|gif|bmp)/i,
			extra:        {
				xPath:      	'./span[@class="hidden"]',
				titleXPath: 	'./img[@title]',
			},
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
			replace:      '$1',
			extra:        {
				xPath:      	'./@onclick',
				image:      	/http:\/\/ic\.mixi\.jp\/p\/\w+\/\w+\/(?:diary|bbs_comm)\/\d+_\d+\.jpg(?=")/i, // "
			},
		},

		// normal links to images
		{
			url:          /:\/\//i,
			function:     'page',
			link:         /.*?\.(jpe?g|gif|png|bmp)$/i,
			excludeLink:  /:\/\/.*?\/.*:/i,
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
	imageLinks.nowViewing = -1;
	
	// intervalID of slideshow
	var intervalID = undefined;
	
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

	// absolutePath(path)
	// original code from http://d.hatena.ne.jp/brazil/20070103/1167788352
	function absolutePath(path) {
		if (/^[\w.]+:\/\//.test(path)) {
			return path;
		} else {
			var element = document.createElement('span');
			element.innerHTML = '<a href="' + path + '" />';
			return element.firstChild.href;
		}
	}

	// isUrlJavaScript(url)
	function isUrlJavaScript(url) {
		return (url == '' || /^(?:#|javascript:)/.test(url));
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
		var checkNode = node;
		
		do {
			backgroundColor = getComputedStyle(checkNode, '').backgroundColor;
			
			checkNode = checkNode.parentNode;
		} while ((backgroundColor == '' || backgroundColor == 'transparent') && checkNode && (checkNode.nodeName != '#document'))
		
		return backgroundColor;
	}

	// ====================
	// main functions
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
	//			<div id="gLightboxError"></div>
	//		</a>
	//		<div id="gLightboxCaption"></div>
	//	</div>
	function insertHTML() {
		var objHead = document.getElementsByTagName('head').item(0);
		var objBody = document.getElementsByTagName('body').item(0);
		
		// insert CSS
		var gLightboxCSS = document.createElement('style');
		gLightboxCSS.type = 'text/css';
		var gLightboxCSSText = [
			'#gLightbox',
				' { position: absolute; z-index: 1000150; background-color: #000; padding: 10px; border: none; -moz-border-radius: 10px;} ',
			'#gLightbox.gL_hidden',
				' { display: none; } ',
			'#gLightbox.gL_shown',
				' { display: block; } ',
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
		].join("");
		gLightboxCSS.appendChild(document.createTextNode(gLightboxCSSText));
		objHead.appendChild(gLightboxCSS);
		
		// create overlay div
		var gLightboxOverlay = document.createElement('div');
		gLightboxOverlay.id = 'gLightboxOverlay';
		gLightboxOverlay.className = 'gL_hidden';
		gLightboxOverlay.addEventListener('click', hideLightbox, false);
		objBody.appendChild(gLightboxOverlay);
		
		// create link to hide lightbox
		var gLightboxLoadingImageLink = document.createElement("a");
		gLightboxLoadingImageLink.href = '';
		gLightboxLoadingImageLink.addEventListener('click', hideLightbox, false);
		gLightboxOverlay.appendChild(gLightboxLoadingImageLink);
		
		// create loading image
		var gLightboxLoadingImage = document.createElement("img");
		gLightboxLoadingImage.src = LOADINGIMAGE;
		gLightboxLoadingImage.id = 'gLightboxLoadingImage';
		gLightboxLoadingImage.className = 'gL_hidden';
		gLightboxLoadingImageLink.appendChild(gLightboxLoadingImage);
		
		// create lightbox div, same note about styles as above
		var gLightbox = document.createElement("div");
		gLightbox.id = 'gLightbox';
		gLightbox.className = 'gL_hidden';
		objBody.appendChild(gLightbox);
		
		// create link
		var gLightboxLink = document.createElement("a");
		gLightboxLink.href = '';
		gLightboxLink.addEventListener('click', hideLightbox, false);
		gLightbox.appendChild(gLightboxLink);
		
		// create image
		var gLightboxImage = document.createElement("img");
		gLightboxImage.id = 'gLightboxImage';
		gLightboxImage.className = 'gL_shown';
		gLightboxLink.appendChild(gLightboxImage);
		
		// create error message
		var gLightboxError = document.createElement("div");
		gLightboxError.id = 'gLightboxError';
		gLightboxError.className = 'gL_hidden';
		gLightboxLink.appendChild(gLightboxError);
		
		// create caption
		var gLightboxCaption = document.createElement("div");
		gLightboxCaption.id = 'gLightboxCaption';
		gLightboxCaption.className = 'gL_shown';
		gLightbox.appendChild(gLightboxCaption);
		
		// create preloader
		var gLightboxPreload = document.createElement("img");
		gLightboxPreload.id = 'gLightboxPreload';
		objBody.appendChild(gLightboxPreload);
	}

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

	// addFilterHandler() 
	function addFilterHandler() {
		if (window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(checkNodes);
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

	// addImage(node)
	// Going through link tags looking for links to images.
	// These links receive onclick events that enable the lightbox display for their targets.
	function addImage(node) {
		if (DEBUG) { var startTime = new Date; }
		
		var links, startElement, lastElement, addImageUrl = {};
		
		links = getElementsByXPath(".//a[@href]", node);
		startElement = (imageLinks.length || 0);
		
		// declare eventListener
		var setEvent = function(node, element) {
			node.addEventListener('click', function(event) {
				showLightbox(event, element);
			}, true);
		}
		
		for (var i = 0; i < links.length; i++) {
			for (var j = 0; j < siteinfoToUse.length; j++) {
				if (siteinfoToUse[j]['link'].test(links[i].href)) {
					if (siteinfoToUse[j]['excludeLink'] && siteinfoToUse[j]['excludeLink'].test(links[i].href)) {
						break;
					}
					
					lastElement = imageLinks.length;
					
					// detect image url and title
					if (!(siteinfoToUse[j]['function'])) {
						addImageUrl = siteinfoToUse[j]['getImageUrl'](links[i]);
					} else {
						addImageUrl = getImageUrl[siteinfoToUse[j]['function']](links[i], siteinfoToUse[j]);
					}
					
					if (addImageUrl && addImageUrl['url']) {
						// if duplicate images, reuse before event
						if (lastElement > 0 && (links[i].href == imageLinks[lastElement - 1]['link']) && !(isUrlJavaScript(links[i].href))) {
							setEvent(links[i], lastElement - 1);
							if (DEBUG) { GM_log(i + " -> imageLinks[" + (lastElement - 1) + "] (" + siteinfoToUse[j]['link'] + ")\n" + imageLinks[lastElement - 1]['link'] + "\n" + imageLinks[lastElement - 1]['imageUrl'] + "\n" + imageLinks[lastElement - 1]['title'] + "\n" + imageLinks[lastElement - 1]['backgroundColor']); }
						} else {
							imageLinks[lastElement] = {
								link:            links[i].href,
								imageUrl:        addImageUrl['url'],
								title:           addImageUrl['title'],
								backgroundColor: searchBackgroundColor(links[i]),
							};
							
							// insert HTML and set event listener if get first image
							if (lastElement == 0) {
								insertHTML();
								window.addEventListener('keyup', getKey, false);
								window.addEventListener('resize', resizeLightboxAtEvent, false);
							}
							
							// set eventListener
							setEvent(links[i], lastElement);
							if (DEBUG) { GM_log(i + " -> imageLinks[" + lastElement + "] (" + siteinfoToUse[j]['link'] + ")\n" + imageLinks[lastElement]['link'] + "\n" + imageLinks[lastElement]['imageUrl'] + "\n" + imageLinks[lastElement]['title'] + "\n" + imageLinks[lastElement]['backgroundColor']); }
							
							break;
						}
					}
				}
			}
		}
		
		if (DEBUG) { GM_log( "addImage: " + (new Date - startTime) + " ms"); }
	}

	var getImageUrl = {
		// ---------------
		// Main methods
		// ---------------
		
		// get image urls from this page.
		// extra.xPath      : String : xPath of search element.
		// extra.TitleXPath : String : xPath of title.
		page: function(node, siteinfoToUse) {
//		if (DEBUG) { GM_log("getImageUrl.page(node, (" + siteinfoToUse['url'] + ", " + siteinfoToUse['link'] + ", " + siteinfoToUse['thumbnail'] + ", " + siteinfoToUse['replace'] + " ))" ) };
			
			var xPath, imageNode, imageTitle, imageUrl = {}, thumbnailUrl = {};
			
			if (siteinfoToUse['extra'] && siteinfoToUse['extra']['xPath']) {
				xPath = siteinfoToUse['extra']['xPath'];
			} else if (siteinfoToUse['thumbnail']) {
				xPath = './/img[@src]';
			} else {
				xPath = '.';
			}
			
//		if (DEBUG) { GM_log("getImageUrl.page : xPath is " + xPath) };
			
			imageUrl = this._matchUrl(node, (siteinfoToUse['thumbnail'] || siteinfoToUse['link']), siteinfoToUse['replace'], xPath);
			
			if (imageUrl) {
				if (siteinfoToUse['extra'] && siteinfoToUse['extra']['titleXPath']) {
					imageNode = getFirstElementByXPath(siteinfoToUse['extra']['titleXPath'], node);
					
					imageTitle = (imageNode.title || imageNode.nodeValue || imageNode.textContent);
				}
				
				if (siteinfoToUse['thumbnail']) {
					thumbnailUrl = this._matchUrl(node, siteinfoToUse['thumbnail'], '', './/img[@src]');
					
					if (thumbnailUrl) {
						imageTitle = (imageTitle || thumbnailUrl['title']);
					}
				}
				
				imageUrl['title'] = (imageTitle || imageUrl['title'] || node.title || imageUrl['url']);
				
//			if (DEBUG) { GM_log("getImageUrl.page : " + imageUrl['url'] + ", " + imageUrl['title']); }
			}
			
			return imageUrl;
		},
		
		// get image url from linked pages
		// extra.xPath      : String : xPath of search element.
		// extra.TitleXPath : String : xPath of title.
		// extra.image      : RegExp : search url from linked page.
		// extra.replace    : String : replace extra.image
		parseHTMLs: function(node, siteinfoToUse) {
//		if (DEBUG) { GM_log("getImageUrl.parseHTMLs(node, (" + siteinfoToUse['url'] + ", " + siteinfoToUse['link'] + ", "  + siteinfoToUse['thumbnail'] + ", " + siteinfoToUse['replace'] + ", ( " + siteinfoToUse['extra']['image'] + ", " + siteinfoToUse['extra']['replace'] + " )))" ) };
			
			var htmlUrl, html, imageNode, imageTitle, imageUrl = {}, thumbnailUrl = {};
			
			if (siteinfoToUse['extra'] && siteinfoToUse['extra']['xPath']) {
				xPath = siteinfoToUse['extra']['xPath'];
			} else {
				xPath = '.';
			}
			
//		if (DEBUG) { GM_log("getImageUrl.parseHTMLs : xPath is " + xPath) };
			
			htmlUrl = this._matchUrl(node, (siteinfoToUse['link']), siteinfoToUse['replace'], xPath);
			
			if (htmlUrl) {
				try {
//				if (DEBUG) { GM_log("getImageUrl.parseHTMLs : parsing " + htmlUrl['url']) };
					
					html = this._getFile(htmlUrl['url']);
					
					imageUrl['url'] = html.match(siteinfoToUse['extra']['image'])[0].replace(siteinfoToUse['extra']['image'], siteinfoToUse['extra']['replace']);
					
					if (siteinfoToUse['extra'] && siteinfoToUse['extra']['titleXPath']) {
						imageNode = getFirstElementByXPath(siteinfoToUse['extra']['titleXPath'], node);
						
						imageTitle = (imageNode.title || imageNode.nodeValue || imageNode.textContent);
					}
					
					if (siteinfoToUse['thumbnail']) {
						thumbnailUrl = this._matchUrl(node, siteinfoToUse['thumbnail'], '', './/img[@src]');
						
						if (thumbnailUrl) {
							imageTitle = (imageTitle || thumbnailUrl['title']);
						}
					} 
					imageUrl['title'] = (imageTitle || node.title || imageUrl['url']);
					
//				if (DEBUG) { GM_log("getImageUrl.parseHTMLs : " + imageUrl['url'] + ", " + imageUrl['title']); }
				} catch (error) {}
			}
			
			return imageUrl;
		},
	
		// ---------------
		// Supplementary methods
		// ---------------
		
		// _matchUrl(node, re, replace, xpath)
		// check url and replace
		_matchUrl: function(node, re, replace, xPath) {
//		if (DEBUG) { GM_log("getImageUrl._matchUrl(node, " + re + ", " + replace + ", "  + xPath + ")" ) };
			var nodes, url, imageUrl = {};
			
			if (xPath) {
				nodes = getElementsByXPath(xPath, node);
			} else {
				nodes = [node];
			}
			
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
		},
		
		// _getFile(url)
		_getFile : function(url) {
			var req = new XMLHttpRequest();
			
			try {
				req.open('GET', url, false); 
				req.send(null);
				
				if(req.status == 200) {
					return req.responseText;
				}
			} catch (error) {}
		},
	}

	// getKey(event)
	// Gets keycode. If 'x' is pressed then it hides the lightbox.
	function getKey(event) {
		// shortcut keys are vaild only if lightbox is shown.
		if (lightboxShown()) {
			stopEvents(event);
			
			switch (event.keyCode) {
				case 86: // 'v'
					if (!event.ctrlKey) {
						stopSlideshow();
						openImage(event, event.shiftKey);
					}
					break;
				case 88: // 'x'
				case 27: // Esc
					if (!event.shiftKey && !event.ctrlKey) {
						stopSlideshow();
						hideLightbox(event);
					}
					break;
				case 49: // '1' + shiftKey -> '!'
					if (event.shiftKey && !event.ctrlKey) {
						startSlideshow();
					}
					break;
				case 73: // 'k'
				case 37: // Left(<-)
					if (!event.shiftKey && !event.ctrlKey) {
						stopSlideshow();
						loadAnotherImage(-1, event);
					}
					break;
				case 74: // 'j'
				case 39: // Right(->)
					if (!event.shiftKey && !event.ctrlKey) {
						stopSlideshow();
						loadAnotherImage(1, event);
					}
					break;
				case 36: // Home + ctrlKey
				case 38: // Up + ctrlKey
					if (event.ctrlKey) {
						stopSlideshow();
						loadAnotherImage(-imageLinks.nowViewing, event);
					}
					
					break;
				case 35: // End + ctrlKey
					if (event.ctrlKey) {
						stopSlideshow();
						loadAnotherImage(-(imageLinks.nowViewing + 1), event);
					}
					
					break;
				case 67: // 'c'
					if (!event.shiftKey && !event.ctrlKey) {
						toggleCaption();
					}
					break;
				case 82: // 'r'
					if (!event.shiftKey && !event.ctrlKey) {
						resizeLightboxAtCommand('normal');
					}
					break;
				case 87: // 'w'
					if (!event.shiftKey && !event.ctrlKey) {
						resizeLightboxAtCommand('width');
					}
					break;
				case 72: // 'h'
					if (!event.shiftKey && !event.ctrlKey) {
						resizeLightboxAtCommand('height');
					}
					break;
				default:
//				if (DEBUG) { GM_log("keyCode is " + event.keyCode); }
					break;
			}
		}
	}

	// openImage(event, newWindow, element)
	function openImage(event, newWindow, element) {
		stopEvents(event);
		
		link = openImageGetUrl(element || imageLinks.nowViewing);
		
		if (newWindow) {
			GM_openInTab(link);
		} else {
			location.href = link;
		}
}

	// openImageGetUrl(element)
	function openImageGetUrl(element) {
		var link = imageLinks[element]['link'];
		
		if (isUrlJavaScript(link)) {
			link = imageLinks[element]['imageUrl'];
		}
		
		return link;
	}


	// startSlideshow()
	function startSlideshow() {
		if (!(intervalID)) {
			if (!(lightboxShown())) {
				showLightbox('',0);
			}
			
			intervalID = setInterval(function() {
				loadAnotherImage(1);
			}, 3 * 1000);
		}
	}

	// stopSlideshow()
	function stopSlideshow() {
		if (intervalID) {
			clearInterval(intervalID);
			
			intervalID = undefined;
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
		
		if (loadImage != imageLinks.nowViewing) {
			hideLightbox("");
			showLightbox("", loadImage);
		}
	}

	// showLightbox(event, element)
	// load images. Pleaces new image in lightbox then centers and displays.
	function showLightbox(event, element) {
		// shift + click, ctrl + click => don't use lightbox.
		// shift + ctrl + click => don't use lightbox and open the link in this window.
		if (event.shiftKey || event.ctrlKey) {
			if (event.shiftKey && event.ctrlKey) {
				openImage(event, false, element);
			}
			
			return true;
		}
		
		// cancel opening image
		stopEvents(event);
		
		// do nothing if lightbox is shown
		if (!(lightboxShown())) {
			// prep objects
			var gLightbox             = document.getElementById('gLightbox');
			var gLightboxImage        = document.getElementById('gLightboxImage');
			var gLightboxError        = document.getElementById('gLightboxError');
			var gLightboxCaption      = document.getElementById('gLightboxCaption');
			var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
			var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
			var gLightboxPreload      = document.getElementById('gLightboxPreload');
			
			// get page size and viewport
			var sizeAndPosition = getSizeAndPosition();
			
			// center loadingImage
			gLightboxLoadingImage.style.top  = sizeAndPosition['position']['y'] + ((sizeAndPosition['window']['y'] - 20 - gLightboxLoadingImage.naturalHeight) / 2) + 'px';
			gLightboxLoadingImage.style.left = ((sizeAndPosition['page']['x'] - 20 - gLightboxLoadingImage.naturalWidth) / 2) + 'px';
			toggleDisplay(gLightboxLoadingImage);
			
			// set height of Overlay to take up whole page and show
			gLightboxOverlay.style.height = sizeAndPosition['page']['y'] + 'px';
			toggleDisplay(gLightboxOverlay);
			
			// after preloading image, places new image in lightbox then centers.
			preloaded = function() {
				// load image
				gLightboxImage.src = gLightboxPreload.src;
				if (gLightboxError.className == 'gL_shown') {
					toggleDisplay(gLightboxError);
					toggleDisplay(gLightboxImage);
				}
				
				// resize image
				resizeLightbox(gLightboxPreload.naturalWidth, gLightboxPreload.naturalHeight);
				
				// after loading image, view image
				loaded = function() {
					// set title and background color
					gLightboxImage.title = imageLinks[element]['title'];
					gLightboxImage.style.backgroundColor = imageLinks[element]['backgroundColor'];
					
					toggleDisplay(gLightbox);
					toggleDisplay(gLightboxLoadingImage);
					
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
			
			// preload image and set caption
			gLightboxPreload.src = imageLinks[element]['imageUrl'];
			gLightboxCaption.innerHTML = imageLinks[element]['title'] + '<br /><a href="' + openImageGetUrl(element) + '">View image on original page.</a>';
			imageLinks.nowViewing = element;
		}
	}

	// hideLightbox(event)
	function hideLightbox(event) {
		// cancel opening image
		stopEvents(event);
		
		// do nothing if lightbox is hidden
		if (lightboxShown()) {
			// prep objects
			var gLightbox             = document.getElementById('gLightbox');
			var gLightboxImage        = document.getElementById('gLightboxImage');
			var gLightboxError        = document.getElementById('gLightboxError');
			var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
			var gLightboxPreload      = document.getElementById('gLightboxPreload');
			
			// if event is defined, this function called from event handler. Therefore slideshow should be stopped.
			if (event) {
				stopSlideshow();
			}
			
			// remove event listener
			try {
				gLightboxImage.removeEventListener('load', loaded, false);
				gLightboxPreload.removeEventListener('load', preloaded, false);
				gLightboxPreload.removeEventListener('error', errorMessage, false);
			} catch(error) {}
			
			// remove image
			gLightboxImage.src = '';
			
			// hide lightbox and overlay
			toggleDisplay(gLightbox);
			toggleDisplay(gLightboxOverlay);
			
			// reset imageLinks.nowViewing
			imageLinks.nowViewing = -1;
		}
	}

	// errorMessage(event)
	function errorMessage(event) {
		// prep objects
		var gLightbox             = document.getElementById('gLightbox');
		var gLightboxImage        = document.getElementById('gLightboxImage');
		var gLightboxError        = document.getElementById('gLightboxError');
		var gLightboxCaption      = document.getElementById('gLightboxCaption');
		var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
		var gLightboxPreload      = document.getElementById('gLightboxPreload');
		
		gLightboxError.innerHTML = 'This file is not found!';
		
		// resize image box
		resizeLightbox(600, 50);
		
		gLightboxImage.src = '';
		
		toggleDisplay(gLightbox);
		toggleDisplay(gLightboxImage);
		toggleDisplay(gLightboxError);
		toggleDisplay(gLightboxLoadingImage);
		
		// remove event listener
		try {
			gLightboxImage.removeEventListener('load', loaded, false);
			gLightboxPreload.removeEventListener('load', preloaded, false);
			gLightboxPreload.removeEventListener('error', errorMessage, false);
		} catch(error) {}
	}

	// resizeLightbox(imageWidth, imageHeight, resizeType)
	function resizeLightbox(imageWidth, imageHeight, resizeType) {
		// prep objects
		var gLightbox             = document.getElementById('gLightbox');
		var gLightboxImage        = document.getElementById('gLightboxImage');
		var gLightboxError        = document.getElementById('gLightboxError');
		var gLightboxCaption      = document.getElementById('gLightboxCaption');
		var gLightboxOverlay      = document.getElementById('gLightboxOverlay');
		var gLightboxLoadingImage = document.getElementById('gLightboxLoadingImage');
		var gLightboxPreload      = document.getElementById('gLightboxPreload');
		
		// get page size and viewport
		var sizeAndPosition = getSizeAndPosition();
		
		// caption is shown?
		var captionShown = (gLightboxCaption.className == 'gL_shown');
		
		var captionHeight = function(imageWidth, imageHeight) {
			return (captionShown ? ((imageWidth >= imageHeight) ? 35 : 50) : 0);
		}
		// calculate display position
		var calculateDisplayPosition = function(imageWidth, imageHeight) {
			return {
				x: ((sizeAndPosition['page']['x'] - 20 - imageWidth) / 2),
				y: sizeAndPosition['position']['y'] + ((sizeAndPosition['window']['y'] - 20 - captionHeight(imageWidth, imageHeight) - imageHeight) / 2),
			}
		};
		
		// get image size and copy values of a object
		var imageSize =   { x: imageWidth, y: imageHeight };
		var displaySize = { x: imageWidth, y: imageHeight };
		
		// center lightbox and make sure that the top and left values are not negative
		// and the image placed outside the viewport
		displayPosition = calculateDisplayPosition(imageSize['x'], imageSize['y']);
		
		// resize routines
		var resize = {
			normal : function() {
				// which too bigs?
				if ((imageSize['y'] / sizeAndPosition['window']['y']) > (imageSize['x'] / sizeAndPosition['window']['x'])) {
					// height is too big
					displaySize['y'] = sizeAndPosition['window']['y'] - 20 - captionHeight(imageWidth, imageHeight);
					displaySize['x'] = imageSize['x'] * (displaySize['y'] / imageSize['y']);
					
					displayPosition = calculateDisplayPosition(displaySize['x'], displaySize['y']);
				} else {
					// width is too big
					displaySize['x'] = sizeAndPosition['page']['x'] - 20;
					displaySize['y'] = imageSize['y'] * (displaySize['x'] / imageSize['x']);
					
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
			resize[resizeType || 'normal']();
		}
		
		if (DEBUG) { GM_log("loading: " + gLightboxPreload.src + " (" + imageSize['y'] + "x" + imageSize['x'] + ", " + displaySize['y'] + "x" + displaySize['x'] + ")") };
		
		// set css
		gLightbox.style.left = displayPosition['x'] + 'px';
		gLightbox.style.top  = displayPosition['y'] + 'px';
		gLightboxImage.style.width  = displaySize['x'] + 'px';
		gLightboxImage.style.height = displaySize['y'] + 'px';
		gLightboxCaption.style.width = displaySize['x'] + 'px';
		
		// After image is loaded, update the overlay height as the new image might have
		// increased the overall page height.
		sizeAndPosition = getSizeAndPosition();
		gLightboxOverlay.style.height = sizeAndPosition['page']['y'] + 'px';
	}

	// resizeLightboxAtEvent(event)
	function resizeLightboxAtEvent(event) {
		var gLightboxImage = document.getElementById('gLightboxImage');
		
		if (lightboxShown()){
			if (gLightboxImage.className == 'gL_shown') {
				resizeLightbox(gLightboxImage.naturalWidth, gLightboxImage.naturalHeight);
			} else {
				resizeLightbox(600, 50);
			}
		}
	}
	
	// resizeLightboxAtCommand(resizeType)
	function resizeLightboxAtCommand(resizeType) {
		var gLightboxImage = document.getElementById('gLightboxImage');
		
		if (lightboxShown()){
			if (gLightboxImage.className == 'gL_shown') {
				resizeLightbox(gLightboxImage.naturalWidth, gLightboxImage.naturalHeight, resizeType);
			} else {
				resizeLightbox(600, 50);
			}
		}
	}
	
	// toggleCaption()
	function toggleCaption() {
		var gLightboxImage   = document.getElementById('gLightboxImage');
		var gLightboxCaption = document.getElementById('gLightboxCaption');
		
		toggleDisplay(gLightboxCaption);
		
		if (lightboxShown()){
			if (gLightboxImage.className == 'gL_shown') {
				resizeLightbox(gLightboxImage.naturalWidth, gLightboxImage.naturalHeight);
			} else {
				resizeLightbox(600, 50);
			}
		}
	}

	// toggleDisplay(node)
	function toggleDisplay(node) {
		switch (node.className) {
			case 'gL_hidden':
				node.className = 'gL_shown';
				break;
			case 'gL_shown':
				node.className = 'gL_hidden';
				break;
		}
	}

	// lightbox is shown?
	function lightboxShown() {
		var gLightbox = document.getElementById('gLightbox');
		
		return (gLightbox.className == 'gL_shown');
	}

	// ====================
	// Main routine
	// ====================

	checkSITEINFO();
	checkNodes();
	
	// for AutoPagerize
	if (window.AutoPagerize) {
		addFilterHandler();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
	}

})()
