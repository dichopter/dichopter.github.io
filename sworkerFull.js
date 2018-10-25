var staticCacheName = 'v3';

self.addEventListener('install', function (event) {
  console.log('Service worker installed...');

});

self.addEventListener('activate', function (event) {
  console.log("Service worker activated...");
  // Remove unwanted, old caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== staticCacheName) {
            console.log(`Clearing "${cache}" cache`);
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// self.addEventListener('fetch', function (event) {
//   console.log("Service worker fetching...");
//   event.respondWith(
//     fetch(event.request)
//     .then(function (res) {
//       // Make a copy/clone of whatever is from the server
//       var resClone = res.clone(); // built-in method to clone
//       // Open a new cache
//       caches.open(staticCacheName)
//         .then(function (cache) {
//           // Add the currently online server response to the cache
//           cache.put(event.request, resClone);
//         });
//       return res;
//     }).catch(function (error) { // If the connection is droppped, then load from here
//       caches.match(event.request)
//         .then(function (res) {
//           return res;
//         });
//     })
//   );
// });



self.addEventListener('fetch', function (event) {
  console.log("Service worker fetching...");
  event.respondWith(
    caches.match(event.request).catch(function () {
      return fetch(event.request);
    }).then(function (res) {
      // Make a copy/clone of whatever is from the server
      var response = res.clone();
      // Open a new cache
      caches.open(staticCacheName)
        .then(function (cache) {
          // Add the currently online server response to the cache
          cache.put(event.request, response);
        });
      return response;
    }).catch(function (error) { // If the connection is droppped, then load from here
      caches.match(event.request)
        .then(function (res) {
          return res;
        });
    })
    );
});