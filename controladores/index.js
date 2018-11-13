var express = require('express'),
  debug=require("debug")("Semillero:usuario"),
  ObjectId = require('mongoose').Types.ObjectId,
  router = express.Router();

router.get("/", function(req, res) {
  res.render("index");
});

module.exports = router;
