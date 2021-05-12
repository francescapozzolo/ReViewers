const joi = require('joi');

const validador = (req, res, next) => {
    const schema = joi.object({
        
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