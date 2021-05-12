const joi = require('joi');

const validador = (req, res, next) => {
    const schema = joi.object({
        nombre: joi.string().trim().required().min(3).max(20).pattern(new RegExp('[a-zA-Z]$')),
        apellido: joi.string().trim().required().min(3).max(20).pattern(new RegExp('a-zA-Z$')),
        mail: joi.string().trim().required().mail(),
        clave: joi.string().trim().required().min(6).alphanum()
    })
    const validacion = schema.validate(req.body, {abortEarly: false});

    if(validacion.error) {
        // console.log(validacion)
        return res.json({
            success: false,
            validatorErrors: validacion.error
        })
    }
    next();
}

module.exports = validador;