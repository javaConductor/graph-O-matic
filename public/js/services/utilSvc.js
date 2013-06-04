'use strict';

(function (services) {

    services.factory('UtilityFunctions', ['$http', '$location', 'ConstantsService', function ($http, $location, constants) {
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
				return constants.ViewItemElementIdPrefix + viewItemId+"_"+idx;
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
				return {x: findPosX(element.context), y: findPosY(element.context)};
			}

	}
    }]);

})(angular.module('GraphOMaticServices'));

