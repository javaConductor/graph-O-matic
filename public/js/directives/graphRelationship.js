(function (graphModule) {

	var cx = 60, cy = 60;
	var createRelationshipNode = function (relationship) {
		var g = angular.element("<g></g>");
		var l = angular.element("<line></line>").
		  attr('style', relationship.type.style());
	};

	graphModule.directive('graphRelationship', ['$compile', '$timeout', '$parse', 'UtilityFunctions',
		function ($compile, $timeout, $parse, util) {
			console.log("creating directive graphItem");

			var Constants = {
				ViewItemIdPrefix: 'vi',
				ViewItemMovedEvent: "ViewItemMoved"
			};
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
				})
				svgEl.find("line").attr("x1", shortestPoints[0].x + 15)
				  .attr("y1", shortestPoints[0].y + 15)
				  .attr("x2", shortestPoints[1].x + 15)
				  .attr("y2", shortestPoints[1].y + 15);

			};

			return {
				restrict: 'E',
				replace: true,
				scope: true,
				'require': '?ngModel',
				link: function (scope, element, attrs, model) {
					if (!model)
						return;

					var mdl = $parse(Constants.ViewItemIdPrefix + attrs.from);
					var fromViewItem = mdl(scope.$parent);

					mdl = $parse(Constants.ViewItemIdPrefix + attrs.to);
					var toViewItem = mdl(scope.$parent);

					mdl = $parse(Constants.ViewItemIdPrefix + attrs.relationship);
					var relationship = mdl(scope.$parent);

					var line = createRelationshipNode(relationship);
					var fromEl = $(Constants.ViewItemIdPrefix + fromViewItem.id);
					var toEl = $(Constants.ViewItemIdPrefix + toViewItem.id);

					positionRelationship(fromEl, toEl, line);

					var handler = function (nuPos) {
						positionRelationship(fromEl, toEl, line);
					};
					scope.$on(Constants.ViewItemMovedEvent + fromViewItem.id, handler);
					scope.$on(Constants.ViewItemMovedEvent + toViewItem.id, handler);
					element.append(line);
					/// Can we use this to update the screen for each item ???
					model.$render = function () {
						/// redisplay the item inside the view
					}
				}
			};
		}])
})(angular.module('graphOmatic.directives'));

