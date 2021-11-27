const joi = require("joi")

const registerValidation = (data) => {
    const registerSchema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()

    })
    return registerSchema.validate(data)
}

const loginValidation = (data) => {
    const registerSchema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()

    })
    return registerSchema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation