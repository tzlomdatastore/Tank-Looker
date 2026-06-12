const CACHE_NAME = 'fuel-tank-v2.0'; // Version ကို v2.0 လို့ ပြောင်းလိုက်ပါတယ်
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // ကုဒ်အသစ်ကို ချက်ချင်း အသက်ဝင်စေဖို့
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // ဗားရှင်းအဟောင်းက အမှိုက်တွေကို ဖျက်ပစ်ပါတယ်
          }
        })
      );
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
