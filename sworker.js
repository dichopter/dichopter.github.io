var staticCacheName = 'v1';

var filesToCache = [
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js',
  '../favicon-32x32.png',
  '../favicon-16x16.png',
  '../safari-pinned-tab.svg',
  '../favicon.ico',
  '../browserconfig.xml',
  '../site.webmanifest',
  '../manifest.json',
];

self.addEventListener('install', function(event) {
  console.log('Service worker installed...');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      console.log("Service worker caching files...");
      return cache.addAll(filesToCache);
    })
    .then(()=>{ self.skipWaiting() })
  );
});

self.addEventListener('activate', function(event) {  
  console.log("Service worker activated...");
  // Remove unwanted, old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache!==staticCacheName) {
            console.log(`Clearing "${cache}" cache`);
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }).catch(function(error) {
      // TODO 6 - Respond with custom offline page
    })
  );
});

