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

beforeEach((...args) => {
    cy.intercept("https://firestore.googleapis.com/**", () =>);

	fetch("https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?database=projects%2Fpoints-streaks%2Fdatabases%2F(default)&gsessionid=QhbrREyifAHBXRH2DoRsSeWtCQOWs-Z__eLgMkp0U2c&VER=8&RID=rpc&SID=9m5fl5s_g9O6vGfb1_UIsA&CI=0&AID=0&TYPE=xmlhttp&zx=t0pmh6igplwe&t=1", {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"macOS\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "cross-site",
			"x-client-data": "CKO1yQEIiLbJAQiktskBCMS2yQEIqZ3KAQin+csBCLX/ywEI5oTMAQi1hcwBCMuJzAEI0o/MARiMnssB"
		},
		"referrer": "http://localhost:59509/",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors",
		"credentials": "omit"
	});
});
