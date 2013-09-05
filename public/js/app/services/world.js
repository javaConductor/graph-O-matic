'use strict';

/* World Service */
(function (services) {
    /**
     * @ngdoc service
     * @name GraphOMaticServices:World
     * @description This is everything!!
     *
     * ## No Really it's sweet!
     */
	services.factory('GraphWorld', ['persistence', 'UtilityFunctions', 'ContextService',
		function (persistence, util, ctxtSvc) {
			var thisf = this;
			var mergeViewStyle = function (destViewStyle, srcViewStyle) {
				return util.copy(destViewStyle, srcViewStyle);
			};
			///////////////////////////////////////////////////////////////////////////
			/// Extension functions
			///////////////////////////////////////////////////////////////////////////

			return {
				allItems: persistence.allItems,
				allItemTypes: persistence.allItemTypes,
				allRelationships: persistence.allRelationships,
				initialize: function (f) {
                    // call user-defined function
                    f( this );
                },

				initProperties: function (itemType, defaultProps) {
					return (itemType.parent)
						? util.copy(this .initProperties(itemType.parent, defaultProps), util.mapBy("name", itemType.properties))
						: util.copy(defaultProps, util.mapBy("name", itemType.properties))
				},

				findRelatedImages: function(item, f){
				},

				views: function (f) {
					// an object key=view name, value=view id
                    persistence.allViews( function(e, views){
                        if(e) return (f(e, null));
                        return f(e, views.map(function(vw){
                            return new View(this, vw);
                        }));
                    });
				},

                /// returns a new EMPTY view if viewId not found
				view: function (viewId, f) {
					// a view or null
					this.persistence.getView(viewId, function (e, v) {
						if (e) return f(e, null);
						return f(null, v ? new View(this, v) : null);
					});
				}
			}
		}]);
})(angular.module('graphOmatic.directives'));
