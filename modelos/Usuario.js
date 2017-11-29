var mongoose = require ('mongoose'),
    Schema =  mongoose.Schema;

var Usuario = new Schema ({
  nombre:String,
  identificacion:String,
  apellido:String,
  telefono:String,
  direccion:String,
  carrera:String,
  correo:String,
  auditorias:[{
    dispositivo: String,
		metodo: String,
		fecha: Date,
		ip: String,
		navegador: String,
		sistemaOperativo: String,
  }]
});


module.exports =  mongoose.model('Usuario', Usuario);
