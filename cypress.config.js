const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

      await require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor',   createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      
      return config;
    },
  },
});

