describe(`API Automation`, function () {

    const endpoint = Cypress.env(`api_endpoint`);
    const token = Cypress.env(`token`);
    const pathParams = "public/v2/users";

    it(`DELETE Call`, function () {


        cy.request({
            url: endpoint + pathParams,
            method: `GET`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            // Assertion
            expect(response.status).eq(200);
            expect(response.statusText).eq("OK");

            const id = response.body[0].id;

            cy.request({
                url: endpoint + pathParams + "/" + id,
                method: `DELETE`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                expect(response.status).eq(204);

            })

        })

    })

})