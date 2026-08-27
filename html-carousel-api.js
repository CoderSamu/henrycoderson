/**
    * HTMLCarousel (API)
    *
    * Use this alongside .html-carousel-api.css to have a sweet ol' carousel in no time! Notice that this API
    * is a class, but only loads once everything on the entire page has loaded. For larger websites, this 
    * feature also comes with a loading spinner!
    *
    * Copyright (c) 2026 Henry Coderson. All rights reserved. Published under the GNU General Public License Version 3. 
    * This file was released on 2026-08-27, 3:59PM.
    *
    * DISCLAIMER: Requires the pairing CSS and Material Symbols Outlined from Google to function. For best performance, use specific Google fonts, even though the pairing CSS includes fallbacks.
    *
*/

// Backup ResolveCarousel
function resolveCarousel(carousel) {
    // Is it an element?
    if (carousel instanceof Element) return carousel;

    // Is it a number?
    if (typeof carousel === "number") {
        const all = document.querySelectorAll('.html-carousel');
        if (carousel < 0 || carousel >= all.length) {
            throw new RangeError("HTMLCarousel.modify(): carousel index out of range.");
        }
        return all[carousel];
    }

    // Is it an HTML id?
    if (typeof carousel === "string") {
        const el = document.getElementById(carousel);
        if (!el) {
            throw new TypeError(`HTMLCarousel.modify(): No element found with ID '${carousel}'.`);
        }
        return el;
    }

    // Invalid type
    throw new TypeError(
        "HTMLCarousel.modify(): carousel must be an Element, number (index), or string (ID)."
    );
}

