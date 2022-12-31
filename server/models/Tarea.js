
//Las Tareas

const mongoose = require('mongoose'); //Llamada a mongoose
const Schema = mongoose.Schema;      //Creación del Schema

const TareaSchema = new Schema({
    _id: Number,
    titulo: String,
    descripcion: String,
    fecha_inicio: { type: Date, default: Date.now },
    fecha_fin: { type: Date },
    estado: String,
    columna: String,
    panelId: String,
    fileName: String,
    lastUserName: String,
});

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
