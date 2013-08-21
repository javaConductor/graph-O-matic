/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */
/*
<graph-view ng-model="sampleView"  />
 */
function RelationshipCtrl($scope, view){
	console.log("RelationshipCtrl.link(("+$scope.$id+")): Creating.");

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

	var  viewItem = {
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
	var viewItem2 = {
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
	var viewItem3 = {
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
				$scope.$apply(function(){
					this._showDetails =  ! ! arguments[0];// make bool
				});
			}
			return this._showDetails;
		},

		position: function(){
			return {x: 550, y: 150};
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

	$scope.relationshipType= {
		id: 'relType1',
		name: 'Father',
		categoryId: "peo001",
		style: function(){
			return "";
		},
		properties: function(){
			// return value should include all of the properties defined in the parent type
		},
		data: function(){
			return {};
		},
		composite: function(){},
		bidirectional: function(){},
		reverseTypeId :  null,
		temporal: function(){
			/// does this rel have effective dates?
			return false;
		},
		constraints: function(){
			/// returns a list of objects
		}
	};

	$scope.viewItem = viewItem;
	$scope.viewItem2 = viewItem2;

	$scope.relationship = {
		id: 'rel1',
		'to': 'viewItem1',
		'from': 'viewItem2',
		type: {
			lineStyle : function() {
				return "stroke: blue; stroke-width: 3;";
			},
			labelStyle : function() {
				return "stroke: red; stroke-width: 3";
			}
		},
		data: function(){
			return {};
		}
	};
	console.log("RelationshipCtrl.link(("+$scope.$id+")): Created.");

}

RelationshipCtrl.$inject = [ "$scope", "View" ];
