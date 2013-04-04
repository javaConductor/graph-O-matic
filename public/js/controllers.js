'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	$scope.title = "Graph O Matic (c)";
	$scope.viewOptions = {
		items : [
			{id: 123, position: [50,50], viewItem : {color: '0000FF', texture: '/textures/XYZ.jpg' }, itemType: {category: 'cat123'} },
			{id: 2123, position: [150,150], viewItem : {color: '00FF00', texture: '/textures/ABC.jpg' }, itemType: {category: 'cat345'} }
		]
	};

}

