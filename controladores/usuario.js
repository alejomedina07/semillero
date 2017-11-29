var express = require('express'),
  debug=require("debug")("SE:controlador:usuario"),
  ObjectId = require('mongoose').Types.ObjectId,
  usuario = require('../modelos/Usuario'),
  general = require('../modelos/General'),
  Barco = require('../modelos/Barco'),
  router = express.Router();


router.get("/", function(req, res) {
  res.render("index");
});


router.get("/lista-clientes", function(req, res) {
  usuario.find()
  .then(function(lista) {
    debug('prueba');
    debug(lista);
    res.render("lista", {clientes:lista});
  })
  .catch(function (error) {

  });
});

// router.get("/editar-cliente/:id", function(req, res) {
//   debug(req.params.id);
//   res.render("prueba");
// });

router.get('/editar-cliente/:id', function(req, res) {
  usuario.findById(req.params.id)
  .then(function(cliente) {
    res.render('index', {
      cliente: cliente,
    });
  })
  .catch(function(error) {
    res.redirect('/admin/baners/');
  });
});

router.get('/eliminar-cliente/:id', function(req, res) {
  usuario.remove({_id: ObjectId(req.params.id)})
  .then(function(cliente) {
    res.redirect('/lista-clientes' );
  })
  .catch(function(error) {
    res.redirect('/admin/baners/');
  });
});

router.post("/", function(req, res) {
  debug('post ');
  debug(general.generarAuditoria(req));
  req.body.auditorias = general.generarAuditoria(req);
  var cliente = new usuario(req.body);
  console.log(cliente);
  cliente.save()
  .then(function(nuevo) {
    res.redirect('/lista-clientes' );
  })
  .catch(function (error) {

  });
});

router.post('/editar-cliente/:id', function(req, res) {
  usuario.findById(req.params.id)
  .then(function(doc) {
    doc.nombre = req.body.nombre;
    doc.apellido = req.body.apellido;
    doc.identificacion = req.body.identificacion;
    doc.telefono = req.body.telefono;
    doc.direccion = req.body.direccion;
    doc.tipo = req.body.tipo;
    doc.licencia = req.body.licencia;
    return doc.save();
  })
  .then(function(doc) {
    res.redirect('/lista-clientes' );
  })
  .catch(function(error){
    res.redirect('/admin/baners/' );
  });
});


/*agregar-barco    */



router.get("/agregar-barco/:id", function(req, res) {
  Barco.find()
  .then(function (barcos) {
    res.render("agregarBarco", {idusuario:req.params.id, barcos:barcos});
  })
  .catch(function (error) {

  });
});


router.post("/agregar-barco/:id", function(req, res) {
  usuario.findOne({_id:req.params.id})
  .then(function (doc) {
    doc.barcos.push(req.body.barcos);
    doc.save();
    res.redirect("/lista-clientes");
  })
  .catch(function(error) {

  });
});


router.get("/barcos-de-cliente/:id", function(req, res) {
  var condicionales = [];
  console.log("/barcos-de-cliente/:id");
  condicionales.push({$match:{_id:ObjectId(req.params.id)}});
  condicionales.push({$lookup: {from: 'barcos', localField: 'barcos', foreignField: '_id', as: 'barcos'}});
  usuario.aggregate(condicionales)
  .then(function (cliente) {
    console.log(cliente[0]);
    res.render("barcosusuario", {cliente:cliente[0]});
  })
  .catch(function (error) {
  });
});

/*salidas    */



router.get("/salida/:id", function(req, res) {
  usuario.find({tipo:'capitan'})
  .then(function (capitanes) {
    res.render("salida", {barco:req.params.id, capitanes:capitanes});
  })
  .catch(function (error) {
  });
});

router.get("/lista-de-salidas/:id", function(req, res) {
  var condicionales = [];
  condicionales.push({$match:{_id:ObjectId(req.params.id)}});
  condicionales.push({$unwind: {path:"$salidas", preserveNullAndEmptyArrays:true}});
  condicionales.push({$lookup: {from: 'clientes', localField: 'salidas.capitan', foreignField: '_id', as: 'salidas.capitan'}});
  condicionales.push({$unwind: {path:"$salidas.capitan", preserveNullAndEmptyArrays:true}});
  condicionales.push({$group : {_id:"$_id", nombre:{$first:"$nombre"},numeroMatricula:{$first:"$numeroMatricula"},numeroAmarre:{$first:"$numeroAmarre"},cuota:{$first:"$cuota"},salidas:{$push:"$salidas"}}});
  Barco.aggregate(condicionales)
  .then(function (barco) {
    console.log(barco[0]);
    res.render("listaSalidas", {barco:barco[0]});
  })
  .catch(function (error) {

  });
});



router.post("/salida/:id", function(req, res) {
  console.log('holaaaaaaa req.params.id');
  console.log(req.body);
  Barco.findOne({_id:req.params.id})
  .then(function (doc) {
    console.log(doc);
    doc.salidas.push(req.body);
    doc.save();
    res.redirect("/barco/lista-barcos");
  })
  .catch(function(error) {

  });
});



module.exports = router;
