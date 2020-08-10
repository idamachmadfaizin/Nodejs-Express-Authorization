const Joi = require('@hapi/joi');


const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(128),
        email: Joi.string().required().email().min(8).max(256),
        password: Joi.string().required().min(8).max(256),
        repeat_password: Joi.ref('password')
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email().min(8).max(256),
        password: Joi.string().required().min(8).max(256)
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;