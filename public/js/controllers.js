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


	$scope.open = function(viewId){

		World.getView(viewId, function(err, viewData){
			var pane = {viewId:viewData, title:viewData.name, templateUrl:"view.html"}
			//// add pane to viewTabList after making sure its not there already
		});
	}

}


function MainViewCtrl($scope, View) {
    $scope.title = "Graph O Matic (c)";

	/// get all the views
}

MainViewCtrl.$inject=['scope','View']
