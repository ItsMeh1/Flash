"use strict";

// Initialize Scramjet ONLY (no BareMux, no forms)

const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});

scramjet.init();

// Register service worker (needed for proxying)
async function initSW() {
	if ("serviceWorker" in navigator) {
		try {
			await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
			console.log("Service Worker registered");
		} catch (err) {
			console.error("SW registration failed:", err);
		}
	}
}

initSW();
