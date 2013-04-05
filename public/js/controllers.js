'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	$scope.title = "Graph O Matic (c)";

	$scope.relationshipCategories=[
		{id: 123, name:"Family"},
		{id: 456, name:"Software Development"},
		{id: 768, name:"Education"}

	];
	   // must support hybrid relationship where:
	/*
	when we have a item-to-item relationship and we want a different relationship depending on some condition.
	example:  functionA -> 'calls' -> functionA would change from the 'calls' relationship to 'recursive' when
	both start and end nodes are the same item.
	then the 'recursive' relationship can be drawn differently.
	 */
	$scope.relationshipTypes = [{
		id: 123,
		name: "ParentOf",
		itemList: [],
		oppositeRelationshipId: 124,
		reversible: false,
		category: 123,
		constraints:{

		}
		},{
		id: 124,
		name: "ChildOf",
		itemList: [],
		oppositeRelationshipId: 123,
		reversible: false
		},{
		id: 125,
		name: "SiblingTo",
		itemList: [],
		reversible: true,
		category: 123
	},{
		id: 124,
		name: "Brother",
		itemList: [],
		parent: 125,
		reversible: false
	},{
		id: 125,
		name: "SiblingTo",
		itemList: [],
		reversible: true,
		category: 123
	},{
		id: 126,
		name: "Attends",
		itemList: [],
		reversible: true,
		category: 123,
		timeBoxed:{
			start: null,
			end: null}
	}];

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
