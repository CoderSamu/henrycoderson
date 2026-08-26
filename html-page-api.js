/**
 * HTML PAGE API 1.0.0
 *
 * If any pages exist in an HTML file, this API can load, create, modify, and reload pages, along with some other features. The pages must have a host, preferably a <main> element. Page elements must [...]
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

		// If pages wasn't provided or isn't a NodeList/Array, use a live NodeList from host
		if (!this.pages || (!(this.pages instanceof NodeList) && !Array.isArray(this.pages))) {
			this.pages = this.host.querySelectorAll(':scope > .html-page');
		}

		// Scan the pages
		for (var i = 0; i < this.pages.length; i++) {
			// Skip non-elements (defensive)
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

		// Refresh pages collection so it's up-to-date (handles NodeList/Array cases)
		try {
			// If pages was an array, try to push; if NodeList, re-query to get live list
			if (Array.isArray(this.pages)) {
				this.pages.push(div);
			} else {
				this.pages = this.host.querySelectorAll(':scope > .html-page');
			}
		} catch (e) {
			// Fallback: reassign to live NodeList
			this.pages = this.host.querySelectorAll(':scope > .html-page');
		}

		// Return the created element for convenience
		return div;
	}

	// Reveal or display a tab (id or number)
	activate (id) {
		// Ensure we operate on up-to-date pages
		if (!this.pages || (!(this.pages instanceof NodeList) && !Array.isArray(this.pages))) {
			this.pages = this.host.querySelectorAll(':scope > .html-page');
		}

		// Hide all pages
		for (var i = 0; i < this.pages.length; i++) {
			// Skip for loop objects
			if (!(this.pages[i] instanceof Element)) continue;

			// Store scanned page in single variable
			let page = this.pages[i];

			// Hide all pages
			page.classList.remove('active')
		}

		// If chosen, activate page by number (0 index)
		if (typeof id == 'number') {
			// Use host-scoped NodeList
			let pages = this.host.querySelectorAll('.html-page');
			if (id < 0 || id >= pages.length) throw new RangeError('Index out of range: ' + id);
			pages[id].classList.add('active')
		} else if (typeof id == 'string') { // Or HTML Id attribute
			let el = this.host.querySelector('#' + id);
			if (!el || el.parentElement !== this.host) return;
			el.classList.add('active')
		} else { // OhNoes!
			throw new TypeError('Cannot execute activate function with an unknown type: ' + id);
		}
	}

	// Removes a page, either by id or number
	remove (id) {
		// Ensure we operate on up-to-date pages
		if (!this.pages || (!(this.pages instanceof NodeList) && !Array.isArray(this.pages))) {
			this.pages = this.host.querySelectorAll(':scope > .html-page');
		}

		// If chosen, remove page by number (0 index)
		if (typeof id == 'number') {
			let pages = this.host.querySelectorAll('.html-page');
			if (id < 0 || id >= pages.length) throw new RangeError('Index out of range: ' + id);
			this.host.removeChild(
				pages[id]
			)
		// Or, remove by HTML ID attribute
		} else if (typeof id == 'string') { 
			let el = this.host.querySelector('#' + id);
			if (!el || el.parentElement !== this.host) throw new Error('No page with id: ' + id);
			this.host.removeChild(el)
		} else { // Throw an error for unknown methods
			throw new TypeError('Cannot execute remove function with an unknown type: ' + id);
		}

		// Refresh pages collection
		this.pages = this.host.querySelectorAll(':scope > .html-page');
	}

	// Modify page content (html only)
	modify (id, html) {
		// Ensure we operate on up-to-date pages
		if (!this.pages || (!(this.pages instanceof NodeList) && !Array.isArray(this.pages))) {
			this.pages = this.host.querySelectorAll(':scope > .html-page');
		}

		// If chosen, modify page by number (0 index)
		if (typeof id == 'number') {
			let pages = this.host.querySelectorAll('.html-page');
			if (id < 0 || id >= pages.length) throw new RangeError('Index out of range: ' + id);
			pages[id].innerHTML = html;
		// Or, modify by HTML ID attribute
		} else if (typeof id == 'string') { 
			let el = this.host.querySelector('#' + id);
			if (!el || el.parentElement !== this.host) throw new Error('No page with id: ' + id);
			el.innerHTML = html;
		} else { // Throw an error for unknown methods
			throw new TypeError('Cannot execute modify function with an unknown type: ' + id);
		}
	}
}
