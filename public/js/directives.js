'use strict';

/* Directives */
/*
Should look like this:
<graphView  ng-model='A1234Z'  height='500' width='800' />

should turn into:

 <g class="draggable">

	 <rect x="10" y="10" height="100" width="100"
	    style="stroke:#006600; fill: #00cc00">    	</rect>
	 <image x="20" y="5" width="80" height="80"
	    xlink:href="http://jenkov.com/images/layout/top-bar-logo.png" />

	 <text y="100" style="stroke:#00ffff; fill: #00ffff">
	 <tspan dy="25" y="50" x="15">tspan line 0</tspan>
	 <tspan dy="25" y="70" x="15">tspan line 1</tspan>
	 </text>

 </g>
*/

var cx = 60, cy = 60;

var testItem = {
	"id": "i1",
	"position" : {"x":50, "y":50},
	item:{
		"type":"Person",
		"id": "132",
		"data":{
			"firstName": "Lee",
			"birthdate": "777"
		}
	}
};
var test2Item = {
	"type":"CalendarDate",
	"id": "456",
	"data":{"date": "", "bc":true}
	};

var createItemNode = function(element, viewItem){




};


var graphModule = angular.module('graphOmatic.directives', []);

graphModule.directive('graphItem', ['$compile', '$timeout', function ($compile, $timeout) {
	console.log("creating directive graphItem");

	return {
		restrict:'E',
		replace:true,
		scope:true,
		'require':'?ngModel',
		template: '<svg><rect cx="50" cy="50" x="100" y="100" color="black" ></rect></svg>',
		link : function(scope, element, attrs, model){
			/// Can we use this to update the screen for each item ???
			model.$render = function () {
				/// redisplay the item inside the view
				console.log('$render');
				console.dir(this.$modelValue);
				if ( this.$modelValue ){
					var graphOptions = this.$modelValue;
					//var jsonObj = angular.fromJson( jsonText );
					if ( graphOptions ){
						var nuElem = angular.element("<div></div>");
						addItems(jsonObj, graphOptions);
						element.html(nuElem);
					}
				}
			}
		}

	};
}]);

graphModule.directive('graphView', ['$compile', '$timeout', function ($compile, $timeout) {
		console.log("creating directive graphView");

		return {
			restrict:'E',
			replace:true,
			scope:true,
			'require':'?ngModel',
			link:function (scope, element, attrs, model) {
				if (!model)
					return;
				element = angular.element(element);

				// called when data value changes(like a watch)
				var textPromise;
				// called when data value changes(like a watch)
				model.$render = function () {
					console.log('$render');
					console.dir(this.$modelValue);
					if(this.$modelValue){
						var graphOptions = this.$modelValue;
						//var jsonObj = angular.fromJson( jsonText );
						if(graphOptions){
							var nuElem = angular.element("<div></div>");
							addItems(jsonObj, graphOptions);
							element.html(nuElem);
						}
					}
				};
				// function gets the text for the verseSpec and sets the scope
				//determine template
				var t = (!edit) ? '<div ng-class-odd="\'odd\'" ng-class-even="\'even\'" class="verseSpecContainer"><center>{{title}}</center><strong><span ng-model="' + modelVar + '"  ng-class-odd="\'odd\'" ng-class-even="\'even\'" class="verseSpec" >{{verseSpec}}</span></strong></br><span class="verseText" ng-class-odd="\'odd\'"  ng-class-even="\'even\'" >{{verseText}}</span></div>'
					: '<div  ng-class-odd="\'odd\'" ng-class-even="\'even\'"  class="verseSpecContainer"><center>{{title}}</center><input class="verseSpec" type="text" ng-model="' + modelVar + '" value="{{verseSpec}}" ></br><textarea  rows="6" ng-disabled="true" class="verseText" >{{verseText}}</textarea></div>'
				//template meets data
				element.html($compile(t)(scope));
				//listen to changes in the text box
				(element).find('.verseSpec').bind('keyup change', function (e) {
					updateVerseSpec(e.target.value);
				});
			}
		};
	}]);
