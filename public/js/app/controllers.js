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
		poweredBy: ["nodejs", "d3js", "mongoDB"]
	};
    $scope.newViews = 0;

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
        var viewname = prompt("View Name?", "new-view");
        var viewtype = prompt("View Type?", "baseRT");

        alert("Should b creating a new view:"+viewname + ", "+ viewtype);
        // do popup to get name.
        World.createView( {
            viewName:viewname,
            viewType: viewtype},
            function(e,v){
            /// do some stuff when it is created.
           console.log("controller.newView:"+JSON.stringify(v));
           console.log("controller.error:"+JSON.stringify(e));
        });
    }
}

WorldCtrl.$inject=['$scope', 'GraphWorld', "ContextEventProcessor" ];

function MainCtrl($scope){

}

MainCtrl.$inject=[ '$scope' ];
