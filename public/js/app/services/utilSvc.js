'use strict';

(function (services) {
    console.log("services/utilSvc.js - services:"+JSON.stringify(services));

    services.factory('UtilityFunctions', ['$http', '$location', 'ConstantsService', '$timeout', function ($http, $location, constants, timeout) {
        /// return the util funcs
		function findPosX(obj) {
			var curleft = 0;
			var orig = obj;
			if (obj.offsetParent) {
				while (1) {
					curleft+=obj.offsetLeft;
					if(obj.offsetLeft) console.log('findPosX('+obj.nodeName+'#'+obj.id+') adding '+obj.offsetLeft)
					if (!obj.offsetParent) {
						break;
					}
					obj=obj.offsetParent;
				}
			} else if (obj.x) {
				curleft+=obj.x;
			}
			console.log('findPosX('+orig.nodeName+'#'+orig.id+') left: '+curleft)

			return curleft;
		};

		function findPosY(obj) {
			var curtop = 0;
			var orig = obj;
			if (obj.offsetParent) {
				while (1) {
					curtop+=obj.offsetTop;
					if(obj.offsetTop) console.log('findPosY('+obj.nodeName+'#'+obj.id+') adding '+obj.offsetTop)
					if (!obj.offsetParent) {
						break;
					}
					obj=obj.offsetParent;
				}
			} else if (obj.y) {
				curtop+=obj.y;
			}
			console.log('findPosY('+orig.nodeName+'#'+orig.id+') top: '+curtop);
			return curtop;
		};

		function topLeft2xy(topLeft){
			return {
				x: topLeft.left,
				y: topLeft.top
			}

		};

		function xy2topLeft(xy){
			return {
				left : xy.x,
				top: xy.y
			}

		};

        return {

            mapBy: function (key, objectArray) {
                var destination = {};
                if (objectArray)
                    for (var idx in objectArray) {
                        if (objectArray[idx][key])
                            destination[objectArray[idx][key]] = objectArray[idx];
                    }
                return destination;
            },

            copy: function (destination, source) {
                if (!destination)
                    return source;
                if (!source)
                    return destination;

                for (var property in source) {
                    destination[property] = source[property];
                }
                return destination;
            },

            getObjectFromPath: function (theObject, path) {
                var objAtPath = eval("theObject." + path);
                return objAtPath;
            },
            getOrCreateObjectFromPath: function (theObject, path, defObj) {
                defObj = defObj || {};
                var objAtPath = this.getObjectFromPath(theObject, path);
                if (!objAtPath) {
                    eval("theObject." + path + " = defObj");
                    objAtPath = eval("theObject." + path);
                }
                return objAtPath;
            },
            setObjectFromPath: function (theObject, path, value) {
                eval("theObject." + path + " = value");
            },
			distance: function( point1, point2 )
			{
				var xs = 0;
				var ys = 0;

				xs = point2.left - point1.left;
				xs = xs * xs;

				ys = point2.top - point1.top;
				ys = ys * ys;

				return Math.sqrt( xs + ys );
			},

			viewItemIdToScopeName: function(viewItemId){
				return constants.ViewItemIdScopePrefix + viewItemId;
			},

			viewItemScopeNameToId: function(viewItemId){
				return str.slice( constants.ViewItemIdScopePrefix.length());
			},

			viewItemIdToElementId: function(viewItemId){
				return constants.ViewItemElementIdPrefix + viewItemId;
			},

			viewItemIdToConnectorId: function(viewItemId, idx){
				return constants.ViewItemElementIdPrefix + viewItemId+"_conn_"+idx;
			},

			relationshipIdToScopeName: function(relId){
				return constants.RelationshipIdPrefix + relId;
			},
			relationshipIdToElementId: function(relId){
				return constants.RelationshipElementIdPrefix + relId;
			},
			relationshipIdToLineElementId: function(relId){
				return constants.RelationshipElementIdPrefix + relId +"_line";
			},

			topLeft2xy: function(topLeft){
			return {
				x: topLeft.left,
				y: topLeft.top
			}

		},

		xy2topLeft: function(xy){
			return {
				left : xy.x,
				top: xy.y
			}

		},
			elementPosition: function(element){
                var brect = element.getBoundingClientRect();
                return {
                    x: brect.left,
                    y: brect.top
                };
			},

            drawTable: function drawTable(data, tableid, dimensions, valueFunc, textFunc, columns) {

            var sortValueAscending = function (a, b) { return valueFunc(a) - valueFunc(b) }
            var sortValueDescending = function (a, b) { return valueFunc(b) - valueFunc(a) }
            var sortNameAscending = function (a, b) { return textFunc(a).localeCompare(textFunc(b)); }
            var sortNameDescending = function (a, b) { return textFunc(b).localeCompare(textFunc(a)); }
            var metricAscending = true;
            var nameAscending = true;

            var width = dimensions.width + "px";
            var height = dimensions.height + "px";
            var twidth = (dimensions.width - 25) + "px";
            var divHeight = (dimensions.height - 60) + "px";

            var outerTable = d3.select(tableid).append("table").attr("width", width);

            outerTable
                .append("tr")
                .append("td")
                .append("table").attr("class", "headerTable").attr("width", twidth)
                .append("tr").selectAll("th").data(columns).enter()
                .append("th")
                .text(function (column) { return column; })
                .on("click", function (d) {
                    var sort;

                    // Choose appropriate sorting function.
                    if (d === columns[1]) {
                        if (metricAscending) sort = sortValueAscending;
                        else sort = sortValueDescending;
                        metricAscending = !metricAscending;
                    } else if(d === columns[0]) {
                        if (nameAscending) sort = sortNameAscending;
                        else sort = sortNameDescending;
                        nameAscending = !nameAscending;
                    }

                    var rows = tbody.selectAll("tr").sort(sort);
                });

            var inner = outerTable
                .append("tr")
                .append("td")
                .append("div").attr("class", "scroll").attr("width", width).attr("style", "height:" + divHeight + ";")
                .append("table").attr("class", "bodyTable").attr("border", 1).attr("width", twidth).attr("height", height).attr("style", "table-layout:fixed");

            var tbody = inner.append("tbody");
            // Create a row for each object in the data and perform an intial sort.
            var rows = tbody.selectAll("tr").data(data).enter().append("tr").sort(sortValueDescending);

            // Create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function (d) {
                    return columns.map(function (column) {
                        return { column: column, text: textFunc(d), value: valueFunc(d)};
                    });
                }).enter()
                .append("td")
                .text(function (d) {
                    if (d.column === columns[0]) return d.text;
                    else if (d.column === columns[1]) return d.value;
                });
        },
            addScript: function addScript(document, scripts){
                d3.select("head")
                    .selectAll("script[data-type='viewtype']")
                    .data(scripts)
                    .enter()
                        .append("script")
                        .attr("data-type","viewtype")
                        .attr("src", angular.identity);
            }

	};
    }]);

})(angular.module('GraphOMaticServices'));

