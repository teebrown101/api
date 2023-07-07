const Joi = require("joi");
const { schema } = require("../models/Logs");

const Schema = Joi.object({
    username: Joi.string(),
    sociallogin: Joi.string()
})

const payload = {
    username: "neetish",
    sociallogin: "facebook"
}
const res = schema.validate(payload);
console.log(res.error.message);

//making a validator function which was taking a schema ,which is joi schema
const validator = (schema) => (payload) =>
    schema.validate(payload);


// yup validation for request body instead of joi
const yup = require('yup');

module.exports = yup.object().shape({
    username: yup.string().required().username(),
    sociallogin: yup.array().required(),

});
function validateto(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body);
            next();
        } catch (err) {

        }
    }
}
