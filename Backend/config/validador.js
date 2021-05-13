const joi = require('joi');

const validarRegistro = (req, res, next) => {
    const schema = joi.object({
        nombre: joi.string().trim().required().min(2).message("El nombre ingresado es invalido").max(20).pattern(new RegExp('[a-zA-Z]$')).message("El nombre no puede contener numeros"),
        apellido: joi.string().trim().required().min(2).message("El apellido ingresado es invalido").max(20).pattern(new RegExp('a-zA-Z$')).message("El apellido no puede contener numeros"),
        mail: joi.string().trim().required().email().message("El mail ingresado es invalido"),
        clave: joi.string().trim().required().alphanum().min(6).message("La contraseña debe contener 6 caracteres entre numeros y letras")
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