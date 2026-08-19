const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Toolshop Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotOnRunFailure: true,
  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 20000,
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      require('cypress-mochawesome-reporter/plugin')(on)

      on('after:spec', (_spec, results) => {
        if (!results || !results.video) {
          return
        }

        const failed = results.tests.some((test) =>
          test.attempts.some((attempt) => attempt.state === 'failed'),
        )

        if (!failed) {
          fs.unlinkSync(results.video)
        }
      })

      return config
    },
  },
})
