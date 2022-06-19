module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
	  on('before:browser:launch', (browser, launchOptions) => {
   if (browser.family === 'chromium') {
     launchOptions.preferences.default.intl = { accept_languages: 'de-GE' };
     return launchOptions;
   }
});
    },
  },
};
