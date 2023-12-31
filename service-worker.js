self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open('v1')
      .then((cache) =>
        cache.addAll([
          './',
          './index.html',
        ]),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })(),
  );
});
