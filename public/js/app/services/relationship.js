/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/22/13
 * Time: 6:52 PM
 */
(function (services) {

	services.factory('RelationshipManager', ['$resource', '$location', '$timeout', 'UtilityFunctions', '$rootScope', 'ConstantsService',
		function ($resource, $location, $timeout, utils, rootScope, constants) {
            console.log("services/relationship.js - services:"+JSON.stringify(services));
            var factory = this;
			console.log("RelationshipManager.factory: CREATED.");

			this.getConnectors = function (el) {
				var ret = [];
				/// look for .connector in el
				el.find('.connector').each(function (idx, connEl) {
					ret.push( angular.element(connEl) );
				});
				return ret;
			};
			this.positionRelationship = function (fromEl, toEl, lineEl) {
				if (!fromEl.length || !toEl.length)
					return;
				var fromConnectors = this.getConnectors(fromEl);
				var toConnectors = this.getConnectors(toEl);
				//var toConnectors = getConnectors(toEl);

				if (!fromConnectors.length || !toConnectors.length)
					return;
				var shortestPoints = [fromEl.offset(), toEl.offset()];
				var shortestDistance = 0;//utils.distance((fromEl).offset(), (toEl).offset());

				fromConnectors.forEach(function (fromConn) {
					//fromConn = angular.element(fromConn);
					var fromPos =utils.elementPosition(fromConn[0])
					toConnectors.forEach(function (toConn) {
						//toConn = angular.element(toConn);
						var toPos =utils.elementPosition(toConn[0]);
						//console.log("From connector "+fromConn.context.id+" pos:"+angular.toJson(fromPos) );
						//console.log("To connector "+toConn.context.id+" pos:"+angular.toJson(toPos) );
						var distance = utils.distance(
							utils.xy2topLeft(fromPos),utils.xy2topLeft(toPos));
						//console.log("Distance: "+distance );

						if (!shortestDistance || shortestDistance > distance) {
							shortestPoints = [utils.xy2topLeft(fromPos),utils.xy2topLeft(toPos)];
							shortestDistance = distance;
						}
					})
				});

				lineEl
				  .attr("x1", (shortestPoints[0].left + 15)+"px")
				  .attr("y1", (shortestPoints[0].top + 15)+"px")
				  .attr("x2", (shortestPoints[1].left + 15)+"px")
				  .attr("y2", (shortestPoints[1].top + 15)+"px");

//				lineEl
//				  .attr("x1", "375px")
//				  .attr("y1", "83px")
//				  .attr("x2", "100px")
//				  .attr("y2", "8px");
				console.log("RelationshipManager.positionRelationship:(" + lineEl.attr('x1') + "," + lineEl.attr('y1') + " -> " + lineEl.attr('x2') + "," + lineEl.attr('y2') + ")");
			};
			this.createRelationshipNode = function (relationship) {
				// div: { svg: { line: {id, }}}
				// div
				var div = angular.element("<div></div>");
				div.attr("id", utils.relationshipIdToElementId(relationship.id));
				div.css('z-index',20);
				div.css('position','absolute');
				div.css('top','0');
				div.css('left','0');
				/// svg
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				svg = angular.element(svg);
				svg.css('z-index',-1);
				//svg.attr('viewbox', "0 0 1600 1600");
				svg.css('position','absolute');
				svg.css('top','0');
				svg.css('left','0');
				svg.css('width','1600');
				svg.css('height','1600');
				svg.css("opacity", "50%")
				//svg.css('overflow','visible');

				svg.attr("id", utils.relationshipIdToElementId(relationship.id));
				svg.addClass( [ 'relOf_'+(relationship.from),  'relOf_'+(relationship.to) ] );

				/// line
				var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				line =  angular.element(line);
				line.attr("id", utils.relationshipIdToLineElementId(relationship.id))
				line.attr("style", "z-index:10;left:0px;top:0px;"+relationship.type.lineStyle());
				//append to svg
				svg.append(line);
				return svg;//return the div
			};

			this.itemRelationshipMap = { };

			this.addItemRelationship = function (vitemId, relId, toOrFrom) {
				this.itemRelationshipMap[vitemId] = this.itemRelationshipMap[vitemId] || {from: [], to: []};
				this.itemRelationshipMap[vitemId][toOrFrom ? "to" : "from"].push(relId);
			};

			this.relationshipsForItem = function (vitemId) {
				var ret = [];
				var rels = this.itemRelationshipMap[vitemId];
				if ( rels )
					ret = rels.from.concat(rels.to);
				return ret;
			}

			//setup listeners
			var moveHandler = function (nuPos) {
				console.log("RelationshipManager.moveHandler(" + angular.toJson(nuPos) + "): one of the endpoints moved.:");
				var rels = factory.relationshipsForItem(nuPos.viewItemId);
				this.repositionRelationships(rels);
			};

			rootScope.$on(constants.ViewItemMoved, function (e, data) {
				moveHandler(data)
			});

			this.createRelationshipNodes = function (parent, relationships) {
				relationships.forEach(function (rel) {
					parent.append(factory.createRelationshipNode(rel));
					factory.addItemRelationship(rel.from, rel.id, false);
					factory.addItemRelationship(rel.to, rel.id, true);
				});
			};

			return function (svgElement, relationships) {
				console.log("RelationshipManager srvc: MANAGING.");
				factory.relationshipIdMap = utils.mapBy('id', relationships);
				factory.createRelationshipNodes(svgElement, relationships);
				this.needItems = relationships.map(function (rel) {
					return rel.id;
				});
				this.checkForLoadedItems = function checkForLoadedItems() {
					var notReady = 0;
					relationships.forEach(function (rel) {
						if (needItems.indexOf(rel.id) != -1) {
							var fromEl = $('#' + utils.viewItemIdToElementId(rel.from));
							var toEl = $('#' + utils.viewItemIdToElementId(rel.to));
							var lineEl = $('#' + utils.relationshipIdToLineElementId(rel.id));

							if (!fromEl.find('.connector').length || !toEl.find('.connector').length) {
								++notReady;
								return;
							}
							console.log("RelationshipManager.checkForLoadedItems: positioning rel:"+rel.id);

							factory.positionRelationship(fromEl, toEl, lineEl);


							needItems.splice(needItems.indexOf(rel.id), 1);
						}
					});

					return needItems.length;
				}

				var notReady = this.checkForLoadedItems();
				this.repositionRelationships = function repositionRelationships(relationshipIds) {
					relationshipIds.forEach(function (relid) {
						var rel = factory.relationshipIdMap[relid];
						var fromEl = $('#' + utils.viewItemIdToElementId(rel.from));
						var toEl = $('#' + utils.viewItemIdToElementId(rel.to));
						/// Create the visual representation of the relationship
						var line = $('#' + utils.relationshipIdToLineElementId(rel.id));
						console.log("RelationshipManager.repositionRelationships(): rel.id:" + rel.id);
						console.dir([toEl, fromEl, line]);
						factory.positionRelationship(fromEl, toEl, line);
					})
				}
			};//ret func
		}]);

})(angular.module('GraphOMaticServices'));
