var _= require('underscore'),
    debug=require("debug")("SE:modelos:General"),
    General = function(){
    };

General.prototype.ESTADO_ACTIVO = 'activo';
General.prototype.ESTADO_INACTIVO = 'inactivo';
General.prototype.ESTADO_PENDIENTE = 'pendiente';

General.prototype.ESTADO_EN_PROCESO = 'en proceso';
General.prototype.ESTADO_ENTREGADO = 'entregado';
General.prototype.ESTADO_ENVIADO = 'enviado';

General.prototype.dameEstadoActivoInactivo = function(){
  return [this.ESTADO_ACTIVO, this.ESTADO_INACTIVO];
};

General.prototype.dameEstadoActivoInactivoPendiente = function(){
  return [this.ESTADO_ACTIVO, this.ESTADO_INACTIVO, this.ESTADO_PENDIENTE];
};

General.prototype.generarAuditoria = function(req){
  debug('req');
  debug(req.device);
  return {
		dispositivo: req.device.type,
		metodo: req.method,
		fecha: (new Date()).toISOString(),
		ip: req.ip,
		navegador: req.useragent.browser,
		sistemaOperativo:req.useragent.os
	};
};

module.exports = new General();
