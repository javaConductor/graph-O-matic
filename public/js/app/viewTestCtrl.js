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
	console.log("ViewCtrl.link(("+$scope.$id+")): Creating.");

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

	$scope.vi_vitem1 = {
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
				//$scope.$apply(function(){
					this._showDetails =  ! ! arguments[0];// make bool
			//	});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 750, y: 550};
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

	$scope.vi_vitem2 = {
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
				//$scope.$apply(function(){
				this._showDetails =  ! ! arguments[0];// make bool
				//});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 0, y: 0};
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
	$scope.vi_vitem3 = {
		item : {id: "item3", itemType:{ id: "it2", name:"Person"} },
		id: "vitem3",
		width: function(){
			return this.showDetails() ? $scope._fullWidth : $scope._width;
		},
		height: function(){
			return this.showDetails() ? $scope._fullHeight : $scope._height;
		},
		_showDetails : true,
		showDetails: function(){
			if (arguments.length > 0){
				//$scope.$apply(function(){
				this._showDetails =  ! ! arguments[0];// make bool
				//});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 850, y: 150};
		},
		style: function(){
			return {};
		},
		title: function(){
			return "Ruby V. Collins";
		},
		description: function() {
			return "Mom";
		},
		image: function(){
			return "/images/stickmanface.jpeg";
		},
		data: function(){
			return [
				{name:"Firstname", value:"Ruby"},
				{name:"Lastname", value:"Collins"},
				{name:"Email", value:"mom@me.us"},
				{name:"Address", value:"11302 S Normal Av"},
				{name:"City", value:"Chicago"},
				{name:"State", value:"IL"},
				{name:"Home Phone", value : "7738215589"},
				{name:"Work Phone", value : "7736672626"}
			];
		}
	};

	var relationship = {
		id: 'rel1',
		to: 'vitem2',
		from: 'vitem3',
		type: {
			lineStyle : function() {
				return "stroke: white; stroke-width: 3;";
			},
			labelStyle : function() {
				return "stroke: red; stroke-width: 3";
			}
		},
		data: function(){
			return {};
		}
	};

	var relationship2 = {
		id: 'rel2',
		to: 'vitem1',
		from: 'vitem3',
		type: {
			lineStyle : function() {
				return "stroke: white; stroke-width: 3;";
			},
			labelStyle : function() {
				return "stroke: red; stroke-width: 3";
			}
		},
		data: function(){
			return {};
		}
	};

	$scope.rel_rel1 = relationship;
	$scope.rel_rel2 = relationship2;
	$scope.view = {
		name:"Test View",
		id:"testview1",
		items:[$scope.vi_vitem2, $scope.vi_vitem3,$scope.vi_vitem1],
		relationships:[$scope.rel_rel1,$scope.rel_rel2],
		currentView: $scope.vi_vitem2
	}
	console.log("ViewCtrl.link(("+$scope.$id+")): Created.");

}

ViewCtrl.$inject = [ "$scope", "View" ];
