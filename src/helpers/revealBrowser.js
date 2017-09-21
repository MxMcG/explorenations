const revealBrowser = () => {
  if (/Trident/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent)) return 'msie';
  else if (/Edge\/[0-9]/.test(navigator.userAgent)) return 'msedge';
  else if (/CriOS/.test(navigator.userAgent)) return 'chromeIOS';
  else if (/Firefox/.test(navigator.userAgent)) return 'firefox';
  else if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) return 'safari';
  else if (/FxiOS/.test(navigator.userAgent)) return 'firefoxIOS';
  return 'chrome';
};

export default revealBrowser;
