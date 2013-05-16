'use strict';


// Declare app level module which depends on filters, and services
angular.module('graphOmatic', ['graphOmatic.directives', 'GraphOMaticServices']).
	config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.
	  when('/', {templateUrl:'index', controller:GraphOMaticCtrl}).
	  when('/testViewItem', {templateUrl:'testViewItem', controller:ViewItemCtrl}).
	  when('/testView', { controller:ViewCtrl});
	$routeProvider.otherwise({redirectTo:'/'});
	$locationProvider.html5Mode(true);
}]);
