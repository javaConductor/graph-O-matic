'use strict';

(function (services) {

    services.factory('UtilityFunctions', ['$http', '$location', 'ConstantsService', function ($http, $location, constants) {
        /// return the util funcs
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

				xs = point2.x - point1.x;
				xs = xs * xs;

				ys = point2.y - point1.y;
				ys = ys * ys;

				return Math.sqrt( xs + ys );
			},

			viewItemIdToScopeName: function(viewItemId){
				return constants.ViewItemIdPrefix + viewItemId;
			},

			relationshipIdToScopeName: function(relId){
				return constants.RelationshipIdPrefix + relId;
			}
	}
    }]);

})(angular.module('GraphOMaticServices'));

