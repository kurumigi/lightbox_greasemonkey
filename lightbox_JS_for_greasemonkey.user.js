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
	//  Configuration
	// ====================

	// If you would like to use a custom loading image or close button reference them in the next two lines.
	var loadingImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAWCAYAAAAGhCi/AAABg0lEQVRoge2awa5EMBRA54Na5WLejImEBTGZJoSPeMks/P/uzqoNRR9iMs+4i7OpE5uD0jr5vo/E8Tj5vo9t2xIHoWmafvgkSYiDMAjPOUfGmIZzTuwYs6XqPAjPGMM4jjHLMsyyDPM8x6IoNGma6pOmado7NuUBwOQ8AwDkvckDAPQ8Dz3PQyEEMsbs4c3o9/u9h+M46DjOYHzKC4LACnnv8cz4s8J3oz8eD42UEl3XRdd1UUppRXnn89kKedt5YRhqzPjW8JzzQXQpJZZlqVFXUHdsDOVdLhcr5G3vqYugG986x3PO9TzdjV5VlQYAEAB6Y2Mo73q9WiFve68bX835s8Kru92MXte1PlFd11aUF0WRFfK288z43bt+dXgzKIX/nx6FP6g3O7wQDJ/PX7zdfuhRv3Pvr0e96iwEo5e7b/RWvdzR59z+vcWfc7SAs29v9QIOLdl+j7d4yZY2ab7DW7RJM7aVR+yX2duyn/47hHg/vfBN03z8rxDiA3/gEMfjBTnjhuGLWX5tAAAAAElFTkSuQmCC';
	var closeButton = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAXUlEQVQ4jWNgGAWDD7x79+4/uXhgDJw+ffp/BwcHrAY4ODj8nz59OmkGOjg4wDEhcaK9jK4ZlyUkhSGyIdgMIytS8Bk2sC6kahhSPZapng4HX9ajxFCcBpJrKDZzAP478L8U4gAcAAAAAElFTkSuQmCC'


	// ====================
	//  Main routine
	// ====================

	initLightbox();


	// ====================
	//  Functions
	// ====================

	// initLightbox()
	// Function runs on HTML load, going through link tags looking for links to images.
	// These links receive onclick events that enable the lightbox display for their targets.
	// The function also inserts html markup at the top of the page which will be used as a
	// container for the overlay pattern and the inline image.
	function initLightbox()
	{
	}

	// ====================
	//  Utility functions
	// ====================

	// getElementsByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getElementsByXPath(xpath, node) {
		var node = node || document
		var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
		var data = []
		for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
			data.push(nodesSnapshot.snapshotItem(i))
		}
		return (data.length >= 1) ? data : null
	}

	// getFirstElementByXPath(xpath, node)
	// from http://www.ohmiyapatriots.com/blog/2007/07/04/greasemonkey%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%82%8B/
	function getFirstElementByXPath(xpath, node) {
		var node = node || document
		var result = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
		return result.singleNodeValue ? result.singleNodeValue : null
	}

})()
