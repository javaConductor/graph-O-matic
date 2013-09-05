'use strict';

/* Controllers */

function GraphOMaticCtrl($scope, World, eventProcessor) {

	$scope.title = "Graph O Matic (c) 2012";

    var tmp = {
        name: "View 1",
        items: [],
        viewOptions:{}
    };
	/// get all the views
	$scope.views = [tmp];
    $scope.currentView=null;

	// get all the categories (item,relationship)
	$scope.relationshipCategories = [];
	$scope.itemCategories = [];

	//edit fields
	$scope.searchText = "";

	// getting back Items
	$scope.searchResults = [];

	$scope.footerInfo = {
		poweredBy: ["nodejs", "mongoDB"]
	};

    var viewTemplate =
        "<graphItem ng-repeat='item in viewData.items' id='item.id' ng-model='item' data-item-id='{{item.id}}' >" +
        "</graphItem>" +
        "<graphRelationship ng-repeat='relationship in viewData.relationships'  ng-model='relationship' data-item-id='{{relationship.id}}' >" +
        "</graphItem>";

    $scope.getAllViews = function(){
        World.views(function(err,views){
            if(!err){
                $scope.views = views;
                if(views && views.length>0)
                    $scope.currentView = views[0];
            }else{
                //report error
            }
        })
    };

    $scope.open = function(viewId){
		World.getView(viewId, function(err, viewData){
            //// fireevent
            eventProcessor.emit(constants.events.OpenViewEvent, [viewData]);
        });
	}
}

GraphOMaticCtrl.$inject=['$scope', 'GraphWorld', "ContextEventProcessor" ]

function MainViewCtrl($scope, View ) {
    $scope.title = "Graph O Matic (c)";

	/// get all the views
}

MainViewCtrl.$inject=['scope','View']
