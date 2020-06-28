const STATIC_CACHE_NAME = "site-static-v5";
const ASSETS = [
	"/",
	"/index.html",
	"/js/app.js",
	"/js/ui.js",
	"/js/materialize.min.js",
	"/css/styles.css",
	"/css/materialize.min.css",
	"/img/dish.png",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// install service worker
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(STATIC_CACHE_NAME).then((cache) => {
			console.log("Installing and Caching all the assets");
			cache.addAll(ASSETS);
		})
	);
});

// activate service worker
self.addEventListener("activate", (e) => {
	console.log("Activating the app without skiping");
	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => {
						// These will return all the old cache_keys
						return key != STATIC_CACHE_NAME;
					})
					.map((key) => {
						// From that old caches it will loop through them and delete it from `caches` object
						return caches.delete(key);
					})
			);
		})
	);
});

// fetch service worker
self.addEventListener("fetch", (e) => {
	// console.log("Service worker has been fetched", e);
	e.respondWith(
		caches
			.match(e.request)
			.then((cacheRes) => {
				return cacheRes || fetch(e.request);
			})
			.catch()
	);
});
