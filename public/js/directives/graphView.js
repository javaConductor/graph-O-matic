//var graphModule = ;
(function(graphModule){


	graphModule.directive('graphView', ['$compile', '$parse', function ($compile, $parse) {
		console.log("creating directive graphView");

		var itemElementMap = {};
		function addItems(parentElement, viewItems, f){
			viewItems.forEach(function(vitem){
				var el = angular.element("<graph-item></graph-item>");
				el.attr( 'id', vitem.id );
				el.attr("ng-model", "vi"+vitem.id );
				itemElementMap[vitem.id] = el;
				el = f(el, vitem);
				parentElement.append(el);
			});
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
					scope["vi"+viewItem.id] = viewItem;
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
								scope["vi"+viewItem.id] = viewItem;
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
