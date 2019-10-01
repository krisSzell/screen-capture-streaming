// These utils come from: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Firefox 1.0+
export const isFirefox = () => typeof InstallTrigger !== "undefined";

// Chrome 1 - 71
export const isChrome = () =>
	!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
