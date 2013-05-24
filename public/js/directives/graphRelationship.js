(function (graphModule) {

	var cx = 60, cy = 60;
	var createRelationshipNode = function (relationship) {
		var g = angular.element("<g></g>");
		var l = angular.element("<line></line>").
		  attr('style', relationship.type.style());
	};

	graphModule.directive('graphRelationship', ['$compile', '$timeout', '$parse', 'UtilityFunctions', 'ConstantsService',
		function ($compile, $timeout, $parse, util, constants) {
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

			return {
				restrict: 'E',
				replace: true,
				scope: {
					from: '@',
					to: '@',
					relationship: '@'
				},
				link: function (scope, element, attrs, model) {
					if (!model)
						return;

					var mdl = $parse(constants.ViewItemIdPrefix + attrs.from);
					var fromViewItem = mdl(scope.$parent);

					mdl = $parse(constants.ViewItemIdPrefix + attrs.to);
					var toViewItem = mdl(scope.$parent);

					mdl = $parse(constants.ViewItemIdPrefix + attrs.relationship);
					var relationship = mdl(scope.$parent);

					var line = createRelationshipNode(relationship);
					var fromEl = $(constants.ViewItemIdPrefix + fromViewItem.id);
					var toEl = $(constants.ViewItemIdPrefix + toViewItem.id);

					positionRelationship(fromEl, toEl, line);

					var moveHandler = function (nuPos) {
						positionRelationship(fromEl, toEl, line);
					};
					scope.$on(constants.ViewItemMovedEvent + fromViewItem.id, moveHandler);
					scope.$on(constants.ViewItemMovedEvent + toViewItem.id, moveHandler);
					element.append(line);
					/// Can we use this to update the screen for each item ???
					model.$render = function () {
						/// redisplay the item inside the view
					}
				}
			};
		}])
})(angular.module('graphOmatic.directives'));
