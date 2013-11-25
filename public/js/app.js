'use strict';
// Declare app level module which depends on filters, and services
console.log("app.js");
angular.module('graphOmatic', ['graphOmatic.directives', 'graph-O-matic-services', 'fundoo.services']).
	config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        console.log("graphOmatic module created.");
	$routeProvider.
	  when('/', {templateUrl:'index', controller:MainCtrl}).
      when('/testView', { templateUrl:'testView',controller:ViewCtrl});
	$routeProvider.otherwise({redirectTo:'/'});
	$locationProvider.html5Mode(true);
        console.log("graphOmatic module creation DONE.");
    }]);
