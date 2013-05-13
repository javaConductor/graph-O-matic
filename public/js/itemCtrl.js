/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */

function ViewItemCtrl($scope){

	$scope.testViewItem = {
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
			  ]
			};
		};
	}

ViewItemCtrl.$inject  = ["$scope"];
