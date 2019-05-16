// ==UserScript==

// @name    	Pandacraft - Environment Banner
// @namespace	Pandacraft
// @version		1.8
// @description	Add a banner with Environment name to avoid mistakes between staging & production
// @author		Thomas SERES
// @grant		none

// HTTP DOMAINS
// @include		http://127.0.0.1/*
// @include		http://localhost/*
// @include		http://*.pandacraft.*

// HTTPS DOMAINS
// @include		https://127.0.0.1/*
// @include		https://localhost/*
// @include		https://*.pandacraft.*
// @downloadURL https://raw.githubusercontent.com/pandacraft/ninja/master/js/user-script/env/banner.js
// @updateURL 	https://raw.githubusercontent.com/pandacraft/ninja/master/js/user-script/env/banner.js

// ==/UserScript==

(function() {
	'use strict';

	// Default conf
	var envNotifDefaultStyle = "position: fixed; z-index: 999; bottom: 0; left: 0; right: 0; padding: 10px; color: #FAFAFA; text-align: center; font-weight: bold; font-size: 15px; cursor: pointer;";

	var envText = "PRODUCTION";
	var envColor = "#DD393B";

	var faviconElt = document.querySelector('link[rel="shortcut icon"]')
	faviconElt.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAC/ElEQVRYR8VXwU4TQRj+xhqbYDDGriHizZKUExcOUlzegBYfwaiBFyBVT9KTSryaaCPGR1DaN3CheOBOE/AoGrfGaCTB2I75t51hZjq7O23SOKd2d2a+7/v/b/75l+E/DmbDPir6dQDLyrtGvhmU1LlHC/4GZ7imPmMcx/m9YMNVzwC4BVjsJQkc3vRXGcM0GOYHgDj2XQlo4KQGDI/jmDOO8o29oJ5AkJY24EhAAz8s+q8YsDpZLiHj5ZAtFHDaaqETtvFrmzLhPJwISHBV9dSzJ7i45Euk76+38OPNWw15YrGIC7MFnPc8+TzcfH42h6OaFn4n8N8fAnx98EhuTJGhcfVhRSP08917/A1DSTTfDKyGFoucwL893dTCTuATtxa16IgNiYCIwEjgas5PdnbRCUOc7Dalyst37+DK/XtWA6jgZNAuwzL5iCbzLtbOMRyTaem/VbmLrUxfiDU2f2j7cVQ5x+eZj0FtZHBST2bL5HJy7067reWcImhGLZrMUWXA/sjgadGh05DxPOkNMi2lUBxZSsHYwG2m1E5NT31vpFW3NKXm+yRwDtToHhgbOIV9cqUsj6Madg08Ut3zfmxdH1Y5zRd5p98y133VVP0i5eMCNwkLxaLsnoErqr3KenSEVHeOolxdYwJHgTaNZrtUxCZ0y9EYhRSBzzSDNZXQADipvnR7JVUoVbI/By2t7MYtsgFblbuC02Kq41Ekgp0kEgMtmCA5kPNhwFWlX9YrNgINxlETF4kZmQj804Jf4gzb9Ds7N4frL1+kht2cYN750fuUhkIFp2sv6lipOpmNQhobC3ii6l5Z6Q/V9aI4DEPAaDgavIs6XZtJpPXuVenXBYHsbCHV/WQ8xXROzaOmXMm9DL/KmlJBRMT9TXc3jdODltnZpoZbc7v4Q8brtz3TxhdLWsrFe6dwW8GlevS/RHpfJOpnUxKJKNzUocQdLetRi9vR+cLpt0WuoLHKTSJRDQDm6aNQdKHiDA+j0iYwsam3EVGfDavU3O8fGZSe9yojOJIAAAAASUVORK5CYII=";

	// Define env
	var hostname = window.location.host;

	// IS STAGING ?
	if (hostname.indexOf("pandacraft.ninja") > -1 || hostname.indexOf("preprod") > -1) {
		envText = "STAGING";
		envColor = "#FF9401";
		faviconElt.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAACwUlEQVRYR7VXvW4TQRD+tqCBOki4gQAVZRxSUwbFjih4BZLCfgZi8wx2QXgFChTb/HTUkU1J6ZDGSFCi0CBl0Oze3O3u7d2uD7OV7252vplvfq0QOJ33yy5dX69mnYeL0Hd5x3L8O0U2pEf5L1nh5OLBmf9e9ciRpRFeA2iV5PrQBqWcEjiNFQUvEk1VppjGGIDQhlKdkqwlFzOg7I1SR9WXaNjdXi4my/tHQWC5SHSq+jheF3yild49ALbawL0O8G0K/P4OfH0T02V9p0sQPsUMyD3XVEKdaA3Pz4Hbu4Wy8wEwf1UGFyPliy2TQH8BzgkklPvgP+bA270CnEH5HExcg9jInwvgcqbf+0laSs48THXgvucM/vjEZUcUfT7OQ9QM3I45x9qP96MXwBOutMCxwAEaOlVBNIXCqepBUxamPSW1/NDInVk3p72qZAGsOBmbg9vsCApXhhVzXTVZ/B1DhIFgzFM8T5FhcA7R9iFwcWbClxtDQ7vU5oBqp+hMkrGB5QIb8OGZeeJGZHluGsymTqgiBJxp57j/N3BW/PSdoZyPTbuJ+S8NTiN8BPBno56LV8zArVZRrsbrG6qPfQE3rWqTtIfCJ3RnQ6cAt4F3XwJbO152/mMyeMDaV2eg+HHiZ+5YVytD3c07xgK7llNtIuIpt2+LK72R2DOcvd4bxFXGOpmtoWLCNQdn5TxwEpioGjDlmNcNjTo+KpmgQxkk/nUDbi8SXBr+nI4HwdSxdK+8eRR7X0iFgHcBVWysTQwIgaPaa53tlR1uXQOcOZ717sgS6W6v/tosYzOW/f7EStjfHM9LsfeDJIZw89EZ/qUm0+vpFtWe5+iCUL+TR5OPhqrHm3D8BP6xZAZoXtYcsd6OFoMvgTuNaWQWvagRa4IGaQ9ZSmPNBC8ZLceIhoA2Rq3nvjHakOxUda0Y1fb3v8ghU7d9mr2AAAAAAElFTkSuQmCC";
	}

	// IS LOCAL ?
	if (hostname.indexOf("pandacraft.local") !== -1 || hostname === "127.0.0.1" || hostname === "localhost") {
		envText = "LOCAL";
		envColor = "#4DB6DC";
		faviconElt.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAC4ElEQVRYR7VXT2sTQRR/Y4SUii0NWP/Ri+7ePGlF8AMopBvP6geoF28eBW0Fj968mA8gnt1NQD+AILaevCV6KVatEGnF0oDNyJvMzL6Znc1MtjinZObN+733e/9mGThW0v3S4qPRdieJNl3nag/l8HeIrEsPszdRIYPRa3s/bUaGbKvbfwGcnyvIrcTCoJBVAG91+9x5kfMslYqTTm+NAVwBxpKCLJHzGVD0BmC17BLnfB1YbZPxw1UncH6xnTaje9OBd3opKl0+NQvRfB2uLs7Ch519GAz/wtut3z5d+TnnGTC27TNAey6oZOwxanh2/TzE8zNa2cveAF71fxXAlZHqwJAJoF+DiwSSlNvgvd0DePDuqwZHUFyPls8aBqGR/d0hbPzcF/t2ktrWB4HbniP4nXjBYEcpfv5pR4eoEjiN+ZutvUK8byydhPuXFp05QMExQY2q4DzjrNbOmhdSvOz0PCSz7NCoO082vmnay0pWJWNlcMqOAsHKoDFHGRV/wxDJQGXwEHYQ/ObSHFw7fQLe//gDGEJljAzJWA0ttRDFPhkKrGTRgKcfv6u/7dxz2WB8SkPPXRWhwWUT+m/gaOTDy2cE5bgM2mnM9YRyDYpQV0vkkIHGTC0vV1JuwvMWUi4KzzGljghuZ7majLrOBTgBvh0twMW5upGdR7bB0euZneU0TgiIHWtwcCioa9SPCxtoLYcaxeHYLdXZ1B1GBwpuotd344ZXp7eTUQ0lE64yOOrGgRPCRNmAyRNOxnzS0JhERxkTLro17XZ3w9Kw57Q3BrKOSfcaX/E8KGhv1w/HKgZYrXOM7Ugy6khph5vWADrHJYD3EWm/Xo1nsxqbvuy3J5aPbiPm6s+kyaYMweaD6/PesDTTfXQ7wXHT7nYhyWaWNF/PVuK1kHuFLxZtAP6YttcHPJedCeeyNHjgWA/DEK+Fbz5B+eGYiI9CykRFwGDPbcPUJzHu20PC54Tr/B9uxq3WJI3eVwAAAABJRU5ErkJggg==";

	}

	// Set Env Banner
	var envNotifEl = document.createElement("div");
	envNotifEl.style = envNotifDefaultStyle + "background-color: " + envColor + ";";
	envNotifEl.innerHTML = envText;
	var lineNotifEl = document.createElement("div");
	lineNotifEl.style = "background-color: " + envColor + "; height: 3px; position: fixed; top: 0; left 0; z-index: 9999; width: 100%;";

	envNotifEl.onclick = function() {

		if (this.style.top == "0px") {

			this.style.top = "auto";
			this.style.bottom = "0px";

		} else {

			this.style.top = "0px";
			this.style.bottom = "auto";
		}

	};

	// Avoid insertion in iframes
	if (window.location.pathname.indexOf("be2bill") === -1 && window.location.href.indexOf("youtube") === -1) {

		// Insert Env Banner
		document.body.insertBefore(envNotifEl, document.body.firstChild);
		document.body.insertBefore(lineNotifEl, document.body.firstChild);
	}

})();