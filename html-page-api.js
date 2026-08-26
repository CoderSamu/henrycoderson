/**
 * HTML PAGE API 1.0.0
 *
 * If any pages exist in an HTML file, this API can load, create, modify, and reload pages, along with some other features. The pages must have a host, preferably a <main> element. Page elements must be of class .html-page, otherwise, none of the API's features will work. Created 2026-08-25 by Henry Coderson, henry.js@outlook.com. 
 *
 * Copyright (c) Henry Coderson and all affiliates. All rights reserved.
 * 
 * REVISED: 2026-08-26: Fixed create function issue
 * REVISED: 2026-08-26, 4:16 EST: Fixed activate, remove, and modify functions with the querySelector issue.
 * REVISED: 2026-08-26, 4:23 EST: Fixed activate, remove, and modify functions with the ID issue. Use querySelector for IDs.
*/

/** Page class */
class PageAPI {
	// Construct it
	constructor(pages, host){
		// Inner arguments
		this.pages = pages;
		this.host = host;

		// Throw this error when there ain't no host
		if (!this.host || !(this.host instanceof Element)) throw new TypeError("Cannot assemble PageAPI without a host element, preferably <main> tag.");

		// Scan the pages
		for (var i in this.pages) {
			// Skip for loop objects
			if (!(this.pages[i] instanceof Element)) continue;

			// Represent the currently scanned page
			let page = this.pages[i];

			// If the parent element isn't the host, throw the error
			if (page.parentElement !== this.host) {
				throw new TypeError("Cannot assemable PageAPI when one or more pages are not all children nodes of host element.");
			}
		}
	}

	// Creates a new page
	create (content, type) {
		// Creates a new page element
		let div = document.createElement('div');
		div.classList.add('html-page');

		let aType = typeof type == "string" ? type.toLowerCase() : type;
		// Switch between modes 
		switch (aType) {
			// HTML mode (innerHTML)
			case "html":
				div.innerHTML = content;
				break;
			// Text mode
			case "text":
				div.textContent = content;
				break;
			// Default (Error)
			default:
				throw new RangeError("Type is out of range");
		}

		// Add page to host
		this.host.appendChild(div);
	}

	// Reveal or display a tab (id or number)
	activate (id) {
		// Scan all pages
		for (var i in this.pages) {
			// Skip for loop objects
			if (!(this.pages[i] instanceof Element)) continue;

			// Store scanned page in single variable
			let page = this.pages[i];

			// Hide all pages
			page.classList.remove('active')
		}

		// If chosen, activate page by number (0 index)
		if (typeof id == 'number') {
			document.querySelector('.html-page')[id].classList.add('active')
		} else if (typeof id == 'string') { // Or HTML Id attribute
			if (document.querySelector('#'+id).parentElement !== this.host) return;
			document.querySelector('#'+id).classList.add('active')
		} else { // OhNoes!
			throw new TypeError('Cannot execute activate function with an unknown type: ' + id);
		}
	}

	// Removes a page, either by id or number
	remove (id) {
		// If chosen, remove page by number (0 index)
		if (typeof id == 'number') {
			this.host.removeChild(
				document.querySelectorAll('.html-page')[id]
			)
		// Or, remove by HTML ID attribute
		} else if (typeof id == 'string') { 
			this.host.removeChild(
				document.querySelector('#'+id)
			)
		} else { // Throw an error for unknown methods
			throw new TypeError('Cannot execute remove function with an unknown type: ' + id);
		}
	}

	// Modify page content (html only)
	modify (id, html) {
		// If chosen, modify page by number (0 index)
		if (typeof id == 'number') {
			document.querySelectorAll('.html-page')[id].innerHTML = html;
		// Or, modify by HTML ID attribute
		} else if (typeof id == 'string') { 
			document.querySelector('#'+id).innerHTML = html;
		} else { // Throw an error for unknown methods
			throw new TypeError('Cannot execute modify function with an unknown type: ' + id);
		}
	}
}
