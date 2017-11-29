var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  useragent = require('express-useragent'),
  methodOverride = require('method-override'),
  device = require('express-device'),
  app = express();

require('mongoose').connect('mongodb://localhost/semillero');


app.use(device.capture());
app.use(useragent.express());

device.enableViewRouting(app);
device.enableDeviceHelpers(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(methodOverride ('multipart/form-data'));

app.set("view engine", "jade");

app.use('/static',express.static(path.join(__dirname, '/node_modules')));

app.use('/', require('./controladores/usuario'));
app.use('/barco', require('./controladores/barco'));




app.listen(3000);
