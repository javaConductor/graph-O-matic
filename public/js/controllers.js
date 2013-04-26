'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	$scope.title = "Graph O Matic (c)";
}


function MainViewCtrl($scope, View) {

    $scope.title = "Graph O Matic (c)";
}

MainViewCtrl.$inject=['scope','View']
