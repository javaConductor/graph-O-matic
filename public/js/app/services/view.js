/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {
    console.log("services/view.js");

    var ViewItemObject = function( view, decoratedViewItem ){
            return {
	            item: decoratedViewItem,
//                is: function (itemType) {
//                },
                position:function(){
                    return decoratedViewItem.position;
                },
                image: function(){
                    /// for now we use the default from the itemType
                  //  decoratedViewItem.image = world.findRelatedImages(decoratedViewItem.item, function(imgItems){
                 //   });
                },
                title: function(){
                    return decoratedViewItem.data()['title'];
                },
                properties:function(){
                    return decoratedViewItem.item.type.properties;
                },
                data: decoratedViewItem.item.data
            };
        };

    /**
     * showViewItem
     *
     * Returns true if the viewItem should be displayed based on the viewOptions.
     * @param item
     * @param viewOptions
     */
    var showViewItem = function showViewItem(item, viewOptions){
    };

    var ViewObject = function View( viewData, ContextEventProcessor,persistence ) {
		/// all initialization done here before we return object
		/// add the types to the items
		//var theItemTypes = world.allItemTypes( viewData.itemIdList );
		//var itemTypesById = util.mapBy("id", theItemTypes);
		var newItems = [];
        viewData.items = viewData.items || [];
        // This loop initializes the items
		viewData.items.forEach(function (vitem) {
			newItems.push(this.initViewItem(vitem));
		});
		viewData.items = newItems;
	    //var decorators = world.decorator();
		//// REFACTOR: move all non-public methods out of object
		var theObject = {
			'id': viewData.id,
			'name': viewData.name,
			//"world": world,
			/////////////////////////////////////////////////////////
			// Items
			/////////////////////////////////////////////////////////
			viewItems: function () {
				return newItems;
			},//returns list of items for this view
			createViewItem: function (item, f) {
				return this.createViewItem(item);//creates both Item&ViewItem - sweet!
			},
            //// This function decorates a viewItem and
            //// creates a ViewItemObject from it
			initViewItem: function (viewItem) {
				viewItem = this.decorateViewItem( viewItem );
				return ViewItemObject( this, viewItem)
			},
			addItem: function (item) {
				return this.createViewItem(item)
			},
			populateData:  function (item, f) {
                    if( item.item.data['$href'] ){
                        // the data has not been loaded
                        // we must load it via the $href url
                        persistence.getItemData(item.id, function(e,d){

                        });
                    }else{

                    }


				return this.createViewItem(item)
			},
			/////////////////////////////////////////////////////////
			// Relationships
			/////////////////////////////////////////////////////////
			getPossibleNewRelationships: function (itemFrom, itemTo) {
			},
			itemHasRelationship: function (item, relationshipTypeName) {
			},
			validRelationship: function (relationshipTypeName, itemFrom, itemTo) {
			},

			createRelationship: function (itemFrom, itemTo, relationshipTypeName) {
			}
		};

		return theObject;
        };

	services.factory('GraphView', ['ContextEventProcessor', 'UtilityFunctions','persistence',
		function ( evtProcessor, util, persistence ) {
            console.log("services/view.js - services:"+JSON.stringify(services));
            return function(viewData){
				return new ViewObject(  viewData, evtProcessor,persistence);
			}
		}]);

})(angular.module('graph-O-matic-services'));
