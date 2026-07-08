const { faker } = require("@faker-js/faker")

const AJV = require(`ajv`);
const ajv = new AJV({allErrors:true});

describe(`API Automation`, function () {


    ///API configs
    const endpoint = Cypress.env(`api_endpoint`);
    const pathParams = `public/v2/users/`;
    const token = Cypress.env(`token`);

    // faker test data
    const userName = "Updated Name";
    const mailId = faker.internet.email();
    const gender = faker.person.sex();
    const status = faker.helpers.arrayElement(['active', 'inactive']);

    //request body
    const payload = { "name": userName, "email": mailId, "gender": gender, "status": status }

    it(`PUT Call with Schema Validation`, function () {

        cy.request({

            url: endpoint + pathParams,
            method: `GET`,
            headers: {
                "Authorization": "Bearer " + token,
                "Conten-Type": "application/json"
            }
        }).then(function (response) {


            console.group("Before PUT operation::");
            console.log(response.body[0])

            console.groupEnd();
            const singleUser = response.body[0];
            const id = response.body[0].id;

            cy.request({
                url: endpoint + pathParams + id,
                method: `PUT`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: payload
            }).then(function (response) {

                console.group("After PUT operation::");
                console.log(response.body)

                console.groupEnd();

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

})