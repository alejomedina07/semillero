var mongoose = require ('mongoose'),
    Schema =  mongoose.Schema;

var ClienteSchema = new Schema ({
  nombre:String,
  identificacion:String,
  apellido:String,
  telefono:String,
  direccion:String,
  licencia:String,
  barcos:[Schema.Types.ObjectId],
  tipo:String
});

module.exports =  mongoose.model('Cliente', ClienteSchema);
