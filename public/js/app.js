'use strict';


// Declare app level module which depends on filters, and services
angular.module('graphOmatic', ['graphOmatic.directives']).
	config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {templateUrl:'index', controller:AppCtrl});
	$routeProvider.otherwise({redirectTo:'/'});
	$locationProvider.html5Mode(true);
}]);
