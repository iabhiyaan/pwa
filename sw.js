// install service worker
self.addEventListener("install", (e) => {
	console.log("Service worker has been installed");
});

// activate service worker
self.addEventListener("activate", (e) => {
	console.log("Service worker has been activated");
});

// fetch service worker
self.addEventListener("fetch", (e) => {
	console.log("Service worker has been fetched", e);
});
