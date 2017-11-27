var mongoose = require ('mongoose'),
    Schema =  mongoose.Schema;

var BarcoSchema = new Schema ({
  nombre:String,
  numeroMatricula:String,
  numeroAmarre:String,
  cuota:String,
  salidas:[{
    numeroMatricula:String,
    capitan:Schema.Types.ObjectId,
    fecha:String,
    hora:String,
    destino:String,
  }]
});

module.exports =  mongoose.model('Barco', BarcoSchema);