if (!window.HTMLCarousel) {
    window.HTMLCarousel = class {
        constructor(carousel, track, sets) {
            this.carousel = carousel;

            // Essentials for carousel movement
            this.index = 0;
            this.total = this.sets.length;
            this._autoSlideRunning =false;
            this._lastSlideTime = 0;
            this._autoSlideDelay = 10000; // default 10 seconds


            // Check if there is a carousel
            if (!this.carousel || !(this.carousel instanceof Element)) throw new TypeError("Failed to construct HTMLCarousel: a carousel element must be provided.")

            // Handle track
            if (!track) {
                this.track = this.carousel.querySelector('.html-carousel-track');
            } else {
                this.track = track;
                if (!this.track?.classList.contains("html-carousel-track")) throw new TypeError("Failed to construct HTMLCarousel: the track is not a valid track; please use .html-carousel-track class.")
                if(!(this.track instanceof Element)) throw new TypeError("Failed to constructor HTMLCarousel: no element was provided.")
            }

            // Handle sets
            // Handle sets
            if (!sets) {
                // Get all sets
                this.sets = this.track.querySelectorAll('.html-carousel-set');
            } else {
                // Assign sets
                this.sets = sets;
        
                // Validate: must be a NodeList or array-like
                if (!(this.sets instanceof NodeList || Array.isArray(this.sets))) {
                    throw new TypeError("Failed to construct HTMLCarousel: sets must be a NodeList or array of elements.");
                }
            
                // Validate each element
                for (const set of this.sets) {
                    if (!(set instanceof Element)) {
                        throw new TypeError("Failed to construct HTMLCarousel: one or more sets are not valid DOM elements.");
                    }
            
                    if (!set.classList.contains("html-carousel-set")) {
                        throw new TypeError("Failed to construct HTMLCarousel: one or more sets do not have the .html-carousel-set class.");
                    }
                }
            }
        }

        // Private slide maker
        #makeSlide(slide) {
            const set = document.createElement("div");
            set.classList.add("html-carousel-set");
        
            // Background
            if (slide.background) {
                set.dataset.background = slide.background;
                set.style.backgroundImage = `url("${slide.background}")`;
            }
        
            // Header
            const header = document.createElement("div");
            header.classList.add("carousel-set-header");
        
            if (slide.headerImage) {
                const img = document.createElement("img");
                img.classList.add("carousel-header-img");
                img.src = slide.headerImage;
                header.appendChild(img);
            }
        
            if (slide.title) {
                const h2 = document.createElement("h2");
                h2.textContent = slide.title;
                header.appendChild(h2);
            }
        
            set.appendChild(header);
        
            // Body
            const body = document.createElement("div");
            body.classList.add("carousel-set-body");
        
            if (slide.body) {
                const p = document.createElement("p");
                p.textContent = slide.body;
                body.appendChild(p);
            }
        
            set.appendChild(body);
        
            return set;
        }


        // Create a new carousel from scratch
        static create(parent, slides, options={}) {
            if (!(parent instanceof Element)) {
                throw new TypeError("Error with HTMLCarousel.create(): parent must be a DOM element.");
            }

            if (!Array.isArray(slides)) {
                throw new TypeError("Error with HTMLCarousel.create(): slides must be an array.");
            }

            // Create outer carousel
            const carousel = document.createElement("div");
            carousel.classList.add("html-carousel");

            // Create track
            const track = document.createElement("div");
            track.classList.add("html-carousel-track");
            carousel.appendChild(track);

            // For a temporary time, create an HTML carousel instance
            const temp = new HTMLCarousel(carousel, track);
            
            // Create each slide
            for (const slide of slides) {
                const set = temp.#makeSlide(slide);
                track.appendChild(set);
            }

            // Create buttons
            const prev = document.createElement("div");
            prev.classList.add("carousel-button", "carousel-negative");
            prev.innerHTML = `<span class="material-symbols-outlined">chevron_left</span>`;
            carousel.appendChild(prev);

            const next = document.createElement("div");
            next.classList.add("carousel-button", "carousel-positive");
            next.innerHTML = `<span class="material-symbols-outlined">chevron_right</span>`;
            carousel.appendChild(next);

            // Insert into parent
            parent.appendChild(carousel);

            // Return the carousel element
            return carousel;
        }

        modify (slides, options={}, carousel) {
            // Validate slides
            if (!Array.isArray(slides)) {
                // Throw this error if it failed
                throw new TypeError("Error with HTMLCarousel.modify(): Invalid slides.");
            }

            // If the carousel was provided
            if (carousel) {
                carousel = resolveCarousel(carousel);
            } else { carousel = this.carousel; /* Default it */ }

            // Essentials
            const track = carousel.querySelector('.html-carousel-track');
            if (!track) {
                throw new TypeError("HTMLCarousel.modify(): Carousel track not found.");
            }

            // Remove old slides
            track.innerHTML = "";

            // For every slide
            for (const slide of slides) {
                // Create a new slide
                const set = this.#makeSlide(slide);

                // And add it, too
                track.appendChild(set);
            }
        }

        // Delete an entire carousel
        remove(carousel) {
            // Resolve carousel
            if (carousel) {
                carousel = resolveCarousel(carousel);
            } else {
                carousel = this.carousel;
            }
        
            // If the carousel is empty
            if (!carousel) {
                throw new TypeError("There was an error executing HTMLCarousel.remove(): No valid carousel to remove.");
            }

            // If it has no parent
            if (!carousel.parentNode) {
                // Already removed or not attached
                return false;
            }
        
            // Remove from DOM
            carousel.parentNode.removeChild(carousel);

            // Return the deleted state
            return true;
        }

        // Delete a set (Number recommended)
        deleteSet(set, carousel) {
            // Resolve carousel
            if (carousel) {
                carousel = resolveCarousel(carousel);
            } else {
                carousel = this.carousel;
            }
        
            // If carousel is DEAD
            if (!carousel) {
                throw new TypeError("Error with: HTMLCarousel.deleteSet(): No valid carousel to modify.");
            }
        
            // Get the track
            var track = carousel.querySelector('.html-carousel-track');
            if (!track) {
                track = this.track;
                if (!track) throw new TypeError("Error with: HTMLCarousel.deleteSet(): Carousel track not found.");
            }
        
            // Get all sets
            var sets = track.querySelectorAll('.html-carousel-set');
        
            // Hmm... shall we index it up or go with the elements?
            let target;
        
            // For number sets
            if (typeof set === "number") {
                // Check if the set is out of range.
                if (set < 0 || set >= sets.length) {
                    throw new RangeError("The set is out of range.");
                }

                // This is our target
                target = sets[set];
            }
        
            // Mode 2: element
            else if (set instanceof Element) {
                console.debug("HTMLCarousel.deleteSet(): Using an HTMLElement is non-standard and may be deprecated. It is recommended that you use indices instead. For more information, see the GitHub repository at https://www.github.com/CoderSamu/henrycoderson/issues");
        
                // If it ain't valid, throw an error
                if (!set.classList.contains("html-carousel-set")) {
                    throw new TypeError("HTMLCarousel.deleteSet(): Provided element is not a valid carousel set.");
                }
        
                // Ensure the element is actually inside this track
                if (!track.contains(set)) {
                    throw new TypeError("HTMLCarousel.deleteSet(): Provided set does not belong to this carousel.");
                }

                // This is our target now
                target = set;
            }
        
            // Otherwise...
            else {
                // Oh my, what an invalid type.
                throw new TypeError("Error executing: HTMLCarousel.deleteSet(): set must be a number (index) or an Element.");
            }
        
            // Remove the set
            track.removeChild(target);
        
            return true;
        }

        // Slide to the next set. 
        slide(carousel, dir) {
            // Dir is positive by default
            dir = dir || "right";
            
            // If carousel exists, make sure it is error-free.
            if (carousel) {
                carousel = resolveCarousel(carousel);
            } else {
                // Inherent carousel otherwise.
                carousel = this.carousel;
            }
        
            // Try to get track
            const track = carousel.querySelector('.html-carousel-track');
            if (!track) {
                // When a track doesn't exist, we'll try to inherit the track.
                track = this.track;
                if (!track){ 
                    // If no track was found, or if this.track wasn't specified, we'll throw the error.
                    throw new TypeError("Error executing HTMLCarousel.slide(): carousel track was not found.");
                }
            }
        
            // Processes
            if (this.type != "left"){
                this.index = (this.index + 1) % this.total;
            } else {
                this.index = this.index = (this.index - 1 + this.total) % this.total;
            }
        
            // Adding a smooth transformation.
            track.style.transform = `translateX(-${this.index * 100}%)`;

            // Return the index.
            return this.index;
        }

        // Loop processing
        loop(carousel) {
            // AutoSlideRunning is a feature you must choose yourself.
            if (!this._autoSlideRunning) return;
        
            // Resolve carousel (IAC)
            if (carousel) {
                carousel = resolveCarousel(carousel);
            } else {
                carousel = this.carousel;
            }
        
            const now = performance.now();
        
            // If enough time has passed, slide
            if (now - this._lastSlideTime >= this._autoSlideDelay) {
                this.slide(carousel);
                this._lastSlideTime = now;
            }
        
            // Continue loop
            requestAnimationFrame(() => this._autoSlideLoop(carousel));
        }

        // Automatica Slide Timeout
        timeout(delay = 10000, carousel) {
            // Configure autoslide essentials.
            this._autoSlideDelay = delay;
            this._lastSlideTime = performance.now();
            this._autoSlideRunning = true;

            // Begin the loop
            this.loop(carousel);
        }

        // Configurations for carousels
        configure = {
            // Handle Button UI
            buttons: (carousel) => {
                // If carousel is specified, check for errors
                if (carousel) carousel = resolveCarousel(carousel)
                else carousel = this.carousel; // Otherwise inherit carousel

                // If the carousel is still not available
                if (!carousel) throw new TypeError("Cannot read properties of undefined (reading 'carousel')");

                // Both carousel buttons
                var positive = carousel.querySelector('.carousel-positive'),
                    negative = carousel.querySelector('.carousel-negative');

                // Cease execution with an error if the buttons weren't implemented
                if (!positive || !negative) throw new ReferenceError("This feature is unavailable because the buttons are currently not defined in your html.");

                // Positive (next) interaction
                positive.onclick = (vent) => {
                    // Slide forwards
                    this.slide(carousel, "right");
                }

                // Negative (prev) interaction
                negative.onclick = (tnev) => {
                    // Slide backwards
                    this.slide(carousel, "right");
                }
            },

            // Basic UI features
            UserInteraction: (carousel) => {
                // To use inside events 
                var THIS = this;
                
                // If carousel is specified, check for errors
                if (carousel) carousel = resolveCarousel(carousel)
                else carousel = this.carousel; // Otherwise inherit carousel

                // If the carousel is still not available
                if (!carousel) throw new TypeError("Cannot read properties of undefined (reading 'carousel')");

                // When carousel is hovered upon, stop the auto sliding.
                carousel.onmouseover = (evt) => THIS._autoSlideRunning = false;

                // When mouse exits carousel, restart carousel at random time
                carousel.onmouseout = (evt) => THIS.timeout(
                    10000, carousel
                )        

                // Set up start positions
                var startX = 0;
                
                // When the carousel is touched, assign startX
                carousel.ontouchstart = (evt) => startX = e.touches[0].clientX;

                // When the touch his left
                carousel.ontouchend = (evt) => {
                    // Calculate swipe and their movements
                    const endX = e.changedTouches[0].clientX;
                    const diff = endX - startX;
    
                    if (diff > 50) {
                        // swipe right... previous
                        this.slide(carousel, "left");
                    } else if (diff < -50) {
                        // swipe left... next
                        this.slide(carousel, "right");
                    }
                }
            }
        };
    };
}
