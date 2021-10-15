const staticCacheName = 'site-static'
const dynamicCache = 'site-static-v1'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v109/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/pages/fallback.html'

]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

self.addEventListener('install', evt => {
    // console.log('service work has been installed')
    evt.waitUntil (caches.open(staticCacheName).then(cache => {
        console.log('cache shell asset')
        cache.addAll(assets)
    }))
    
})

self.addEventListener('activate', evt => {
    // console.log('service work has been activated')
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCache)
                .map(key => caches.delete(key))
                )
        }
            
        )
    )
})

self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt)
    // evt.respondWith(
    //     caches.match(evt.request).then(cacheRes => {
    //         return cacheRes || fetch(evt.request).then(fetchRes => {
    //             return caches.open(dynamicCache).then(cache => {
    //                 cache.put(evt.request.url, fetchRes.clone())
    //                 limitCacheSize(dynamicCache, 15)
    //                 return fetchRes
    //             })
    //         })
    //     }).catch(() => {
    //         if(evt.request.url.indexOf('.html') > -1) {
    //             return caches.match('/pages/fallback.html')
    //         }
            
    //     })
    //     )
})