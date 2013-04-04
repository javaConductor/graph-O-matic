'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	$scope.title = "Graph O Matic (c)";

	$scope.relationships = [{
		id: 123,
		name: "Father",
		itemList: [],
		: {
			  baseRelationshipId : 234
		}


	},{}];

	$scope.testItemType = {
		name : "Person",
		category: 'People',
		"titleFunc": function(item ){
			return item.name;
		},
		"imageFunc": function(item ){
			return item.viewitem.name;
		},
		"constraints": [ ]
	};

	$scope.testViewItems = [{
		itemId : 123,
		color: "0000ff",
		texture: "/textures/ABC.jpg"
	},{

	}];

	$scope.testItems = [

			{id: 123, position: [50,50], viewItem : {color: '0000FF', texture: '/textures/XYZ.jpg' }, itemType: {category: 'cat123'} },
			{id: 2123, position: [150,150], viewItem : {color: '00FF00', texture: '/textures/ABC.jpg' }, itemType: {category: 'cat345'} }
		]

}
            /*

             Itemtype.titleFunc: returns a function that can get the title for the items
             Itemtype.imageFunc: returns a function that produces a link to an image (may be a stock image if none specified)


             */
