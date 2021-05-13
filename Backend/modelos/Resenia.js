const mongoose = require('mongoose')
const {appConfig} = require('../config/config')
const reseniaSchema = new mongoose.Schema({
    categoria: {type: String, required: true},
    subcategoria: {type: String, required: true},
    titulo: {type: String, required: true},
    subtitulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen: [{type: String, required: true}],
    autor: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    usuariosFav: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    valoraciones: [{idUsuario: {type: mongoose.Types.ObjectId, ref: 'user'}, valoracion: {type: Number, min: 1, max: 5}}],
    tags: [String],
    proContra:{pro:[String], contra:[String]},
    comentarios: [{
        usuarioId: {
            type: mongoose.Types.ObjectId, ref: 'user',
            required: true
        },
        mensaje: {
            type: String,
            required: true
        }
    }],
})

reseniaSchema.methods.setImagen = function setImagen(filename){
    const {host, port} = appConfig
    this.imagen = `${host}:${port}/public/${filename}`
}



const Resenia = mongoose.model('review', reseniaSchema)

module.exports = Resenia