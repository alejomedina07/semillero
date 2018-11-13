// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'static/templates/home.html',
			controller 	: 'mainController'
		})
		.when('/acerca', {
			templateUrl : 'static/templates/acerca.html',
			controller 	: 'aboutController'
		})
		.when('/contacto', {
			templateUrl : 'static/templates/contacto.html',
			controller 	: 'contactController'
		})
		.when('/error', {
			templateUrl : 'static/templates/error.html',
		})
		.otherwise({
			redirectTo: '/error'
		});
});

angularRoutingApp.controller('mainController', function($scope) {
	$scope.message = 'Hola, Mundo! página de inicio';
});

angularRoutingApp.controller('aboutController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});
