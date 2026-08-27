# Henry Coderson KA Repositories 
## Introduction
This is the repository of Henry Coderson on GitHub... DOT COM. Get access to various APIs, CSS files, HTML demos, and more, all brought to you by Henry Coderson (https://www.khanacademy.org/profile/henrycoderson). This repository is updated regularly, with major releases around every 1-4 months. Minor releases may be released on a weekly basis.

## Introduction Disclaimer
Although this code is created and owned by Henry Coderson, the repository was published under the name of CoderSamu, who has affiliations with Henry and has complete access to his code. Although CoderSamu and the CodePuter Company will not modify the code, they can re-release, distribute, and relocate the code at any time or by any means. 

## Features
### PageAPI
The PageAPI allows you to manage multiple pages within a single URL. And although the CSS styling and the HTML structure are up to you, the API sets up the foundation. The _host_, preferably a main tag, holds all the page div elements, which must have the class .html-page. There are four functions in the PageAPI class as of version 1.0.0: create, activate, remove, and modify. Each one of these functions allows you to handle your pages with ease.

The create function allows you to create a new page element, using either raw text or plain HTML. It takes two parameters: *content*, which is the content of the new page, and *type*, which determines whether you'll use innerHTML ("html") or textContent ("text"). It will add a page at the end of the page list in a consecutive manner, and the feature to decide where to place the page in terms of index is currently unavailable in this version.

The activate function activates a page, hiding all other pages to switch to the desired page. It takes one argument, *id*, which automatically switches to number or ID (HTML ID Attribute) modes, so you don't have to worry about adding a second argument. It works just like other page switchers, except all pages must have the host specified in the constructor.

The remove function removes a desired page, deleting the page whole instead of merely hiding it. Similar to activate, it takes one parameter, *id*, which also automatically switches depending on the argument's type. **REMEMBER**: Once a page is deleted, it cannot be retrieved unless the webpage or website is reloaded.

Finally, there is a modify function. It takes two parameters, but it differs from the create function. It has an automatic *id* parameter and a *content* parameter that only accepts HTML, as textContent isn't supported in this current version. Any code applied will remain permanent to the page unless the page is reloaded, deleted, or shifted in index. 

### HTMLCarousel API
#### DISCLAMER
Remember to use the CSS styling with this API!!

#### Intro
This API was released on August 27th, 2026. The API features various functions that allow you to set up a full carousel with buttons, auto-slide, and touchscreen support. The API comes with generic features, such as the ability to create, modify, and remove whole carousels. But that is not all! This function was specifically designed with Khan Academy coders in mind, creating a class that can still be used in the KA sandbox without triggering any SyntaxErrors.

#### Constructor
The constructor takes one required argument and two optional arguments. The first is **carousel**, which is the required argument. It must be a carousel (.html-carousel), and not doing so will result in a TypeError. The other two arguments, **track** and *sets*** are optional, but will save you time when using HTMLCarousel functions that require these arguments.

#### `create` 
The first function provided is the create function. This function is static, meaning it must be called as HTMLCarousel.create() instead of a new HTMLCarousel instance. It takes three arguments: **parent**, **slides**, and **options** (The options feature is unavailable and will be implemented in future versions). 

This function creates an entirely new carousel, with the **parent** argument being the `Element` into which the carousel will be inserted. The **slides** parameter is an `Array` that contains objects that are structured like this:
`
{
    backgroundImage: "https://path.to.media/the.media.url.png",
    headerImage: "https://path.to.media/the.media.url.gif",
    title: "Lorem Ipsum!",
    body: "It's-a me, a-Cookie."
}
`. This must be the format they are in, or else the feature won't work properly.

The options feature, however, is not available and won't be available until another release or two.

#### `modify`
The modify function is not static, and it modifies a carousel using the same slides method as `HTMLCarousel.prototype.create`. However, it takes a carousel parameter as well, which must be a carousel element and won't be accepted if invalid. The carousel property is optional; however, it is required if you don't want to use the same carousel as the constructor's carousel argument. 

#### `remove`
The remove function removes a desired carousel, but it's worth noting that the function will remove the constructor's carousel if no carousel argument is specified. The carousel argument in both the remove and modify functions is structured with a flexible acceptance system. It gives you the choice to use a carousel `Element`, a carousel by a `NodeList` or `HTMLCollection` index, or the HTML ID of a carousel.

#### `deleteSet`
This function removes a set, and it requires two arguments (`set`, `carousel`). The `set` argument must be an index number or a `Element`; the function does not allow the HTML ID option. This function works by removing the set from the `carousel`'s track, but this carousel can only be an Element.

#### `slide`, `loop`, and `timeout`
These three functions control the actual movement of the carousel! The slide function takes two parameters: `carousel` (optional, but required if you don't want the constructor `carousel`) and `dir` (left or right; default is right). This function slides the carousel to a page prior to or after the current page, using smooth transform and transition CSS properties for a professional display.

The loop function handles the actual automatic slideshow movement. This uses `requestAnimationFrame`, because I have KA coders in mind! `setTimeout` leaks everywhere, but in KA, even more so! This avoids all that, plus it uses `performance.now()`, another hack technique. It requires only a `carousel` argument, which, like most of the others, defaults to the constructor carousel if not specified. Its buddy, the `timeout` function, takes a delay parameter, which is 10000 milliseconds by default. However, it still has a bug that we are still trying to fix (GitHub Copilot didn't solve it).

#### `configure`
This is an object that contains two functions that set up required or optional UI features. The required one is `configure.buttons`, which controls the buttons and the click handlers. The optional features are in `UserInteraction`, which contains both the touchscreen support for mobile phones and the pause-on-hover feature that prevents the carousel from getting dizzy.

## Disclaimer
This repository is still in progress. APIs like the GIFPlayer API and the 3DEngineCanvas API are coming soon. Visit this repo regularly to receive updates. Until then, enjoy the two repositories that are here, for free!

## Credits
All code and documentation are respectfully owned by Henry Coderson, 2026. However, CoderSamu is the publisher of this repository and has access to distribute, modify, and commercialize these files at any time.
Copyright (c) 2026 Henry Coderson under the GNU General Public License V3. 
