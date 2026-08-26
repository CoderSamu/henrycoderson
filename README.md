# Henry Coderson KA Repositories 
Welcome to Henry Coderson's GitHub repository! All files - JS, HTML, CSS, and applications are stored in this repository. This repository was released on 2026-08-24 under the GPL General Version 3, meaning that any distribution of this code must be stored within a project that is also under the exact same license. To avoid such issues, please use the jsDelivr method, which exports the code into your project as a third-party service rather than inherited code.

## Features
### PageAPI
The PageAPI allows you to manage multiple pages within a single URL. And although the CSS styling and the HTML structure are up to you, the API sets up the foundation. The _host_, preferably a <main> tag, holds all the page div elements, which must have the class .html-page. There are four functions in the PageAPI class as of version 1.0.0: create, activate, remove, and modify. Each one of these functions allows you to handle your pages with ease.

The create function allows you to create a new page element, using either raw text or plain HTML. It takes two parameters: *content*, which is the content of the new page, and *type*, which determines whether you'll use innerHTML ("html") or textContent ("text"). It will add a page at the end of the page list in a consecutive manner, and the feature to decide where to place the page in terms of index is currently unavailable in this version.

The activate function activates a page, hiding all other pages to switch to the desired page. It takes one argument, *id*, which automatically switches to number or ID (HTML ID Attribute) modes, so you don't have to worry about adding a second argument. It works just like other page switchers, except all pages must have the host specified in the constructor.

The remove function removes a desired page, deleting the page whole instead of merely hiding it. Similar to activate, it takes one parameter, *id*, which also automatically switches depending on the argument's type. **REMEMBER**: Once a page is deleted, it cannot be retrieved unless the webpage or website is reloaded.

Finally, there is a modify function. It takes two parameters, but it differs from the create function. It has an automatic *id* parameter and a *content* parameter that only accepts HTML, as textContent isn't supported in this current version. Any code applied will remain permanent to the page unless the page is reloaded, deleted, or shifted in index. 

## Disclaimer
Other APIs coming soon! 

## Credits
All code and documentation are respectfully owned by Henry Coderson, 2026. However, CoderSamu is the publisher of this repository and has access to distribute, modify, and commercialize these files at any time.
Copyright (c) 2026 Henry Coderson under the GNU General Public License V3. 
