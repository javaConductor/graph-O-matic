'use strict';

/* World Service */
(function (services) {
    /**
     * @ngdoc service
     * @name graph-O-matic-services:World
     * @description This is everything!!
     *
     * ## No Really it's sweet!
     */
    console.log("world.js");
	services.factory('GraphWorld', ['persistence', 'UtilityFunctions', 'ContextService', '$window','ContextEventProcessor','GraphView',
		function (persistence, util, ctxtSvc, $window, evtProcessor, GraphView) {
			var thisf = this;
            console.log("services/world.js - services:"+JSON.stringify(services));

            this.onOpenView = function(viewId){
                persistence.getView(viewId, function(view){
                   // $window.document
                    //thisf.loadView(view);
                })
            };
            console.log("GraphWorld service: after onOpenView created!")

            this.loadView = function( document, view ){
                    // insert a new element into the array??
            };
            console.log("GraphWorld service: after loadView created!")

            var onSelectView = function(viewId){
                d3.select("tab[data-view-id='+viewId+']")
                    .attr("active",true);
            };
            console.log("GraphWorld service: after onSelectView created!")

            var onRemoveView = function(viewId){
                d3.select("tab[data-view-id='+viewId+']")
                    .remove();
            };
            console.log("GraphWorld service: after onRemoveView created!")

            ///////////////////////////////////////////////////////////////////////////
			/// Extension functions
			///////////////////////////////////////////////////////////////////////////
            console.log("GraphWorld service - returning service obj!");

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
                    console.log("GraphWorld.views: ENTER")
					// an object key=view name, value=view id
                    persistence.allViews( function(e, views){
                        if(e) return (f(e, null));
                        return f(e, views.map(function(vw){
                            console.log("GraphWorld.views: returning view "+vw.id);
                            return new GraphView( vw);
                        }));
                    });
				},

                /// returns a new EMPTY view if viewId not found
				view: function (viewId, f) {
					// a view or null
					persistence.getView(viewId, function (e, v) {
						if (e) return f(e, null);
						return f(null, v ? new GraphView( v) : null);
					});
                },
                /// returns error if viewId could not be created
				createView: function (nuView, f) {
                    console.log("World.createView("+JSON.stringify(nuView)+")");
                    var viewName = nuView.viewName;
                    var viewType = nuView.viewType;
                   	persistence.createView(viewName, viewType, function (e, v) {
						if (e) return f(e, null);
						return f(null, v ? new GraphView( v) : null);
					});
				}
                /////////////////// /////////////////////// /////////////////////////////// ///////////////////////////
			}
		}]);
})(angular.module('graph-O-matic-services'));
