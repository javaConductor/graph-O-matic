/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */
/*
<graph-view ng-model="sampleView"  />
 */
function ViewCtrl($scope, view){

	$scope.itemMoved = function(item, x, y){
		console.log("itemMoved");
	};
	$scope._width = 200;
	$scope._height = 200;

	$scope._fullWidth = 400;
	$scope._fullHeight = 200;

	$scope.widthStyle = function(viewItem){
		return {width: viewItem.width() };
	};
	$scope.heightStyle = function(viewItem){
		return 'height:'+viewItem.height()+';';
	};
	$scope.widthAndHeightStyle = function(viewItem){
		return {width: viewItem.width(), height: viewItem.height() };
	};

	$scope.viewItem = {
		item : {id: "item1", itemType:{ id: "it2", name:"Person"} },
		id: "vitem1",
		width: function(){
			return this.showDetails() ? $scope._fullWidth : $scope._width;
		},
		height: function(){
			return this.showDetails() ? $scope._fullHeight : $scope._height;
		},
		_showDetails : true,
		showDetails: function(){
			if (arguments.length > 0){
				$scope.$apply(function(){
					this._showDetails =  ! ! arguments[0];// make bool
				});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 750, y: 150};
		},
		style: function(){
			return {};
		},
		title: function(){
			return "Lee Collins";
		},
		description: function() {
			return "Me, myself, and I";
		},
		image: function(){
			return "/images/stickmanface.jpeg";
		},
		data: function(){
			return [
				{name:"Firstname", value:"Lee"},
				{name:"Lastname", value:"Collins"},
				{name:"Email", value:"you@me.us"},
				{name:"Address", value:"6640 S Vernon Av"},
				{name:"City", value:"Chicago"},
				{name:"State", value:"IL"},
				{name:"Home Phone", value : "7739555589"},
				{name:"Work Phone", value : "7736678236"}
			];
		}
	};
	$scope.viewItem2 = {
		item : {id: "item2", itemType:{ id: "it2", name:"Person"} },
		id: "vitem2",
		width: function(){
			return this.showDetails() ? $scope._fullWidth : $scope._width;
		},
		height: function(){
			return this.showDetails() ? $scope._fullHeight : $scope._height;
		},
		_showDetails : true,
		showDetails: function(){
			if (arguments.length > 0){
				$scope.$apply(function(){
					this._showDetails =  ! ! arguments[0];// make bool
				});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 150, y: 150};
		},
		style: function(){
			return {};
		},
		title: function(){
			return "David Collins";
		},
		description: function() {
			return "Mini Me";
		},
		image: function(){
			return "/images/stickmanface.jpeg";
		},
		data: function(){
			return [
				{name:"Firstname", value:"David"},
				{name:"Lastname", value:"Collins"},
				{name:"Email", value:"you@me.us"},
				{name:"Address", value:"6640 S Vernon Av"},
				{name:"City", value:"Chicago"},
				{name:"State", value:"IL"},
				{name:"Game Phone", value : "7739555589"},
				{name:"Work Phone", value : "7736678236"},
				{name:"Game1", value : "ROBLOX"},
				{name:"Game2", value : "StickPage.com"},
				{name:"Game3", value : "Mind Craft"}
			];
		}
	};
	$scope.view = {
		name:"Test View",
		id:"testview1",
		items:[$scope.viewItem, $scope.viewItem2],
		relationships:[],
		currentView: $scope.viewItem2
	}
}

ViewCtrl.$inject = [ "$scope", "View" ];
