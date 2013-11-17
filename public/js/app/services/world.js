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
	services.factory('GraphWorld', ['persistence', 'UtilityFunctions', 'ContextService', '$window','ContextEventProcessor','GraphView','$q',
		function (persistence, util, ctxtSvc, $window, evtProcessor, GraphView, q) {
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


				findRelatedImages: function(item, f){
				},

				views: function () {
                    console.log("GraphWorld.views: ENTER");
                    return persistence.allViews()
                        .then(function(av){

                            var gvList = av.map(function(x){ return new GraphView( x ); } );
                            console.log("GraphWorld.views: returning views "+JSON.stringify(gvList));
                               return(gvList);
                        });
//                        .fail(function(e){
//                            if (e) {
//                                console.error("GraphWorld.views: "+e);
//                                throw (e) ;
//                            }
//                        });
				},

                /// returns a new EMPTY view if viewId not found
				view: function (viewId) {
					// a view or null
					return  persistence.getView(viewId)
                        .then( function (v) {
						    return (new GraphView( v) );
					    })
                        .fail(function(e){
                            throw (e);
                        });
                },
                /// returns error if viewId could not be created
                // Create the View and make it the currentView
				createView: function (nuView) {
                    console.log("World.createView("+JSON.stringify(nuView)+")");
                    var viewName = nuView.viewName;
                    var viewType = nuView.viewType;
                   	return  persistence.createView(viewName, viewType);
				}
            }
		}]);

})(angular.module('graph-O-matic-services'));
