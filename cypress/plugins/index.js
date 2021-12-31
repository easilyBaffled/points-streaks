// / <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const path = require( "path" );
const fs = require( "fs" );
const { startDevServer } = require( "@cypress/vite-dev-server" );

function mdPreprocessor( file ) {
    const { filePath, outputPath, shouldWatch } = file;
    console.log({ filePath, outputPath, shouldWatch });
    // we need to output something
    fs.writeFileSync( outputPath, "", "utf8" );
    return outputPath;
}

module.exports = ( on, config ) => {
    require( "@cypress/code-coverage/task" )( on, config );
    // on( "file:preprocessor", mdPreprocessor );
    on( "dev-server:start", ( options ) => {
        try {
            return startDevServer({
                options,
                viteConfig: {
                    configFile: path.resolve(
                        __dirname,
                        "..",
                        "..",
                        "vite.config.js"
                    ),
                    logLevel: "error",
                    mode:     "test"
                }
            });
        } catch ( e ) {
            console.error( e );
        }
    });
    return config;
};
