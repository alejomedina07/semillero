var mongoose = require ('mongoose'),
    Schema =  mongoose.Schema;

var UsuarioSchema = new Schema ({
  nombre:String,
  identificacion:String,
  apellido:String,
  telefono:String,
  direccion:String,
  tipo:String
});

module.exports =  mongoose.model('Usuario', UsuarioSchema);
