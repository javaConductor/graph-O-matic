/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */
/*
<view-list ng-model="viewList"  />
 */
function ViewListCtrl(scope, view, eventProcessor){
	console.log("ViewListCtrl(("+scope.$id+")): Creating.");



    // get the viewId from the location
    // try to fetch the view
    // if found, set the scope.view to the view
    // if not found, redir to the view Not Found page
	console.log("ViewListCtrl(("+scope.$id+")): Created.");


}

ViewListCtrl.$inject = [ "$scope", "GraphView", "ContextEventProcessor" ];
