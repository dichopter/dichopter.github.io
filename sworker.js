var filesToCache = [
  'https://trackyourlogs.com/Resources/Icons/favicon-32x32.png',
  'https://trackyourlogs.com/Resources/Icons/favicon-16x16.png',
  'Resources/Icons/favicon-32x32.png',
  'Resources/Icons/favicon-16x16.png',
  'Resources/Icons/safari-pinned-tab.svg',
  'Resources/Icons/favicon.ico',
  'Resources/Icons/browserconfig.xml',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'Resources/base.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/js/materialize.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery-dateFormat/1.0/jquery.dateFormat.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/fonts/roboto/Roboto-Thin.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/fonts/roboto/Roboto-Light.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/fonts/roboto/Roboto-Bold.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/fonts/roboto/Roboto-Regular.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/fonts/roboto/Roboto-Medium.woff2',
  'https://fonts.gstatic.com/s/materialicons/v30/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2',
  'https://trackyourlogs.com/login-page/manifest.json'
];
 
var staticCacheName = 'pages-cache-v2';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
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