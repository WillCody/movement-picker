const cacheName = 'movement-picker-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // <- Force immediate activation
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/movement-picker/',
        '/movement-picker/index.html',
        '/movement-picker/manifest.json',
        '/movement-picker/icon-192.png'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  clients.claim(); // <- Take over any open tabs
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
