// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
      
//     },
//   },
// });
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can add custom tasks here if needed
    },
    baseUrl: 'http://localhost:4200',  // Make sure your Angular app runs here
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.ts'
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true
  },

  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  video: false
});
