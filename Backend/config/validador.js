const joi = require('joi');

const validarRegistro = (req, res, next) => {
    const schema = joi.object({
        nombre: 
        joi.string()
        .trim()
        .required()
        .min(2).message("El nombre debe contener mas de dos letras")
        .pattern(new RegExp(/^[a-zA-Z]+$/)).message("El nombre solo puede contener letras"),

        apellido:
        joi.string()
        .trim()
        .required()
        .min(2).message("El apellido debe contener mas de dos letras")
        .pattern(new RegExp(/^[a-zA-Z]+$/)).message("El apellido solo puede contener letras"),

        mail:
        joi.string()
        .trim()
        .required()
        .email().message("El email debe ser valido"),

        imagen:
        joi.string()
        .trim()
        .required()
        .min(5).message("La url debe ser valida"),

        clave:
        joi.string()
        .alphanum()
        .trim()
        .required()
        .min(5).message("La contraseña debe contener al menos 5 letras")
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