/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test ensures that all feed items have
           a url property defined on them and that they
           each contain a value */
         it('all have a url property', function() {
            allFeeds.forEach(function(feed) {
                // Ensure it's been defined
                expect(feed.url).toBeDefined();

                // A non-empty string will be truthy
                expect(feed.url).toBeTruthy();
            });
         });

        /* This test ensures that all feed items have
           a url property defined on them and that they
           each contain a value */
        it('all have a name property', function() {
            allFeeds.forEach(function(feed) {
                // Ensure it's been defined
                expect(feed.name).toBeDefined();

                // A non-empty string will be truthy
                expect(feed.name).toBeTruthy();
            });
         });
    });


    describe('The Menu', function() {

        /* This test tests to see if the slide menu is
           hidden by default.
         */
        it('should initially hidden', function() {
            var body = document.body;
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });

         /* This test ensures that when the menu icon is clicked, from
            its initial state, the menu is shown, then on clicking it again
            it's hidden once more.
          */
        it('should toggle visibility on clicking its menu icon', function() {
            var menuIcon = document.getElementsByClassName('menu-icon-link')[0];

            // First verify that the menu is hidden
            var bodyClassList = document.body.classList;
            expect(bodyClassList.contains('menu-hidden')).toBeTruthy();

            // next click the menu's icon and verify that it's showing
            menuIcon.click();
            expect(bodyClassList.contains('menu-hidden')).toBeFalsy();

            // Click it once more to see that it should be hidden again
            menuIcon.click();
            expect(bodyClassList.contains('menu-hidden')).toBeTruthy();

        });
    });

    describe('Initial Entries', function() {
   
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        beforeEach(function(done) {
            // Clear out the feeds or we won't be testing the case where the loadFeeds()
            // method brings nothing back
            var feedContainer = document.getElementsByClassName('feed')[0];
            if(feedContainer) {
                feedContainer.innerHTML = "";
            }
            
            // Run the async function
            loadFeed(0, function() {
                done();
            });
        });

        // Tests that the loadFeed() function actually displays some results
        it('should have at least one entry in the .feeds container after loading', function(done) {

            // Ensure there is at least 1 feed element
            var entryLinks = document.querySelector('.feed > .entry-link');
            
            // If nothing is found, this will be false since null is truthy
            expect(entryLinks).toBeTruthy();
            done();

        });

    describe('New Feed Selection', function() {
        
        var initialFeedItem = null;
        var afterLoadFeedItem = null;

        beforeEach(function(done) {
            // Clear out the feeds or we won't be testing the case where the loadFeeds()
            // method brings nothing back
            
            // Run the async function
            if(allFeeds && allFeeds instanceof Array && allFeeds.length >= 0) {
                loadFeed(0, function() {
                    // Grab the first item's text after an initial load
                    initialFeedItem = document.querySelector('.feed > .entry-link h2').textContent;
                    done();
                });
            } else {
                console.log('allFeeds is either empty or not set. Could not complete test.');
            }
        });

         beforeEach(function (done) {
            if(allFeeds && allFeeds instanceof Array && allFeeds.length >= 1) {
                loadFeed(1, function() {
                    // Grab the first item's text after some new data's been loaded
                    afterLoadFeedItem = document.querySelector('.feed > .entry-link h2').textContent;
                    done();
                });
            } else {
                console.log('allFeeds is either empty, has less than one element or is not set at all. Could not complete test.');
            }

        });



        it('should display new content on new feed selection', function(done) {
            // Once the beforeEach() has run, we have the initial value of the first header
            // Now we can generate a new batch
            
            // The following four tests just ensure that we have meaningful data and aren't
            // just comparing an initial state with an aftermath state of null, in which
            // case they wouldn't be equal, but the test would pass.

            // If these exist they will either be strings or empty strings
            expect(initialFeedItem).toBeDefined();
            expect(afterLoadFeedItem).toBeDefined();

            // If they are empty strings, they'll be falsy
            expect(initialFeedItem).toBeTruthy();
            expect(afterLoadFeedItem).toBeTruthy();
          
            // Ensure new content has been loaded
            expect(initialFeedItem).not.toEqual(afterLoadFeedItem);
            done();
        });

    });
  
    });
}());
