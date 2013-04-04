'use strict';

/* Directives */
/*
Should look like this:
<graphView  ng-model='A1234Z'  height='500' width='800' />

should turn into:

<svg >
	<rect x='50' y='50' width='100' height='300' />
    <text> TITLE </text>
*/

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
