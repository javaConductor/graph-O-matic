(function (graphModule) {
	var cx = 60, cy = 60;
	graphModule.directive('graphRelationship', ['$rootScope', '$compile', '$timeout', '$parse', 'UtilityFunctions', 'ConstantsService',
		function (rootScope, $compile, $timeout, $parse, util, constants) {
			console.log("creating directive graphItem");

			var getConnectors = function (el) {
				var ret = [];
				/// look for .connector in el
				$('.connector').each(function (idx, connEl) {
					ret.push(connEl);
				});
				return ret;
			}

			var positionRelationship = function (fromEl, toEl, svgEl) {
				var fromConnectors = getConnectors(fromEl);
				var toConnectors = getConnectors(toEl);

				var shortestPoints = [];
				var shortestDistance = 0;

				fromConnectors.forEach(function (fromConn) {

					toConnectors.forEach(function (toConn) {
						var distance = util.distance(fromConn.offset(), toConn.offset());

						if (!shortestDistance || shortestDistance > distance) {
							shortestPoints = [fromConn.offset(), toConn.offset()];
							shortestDistance = distance;
						}
					})
				});

				svgEl.find("line")
				  .attr("x1", shortestPoints[0].x + 15)
				  .attr("y1", shortestPoints[0].y + 15)
				  .attr("x2", shortestPoints[1].x + 15)
				  .attr("y2", shortestPoints[1].y + 15);
			};
			var createRelationshipNode = function(fromConnectorElement,
												  toConnectorElement,
												  relationship){
				var div = angular.element("<div></div>");
				var svg = angular.element("<svg></svg>");
				var line = angular.element("<line></line>");

				var toOff = toConnectorElement.offset();
				var fromOff = fromConnectorElement.offset();

				line.attr("x1", fromOff.left);
				line.attr("y1", fromOff.top);
				line.attr("x2", toOff.left);
				line.attr("y2", toOff.top);
				line.attr("style", relationship.type.lineStyle());
				div.append(svg);
				svg.append(line);
				return div;// maybe just return the svg
			};

			return {
				restrict: 'E',
				replace: true,
				scope: true,
				link: function (scope, element, attrs, model) {
					console.log("graphRelationship.link("+scope.$id+"): ENTER.");

					var mdl = $parse( attrs.from);
					var fromViewItem = mdl(rootScope);

					mdl = $parse( attrs.to);
					var toViewItem = mdl(rootScope);

					mdl = $parse( attrs.relationship);
					var relationship = mdl(rootScope);

					console.log("graphRelationship.link("+scope.$id+"): to, from and relationship:");
					console.dir(toViewItem);
					console.dir(fromViewItem);
					console.dir(relationship);

					console.log("graphRelationship.link("+scope.$id+"): Creating relationship node.");
					// these elements should already be in the DOM
					var fromEl = $(constants.ViewItemIdPrefix + fromViewItem.id);
					var toEl = $(constants.ViewItemIdPrefix + toViewItem.id);
					// Create the visual representation of the relationship
					var line = createRelationshipNode(fromEl, toEl, relationship);
					console.log("graphRelationship.link("+scope.$id+"): element for to, from and relationship:");
					console.dir(toEl);
					console.dir(fromEl);
					console.dir(line);

					positionRelationship(fromEl, toEl, line);

					var moveHandler = function (nuPos) {
						console.log("graphRelationship.link("+scope.$id+").moveHandler("+nuPos+"): one of the endpoints moved.:");
						console.dir(toEl, fromEl, line);
						positionRelationship(fromEl, toEl, line);
					};

					scope.$on(constants.ViewItemMoved + fromViewItem.id, moveHandler);
					scope.$on(constants.ViewItemMoved + toViewItem.id, moveHandler);
					element.append(line);
					console.log("graphRelationship.link("+scope.$id+"): Added line to DOM");
					/// Can we use this to update the screen for each item ???
					model.$render = function () {
						/// redisplay the item inside the view
					}
				}
			};
		}])
})(angular.module('graphOmatic.directives'));
