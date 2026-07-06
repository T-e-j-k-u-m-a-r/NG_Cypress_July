const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  requestTimeout: 15000,
  responseTimeout: 15000,
  pageLoadTimeout: 15000,
  defaultCommandTimeout: 15000,
  watchForFileChanges: false,
  video:false,
  videosFolder:"cypress/videos",
  screenshotsFolder:"cypress/screenshots",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
  
    },

    env: {
      api_endpoint: "https://gorest.co.in/",
      token: "be735db6b3ce072305f6f0369f3ef7793fe75c35a8b0e4d758be1e81c71297dd",
      ui_app_link: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"

  },
});
