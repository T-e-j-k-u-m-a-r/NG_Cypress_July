/// <reference types="Cypress" />

describe('UI Automation', function () {

    const app_url = Cypress.env(`ui_app_link`);

    it(`Launch App`, function () {

        cy.visit(app_url);

        cy.intercept(`https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate`).as(`validateLoginApi`);

        // login
        cy.fixture("loginCredentails").then(function (data) {

            this.data = data;

            cy.get(`input[name="username"]`).should(`be.enabled`).type(this.data.username);
            cy.get(`input[type="password"]`).should(`be.enabled`).type(this.data.password);
            cy.get(`button[type="submit"`).should(`be.enabled`).click();

            // Verify login success
            cy.wait(`@validateLoginApi`).then(function (interception) {
                expect(interception.response.statusCode).eq(302);
            })


            // Verify and print home page url
            cy.url().then(function (url) {
                expect(url).contain(`dashboard`);

                console.log(`APP URL: ` + url)
            })

            //Verify and print app title
            cy.title().then(function (title) {
                console.log(`APP TITLE: ` + title);
            })

        })


    })

})