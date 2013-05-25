//var graphModule = ;
(function(graphModule){

	graphModule.directive('graphView', ['$compile', '$parse', 'ConstantsService','Utilities', function ($compile, $parse, constants, utils ) {
		console.log("creating directive graphView");

		var itemElementMap = {};
		var itemRelationshipMap = {};
		function addItems(parentElement, viewItems, f){
			viewItems.forEach(function(vitem){
				var el = angular.element("<graph-item></graph-item>");
				el.attr( 'id', vitem.id );
				el.attr("ng-model", utils.viewItemIdToScopeName( vitem.id ));
				itemElementMap[vitem.id] = el;
				el = f( el, vitem );
				parentElement.append(el);
			});
		};
		var addItemRelationship = function(vitemId, relId, toOrFrom){
			if (toOrFrom){
				itemRelationshipMap[vitemId].to.push(relId);
			}else{
				itemRelationshipMap[vitemId].from.push(relId);
			}
		};

		function addRelationships(parentElement, relationships, f){
			relationships.forEach(function(rel){
				var el = angular.element("<graph-relationship></graph-relationship>");
				el.attr( 'id', rel.id );
				el.attr("from", rel.from);
				el.attr("to", rel.to );
				el.attr("relationship", constants.RelationshipIdPrefix + rel.id );
				el = f( el, rel );
				parentElement.append(el);
			});
		};


		// create an object to map items to relationships
		/*
			{
				'vitem001' : {
				 	to : [rel1],
				 	from: [rel2]
				 },
				 'vitem002' : {
				 	to: [],
				 	from : []

				 }
			}
		 From this we see that:

		 vitem001 has one relationship where its the "from" endpoint (rel2)
		 and one relationship where its the "to" endpoint (rel1)

		 vitem002 has NO relationships

		 */

		return {
			restrict: 'E',
			replace: true,
			scope: true,
			'require':'?ngModel',
			link:function (scope, element, attrs, model) {
				if (!model)
					return;
				/// find our view in the scope
				var mdl = $parse(attrs.ngModel);
				scope.view = mdl(scope);

				///
				addItems(element, scope.view.items, function(nuElem, viewItem){
					scope[viewItemIdToScopeName(viewItem.id)] = viewItem;
					return nuElem;
				});

				/// we should already have the relationships for the items
				addRelationships(element, scope.view.relationships, function(nuElem, rel){
					scope[relationshipIdToScopeName(rel.id)] = rel;
					return nuElem;
				});

				// called when data value changes(like a watch)
				model.$render = function () {
					console.log('$render');
					console.dir(this.$modelValue);
					if(this.$modelValue){
						var viewData = this.$modelValue;
						if(viewData){
							var nuElem = element;//angular.element("<div></div>");
							addItems(nuElem, viewData.items, function(el, viewItem){
								scope[constants.ViewItemIdPrefix + viewItem.id] = viewItem;
								return (el);
							});
							addRelationships( nuElem, viewData.relationships, function(el, rel){
								addItemRelationship(rel.from, rel.id, false);
								addItemRelationship(rel.to, rel.id, true);
								scope[constants.RelationshipIdPrefix + rel.id] = rel;
								return el;
							});

							element.html($compile(nuElem)(scope));
						}
					}
				};
			}
		};
	}]);
})(angular.module('graphOmatic.directives'));
