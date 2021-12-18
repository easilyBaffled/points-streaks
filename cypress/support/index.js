// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
console.tap = (v, ...rest) => (console.log(v, ...rest), v);
// Alternatively you can use CommonJS syntax:
// require('./commands')

// beforeEach((...args) => {});
Cypress.on("uncaught:exception", (err) => {
    // returning false here prevents Cypress from
    // failing the test
    console.error(err);
    return false;
});

cy.clean = ([name]) => name.replace(/^(\s+)/gm, "");
