// ==UserScript==

// @name    	Pandacraft - Environment Banner
// @namespace	Pandacraft
// @version		1.3
// @description	Add a banner with Environment name to avoid mistakes between preprod & prod
// @author		Thomas SERES
// @grant		none

// HTTP DOMAINS
// @include		http://127.0.0.1/*
// @include		http://localhost/*
// @include		http://*.pandacraft.local/*
// @include		http://*.pandacraft.fr/*
// @include		http://*.pandacraft.com/*

// HTTPS DOMAINS
// @include		https://127.0.0.1/*
// @include		https://localhost/*
// @include		https://*.pandacraft.local/*
// @include		https://*.pandacraft.fr/*
// @include		https://*.pandacraft.com/*
// @downloadURL https://raw.githubusercontent.com/pandacraft/ninja/master/js/user-script/env/banner.js
// @updateURL 	https://raw.githubusercontent.com/pandacraft/ninja/master/js/user-script/env/banner.js

// ==/UserScript==

(function() {
	'use strict';

	// Default conf
	var envNotifDefaultStyle = "position: fixed; z-index: 999; top: 0; left: 0; right: 0; padding: 5px; color: #FAFAFA; text-align: center; font-weight: bold; font-size: 15px; cursor: pointer;";

	var envText = "PROD";
	var envColor = "#DD393B";

	// Define env
	var hostname = window.location.host;

	// IS PREPROD ?
	if (hostname.indexOf("preprod") > -1) {
		envText = "PREPROD";
		envColor = "#4DB6DC";
	}

	// IS LOCAL ?
	if (hostname.indexOf("pandacraft.local") != -1  || hostname == "127.0.0.1" || hostname == "localhost") {
		envText = "LOCAL";
		envColor = "#4DB6DC";
	}

	// Set Env Banner
	var envNotifEl = document.createElement("div");
	envNotifEl.style = envNotifDefaultStyle + "background-color: " + envColor + ";";
	envNotifEl.innerHTML = envText;

	envNotifEl.onclick = function() {

		if (this.style.top == "0px") {

			this.style.top = "auto";
			this.style.bottom = "0px";

		} else {

			this.style.top = "0px";
			this.style.bottom = "auto";
		}

	};

	// Insert Env Banner
	document.body.insertBefore(envNotifEl, document.body.firstChild);

})();
