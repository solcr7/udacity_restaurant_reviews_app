const staticCacheName = 'restaurant-cache-v1';

self.addEventListener('install', event => {
    console.log('Attemptimg to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log("hat jeklappt");
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/restaurant.html?id=1',
                '/restaurant.html?id=2',
                '/restaurant.html?id=3',
                '/restaurant.html?id=4',
                '/restaurant.html?id=5',
                '/restaurant.html?id=6',
                '/restaurant.html?id=7',
                '/restaurant.html?id=8',
                '/restaurant.html?id=9',
                '/restaurant.html?id=10',
                '/css/styles.css',
                '/js/main.js',
                '/js/dbhelper.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/sw.js'
            ]).catch(error => {
                console.log('oh noo, caches open failed so horribly I want to cry..' + error);
            });
        })
    );
});




self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
          return caches.open(staticCacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        }).catch(function(response) {
            console.log('puuuups', response)
        });
      })
    );
  });