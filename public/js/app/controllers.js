    'use strict';

/* Controllers */
console.log("controllers.js");
function WorldCtrl($scope, World, eventProcessor,  constants) {

	$scope.title = "Graph O Matic (c) 2012-2013";
console.log("WorldCtrl()");

	/// get all the views
    $scope.viewList = [];
    $scope.openViewList = [];
    $scope.currentView=null;

	// get all the categories (item,relationship)
	$scope.categories = [];

	//edit fields
	$scope.searchText = "";

	// getting back Items
	$scope.searchResults = [];

	$scope.footerInfo = {
		poweredBy: ["nodejs", "d3js", "mongoDB"]
	};
    $scope.newViews = 0;

    $scope.getAllViews = function(){
        World.views(function(err, views){
            if(!err){
                $scope.$apply(function(){
                    $scope.viewList = views;
                    if( views && views.length > 0 )
                        $scope.openViewList = [views[ 0 ]];
                })
            }else{
                //report error
                console.error("Error getting all views: "+ err);
                $scope.addErrorMessage("Error opening view: "+ err);
            }
        })
    };

    $scope.openView = function(viewId){
        eventProcessor.emit(constants.events.OpenViewEvent, [viewId]);
	};

    $scope.addErrorMessage = function(msg){
    };

    $scope.newView = function newView(){
        var viewname = prompt("View Name?", "new-view"+($scope.viewList ?$scope.viewList.length: 1 ));
        var viewtype = prompt("View Type?", "default.built-in.baseVT");

       // var d = q.defer();
        //alert("Should b creating a new view:"+viewname + ", "+ viewtype);
        // do popup to get name.
        World.createView( {
            viewName:viewname,
            viewType: viewtype})
            .then(function(v){
                /// do some stuff when it is created.
               console.log("controller.newView:"+JSON.stringify(v));
//               console.log("controller.error:"+JSON.stringify(v));
                $scope.viewList.push(v);
                /// make it the current View
                $scope.openView( v.id );
            });
    };

    $scope.getAllViews();
}

WorldCtrl.$inject=['$scope', 'GraphWorld', "ContextEventProcessor", "ConstantsService" ];

function MainCtrl($scope){

}

MainCtrl.$inject=[ '$scope' ];
