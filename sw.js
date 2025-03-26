const cacheName = 'movement-picker-v2';
const filesToCache = [
  '/movement-picker/',
  '/movement-picker/index.html',
  '/movement-picker/manifest.json',
  '/movement-picker/icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
