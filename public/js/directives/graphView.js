//var graphModule = ;
(function(graphModule){

	graphModule.directive('graphView', ['$compile', '$parse', 'ConstantsService', function ($compile, $parse, constants ) {
		console.log("creating directive graphView");

		var itemElementMap = {};
		function addItems(parentElement, viewItems, f){
			viewItems.forEach(function(vitem){
				var el = angular.element("<graph-item></graph-item>");
				el.attr( 'id', vitem.id );
				el.attr("ng-model", constants.ViewItemIdPrefix + vitem.id );
				itemElementMap[vitem.id] = el;
				el = f( el, vitem );
				parentElement.append(el);
			});
		};

		var createRelationshipLine = function(fromConnectorElement, toConnectorElement, relationship){
			var div = angular.element("<div></div>");
			div.attr("style", "position:absolute");
			var svg = angular.element("<svg></svg>");
			var line = angular.element("<line></line>");

			var toOff = toConnectorElement.offset();
			var fromOff = fromConnectorElement.offset();

			line.attr("x1", fromOff.left);
			line.attr("y1", fromOff.top);
			line.attr("x2", toOff.left);
			line.attr("y2", toOff.top);
			line.attr("style", "stroke:rgb(255,0,0);stroke-width:2");
			div.append(svg);
			svg.append(line);
			return div;
		};

		return {
			restrict: 'E',
			replace: true,
			//controller: "GraphViewController",
			scope: true,
			'require':'?ngModel',
			link:function (scope, element, attrs, model) {
				if (!model)
					return;
				/// find our view in the scope
				var mdl = $parse(attrs.ngModel);
				scope.view = mdl(scope);
				//
				addItems(element, scope.view.items, function(nuElem, viewItem){
					scope[constants.ViewItemIdPrefix + viewItem.id] = viewItem;
					return nuElem;
				});

				// called when data value changes(like a watch)
				model.$render = function () {
					console.log('$render');
					console.dir(this.$modelValue);
					if(this.$modelValue){
						var viewData = this.$modelValue;
						if(viewData){
							var nuElem = angular.element("<div></div>");
							addItems(nuElem, viewData.items, function(el, viewItem){
								scope[constants.ViewItemIdPrefix + viewItem.id] = viewItem;
								return (el);
							});

							element.html($compile(nuElem)(scope));
						}
					}
				};
			}
		};
	}]);
})(angular.module('graphOmatic.directives'));
