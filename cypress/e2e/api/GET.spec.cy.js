
const AJV = require(`ajv`);
const ajv = new AJV({ allErrors: true });

describe(`API Automation`, function () {

    const endpoint = Cypress.env(`api_endpoint`);
    const token = Cypress.env(`token`);
    const pathParams = "public/v2/users";

    it(`GET Call with Schema Validation - Get all Users`, function () {

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
            expect(response.body).to.have.length(10);

            // Schema Validation 
            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
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
            }

            const validate = ajv.compile(schema);
            const valid = validate(response.body);

            expect(valid, JSON.stringify(validate.errors)).to.be.true;

        })

    })

    it(`GET Call with Schema Validation - Get single User`, function () {


        cy.request({
            url: endpoint + pathParams,
            method: `GET`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            console.log(response.body[0].id);

            // Assertion
            expect(response.status).eq(200);
            expect(response.statusText).eq("OK");

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
            const valid = validate(response.body[0]);

            expect(valid, JSON.stringify(validate.errors)).to.be.true;

        })


    })

})