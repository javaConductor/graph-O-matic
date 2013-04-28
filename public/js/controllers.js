'use strict';

/* Controllers */

function GraphOMaticCtrl($scope, World) {

	$scope.title = "Graph O Matic (c)";


	/// get all the views
	$scope.views = [];

	// get all the categories (item,relationship)
	$scope.relationshipCategories = [];
	$scope.itemCategories = [];

	//edit fields
	$scope.searchText = "";

	// getting back Items
	$scope.searchResults = [];

	$scope.footerInfo = {
		poweeredBy: ["nodejs", "mongoDB"]
	};

	$scope.viewTabList = [
			{ title:"Some Info page", content:"Info!" }
		];

    var viewTemplate =
        "<graphItem ng-repeat='item in viewData.items' id='item.id' ng-model='item' data-item-id='{{item.id}}' >" +
        "</graphItem>" +
        "<graphRelationship ng-repeat='relationship in viewData.relationships'  ng-model='relationship' data-item-id='{{relationship.id}}' >" +
        "</graphItem>";

	$scope.open = function(viewId){

		World.getView(viewId, function(err, viewData){
			//// add pane to viewTabList after making sure its not there already
            var pane = findViewTab(viewId);
            if( !pane ){
                pane = {viewData:viewData, title:viewData.name, content:viewTemplate};
                $scope.viewTabList.push(pane);
            }

        });
	}

}


function MainViewCtrl($scope, View) {
    $scope.title = "Graph O Matic (c)";

	/// get all the views
}

MainViewCtrl.$inject=['scope','View']
