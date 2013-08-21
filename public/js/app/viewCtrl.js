/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */
/*
<graph-view ng-model="sampleView"  />
 */
function ViewCtrl(scope, location, view){
	console.log("ViewCtrl.link(("+scope.$id+")): Creating.");

    // get the viewId from the location
    // try to fetch the view
    // if found, set the scope.view to the view
    // if not found, redir to the view Not Found page
	console.log("ViewCtrl.link(("+scope.$id+")): Created.");

}

ViewCtrl.$inject = [ "$scope","$location", "View" ];
