const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    mail: {type: String, required: true},
    clave: {type: String, required: true},
    imagen: {type: String, required: true},
    intereses: [{type: String, required: true}],
    rol: {type: String, required:true, default: "lector"},
    favoritos: [{type: mongoose.Types.ObjectId, ref: 'resenia'}],
    seguidores: [{type: mongoose.Types.ObjectId, ref: 'user'}],
})

const Usuario = mongoose.model('user', usuarioSchema)

module.exports = Usuario