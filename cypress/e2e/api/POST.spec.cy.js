
const { faker } = require("@faker-js/faker");
const AJV = require("ajv");

const ajv = new AJV({ allErrors: true });

describe(`API Automation`, function () {

    // request details from config file
    const endpoint = Cypress.env(`api_endpoint`);
    const token = Cypress.env(`token`);
    const pathParams = "public/v2/users";

    // faker test data
    const userName = faker.internet.username();
    const mailId = faker.internet.email();
    const gender = faker.person.sex();
    const status = faker.helpers.arrayElement(['active', 'inactive']);


    //request body
    const payload = { "name": userName, "email": mailId, "gender": gender, "status": status }


    it(`POST call with Schema Validation`, function () {


        cy.request({

            url: endpoint + pathParams,
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: payload

        }).then(function (response) {

            // Assertions
            expect(response.status).eq(201);
            expect(response.statusText).eq("Created");

            // Response body validation
            expect(response.body.name).eq(userName);
            expect(response.body.email).eq(mailId);
            expect(response.body.gender).eq(gender);
            expect(response.body.status).eq(status);

            // Schema Validation
            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number"
                    },
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "gender": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    }
                },
                "required": [
                    "id",
                    "name",
                    "email",
                    "gender",
                    "status"
                ]
            }

            const validate = ajv.compile(schema);
            const valid = validate(response.body);

            expect(valid, JSON.stringify(validate.errors)).to.be.true;

        })


    })

})