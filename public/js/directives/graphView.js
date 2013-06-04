//var graphModule = ;
(function(graphModule){

	graphModule.directive('graphView', ['$compile', '$parse', 'ConstantsService','UtilityFunctions','$timeout','RelationshipManager',
		function ($compile, $parse, constants, utils, timer,relationshipMgr ) {
		console.log("creating directive graphView");

		var itemElementMap = {};
		var itemRelationshipMap = {};
		function addItems(parentElement, viewItems, f){
			viewItems.forEach(function(vitem){
				var el = angular.element("<graph-item></graph-item>");
				el.attr( 'id', utils.viewItemIdToElementId( vitem.id ) );
				el.attr("ng-model", utils.viewItemIdToScopeName( vitem.id ));
				itemElementMap[vitem.id] = el;
				el = f( el, vitem );
				console.log("graphView.addItems(): added element:"+el.attr('id')+" ngModel:"+el.attr('ng-model'));

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
			templateUrl:'templates/view.ejs',
			link:function (scope, element, attrs, model) {
				if (!model)
					return;

				console.log("graphView.link(("+scope.$id+", phase:"+scope.$$phase+")): ENTER.");

				/// find our view in the scope
				var mdl = $parse(attrs.ngModel);
				scope.view = mdl(scope);
				console.log("graphView.link(("+scope.$id+", phase:"+scope.$$phase+")): scope.view:"+scope.view);

				element.css("position","absolute");
				///
				addItems(element.find('div.items'), scope.view.items, function(nuElem, viewItem){
					scope[utils.viewItemIdToScopeName(viewItem.id)] = viewItem;
					nuElem = $compile(nuElem)(scope);
					return nuElem;
				});

				// called when data value changes(like a watch)
				/// here is where we update the gui with new data
				model.$render = function () {
					console.log("graphView.link(("+scope.$id+", phase:"+scope.$$phase+")).$render: ENTER.");
					console.dir(this.$modelValue);
					if(this.$modelValue){
						var viewData = this.$modelValue;
						if(viewData){
							var nuElem = element.find('div.items'); //angular.element("<div draggable='true' class='draggable'></div>");
							nuElem.html("");
							addItems(nuElem, viewData.items, function(el, viewItem){
								console.log("graphView.link-render(("+scope.$id+", phase:"+scope.$$phase+")): added item:"+el.attr("id") );
								el = $compile(el)(scope);
								return (el);
							});
//							element.html($compile(nuElem)(scope));
							timer(function(){
								relationshipMgr( element.find('svg.relationships'), viewData.relationships );
							}, 1500, false);
						}
					}
					console.log("graphView.link(("+scope.$id+", phase:"+scope.$$phase+")).$render: EXIT.");
				};
			}
		};
	}]);
})(angular.module('graphOmatic.directives'));
