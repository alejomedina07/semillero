var express = require('express'),
  debug=require("debug")("NH:controllers:adminCodigos"),
  ObjectId = require('mongoose').Types.ObjectId,
  Barco = require('../modelos/Barco'),
  router = express.Router();


router.get("/", function(req, res) {
  res.render("barco");
});

router.post("/", function(req, res) {
  debug(req.body);
  var barco = new Barco(req.body);
  barco.save()
  .then(function(nuevo) {
    debug('prueba');
    res.redirect('/barco/lista-barcos');
  })
  .catch(function (error) {

  });
});

router.get("/lista-barcos", function(req, res) {
  Barco.find()
  .then(function(lista) {
    res.render("lista-barco", {barcos:lista});
  })
  .catch(function (error) {

  });
});

router.get('/editar-barco/:id', function(req, res) {
  Barco.findById(req.params.id)
  .then(function(barco) {
    res.render('barco', {
      barco: barco,
    });
  })
  .catch(function(error) {
    res.redirect('/');
  });
});

router.get('/eliminar-barco/:id', function(req, res) {
  Barco.remove({_id: ObjectId(req.params.id)})
  .then(function(barco) {
    res.redirect('/barco/lista-barcos' );
  })
  .catch(function(error) {
    res.redirect('/admin/baners/');
  });
});



router.post('/editar-barco/:id', function(req, res) {
  Barco.findById(req.params.id)
  .then(function(doc) {
    doc.nombre = req.body.nombre;
    doc.numeroMatricula = req.body.numeroMatricula;
    doc.numeroAmarre = req.body.numeroAmarre;
    doc.cuota = req.body.cuota;
    return doc.save();
  })
  .then(function(doc) {
    res.redirect('/barco/lista-barcos' );
  })
  .catch(function(error){
    res.redirect('/admin/baners/' );
  });
});












module.exports = router;
