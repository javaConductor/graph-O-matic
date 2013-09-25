'use strict';

/* Controllers */
console.log("controllers.js");
function WorldCtrl($scope, World, eventProcessor) {

	$scope.title = "Graph O Matic (c) 2012";
console.log("WorldCtrl()");
    var tmp = {
        id: "testeroni",
        name: "View 1",
        items: [],
        viewOptions:{}
    };
	/// get all the views
    $scope.viewList = [tmp];
    $scope.openViewList = [tmp];
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

    $scope.getAllViews = function(){
        World.views(function(err,views){
            if(!err){
                $scope.views = views;
                if( views && views.length > 0 )
                    $scope.currentView = views[ 0 ];
            }else{
                //report error
            }
        })
    };

    $scope.openView = function(viewId){
		World.getView(viewId, function(err, viewData){
            //// fireevent
            eventProcessor.emit(constants.events.OpenViewEvent, [viewData]);
        });
	};


    $scope.newView = function newView(){
        alert("Should b creating a new view.");
        World.createView()
    }
}

WorldCtrl.$inject=['$scope', 'GraphWorld', "ContextEventProcessor" ];

function MainCtrl($scope){

}

MainCtrl.$inject=[ '$scope' ];
