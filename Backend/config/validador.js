const joi = require('joi');

const validarRegistro = (req, res, next) => {
    const schema = joi.object({
        nombre: 
        joi.string()
        .trim()
        .required()
        .min(2).message("The first name length must be superior of 1")
        .pattern(new RegExp(/^[a-zA-Z]+$/)).message("The first name only can contain letters"),

        apellido:
        joi.string()
        .trim()
        .required()
        .min(2).message("The last name length must be superior of 1")
        .pattern(new RegExp(/^[a-zA-Z]+$/)).message("The last name only can contain letters"),

        mail:
        joi.string()
        .trim()
        .required()
        .email().message("The email format is invalid"),

        imagen:
        joi.string()
        .trim()
        .required()
        .min(5).message("The url picture is invalid"),

        clave:
        joi.string()
        .alphanum()
        .trim()
        .required()
        .min(5).message("The password must be superior of 4")
    })
    const validacion = schema.validate(req.body, {abortEarly: false});

    if(validacion.error) {
        // console.log(validacion)
        return res.json({
            success: false,
            errores: validacion.error
        })
    }
    next();
}

module.exports = validarRegistro;