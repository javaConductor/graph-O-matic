/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {
    console.log("services/view.js");

    var viewStyleToCSSStyle = function(viewStyle){
        return viewStyle.style;
    };

    var ViewItemObject = function(world, view, decoratedViewItem ){
            return {
	            item: decoratedViewItem,
                is: function (itemType) {

                },
                position:function(){
                    return decoratedViewItem.position;
                },
                image: function(){
                    /// for now we use the default from the itemType
                    decoratedViewItem.image = world.findRelatedImages(decoratedViewItem.item, function(imgItems){
                    });
                },
                title: function(){
                    return decoratedViewItem.data()['title'];
                },
                properties:function(){
                    return decoratedViewItem.item.itemType.properties;
                },
                data: function(){
                    return decoratedViewItem.item.data;
                }
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

    var ViewObject = function View(world, viewData) {
		/// all initialization done here before we return object
		/// add the types to the items
		var theItemTypes = world.allItemTypes( viewData.itemIdList );
		var itemTypesById = util.mapBy("id", theItemTypes);
		var newItems = [];

        // This loop initializes the items
		viewData.items.forEach(function (vitem) {
			newItems.push(this.initViewItem(vitem, itemTypesById));
		});
		viewData.items = newItems;
	    var decorators = world.decorator();
		//// REFACTOR: move all non-public methods out of object
		var theObject = {
			'name': viewData.name,
			"world": world,
			/////////////////////////////////////////////////////////
			// Items
			/////////////////////////////////////////////////////////
			viewItems: function () {
				return viewData.items();
			},//returns list of items for this view
			createViewItem: function (item, f) {
				return this.world.createViewItem(item);//creates both Item&ViewItem - sweet!
			},
			decorateViewItem: function(viewItem){
				viewItem.properties = world.initProperties(viewItem.item.itemType);
				viewItem.item.itemType = decorators.decorateItemType(viewItem.item.itemType);
				viewItem = decorators.decorateViewItem(viewItem);
				return viewItem;
			},
            //// This function decorates a viewItem and
            //// creates a ViewItemObject from it
			initViewItem: function (viewItem) {
				viewItem = this.decorateViewItem( viewItem );
				return ViewItemObject(this.world, this, viewItem)
			},
			wrapItem:  function(item){
				var vitem = {
					item: item,
					itemType: itemTypesById[item.type.id]
				};
				return this.initViewItem(vitem);
			},
			itemMatchesRelationshipCriteria: function (item, criteria) {
			},//bool
			addItem: function (item) {
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
			},
			relationships: function () {
			},
			findItemRelationships: function (item) {
			},
            applyFilters: function(options, itemList){
                /// returns a new list of Items that match the options


            }

			}

		return theObject;
        };
	services.factory('View', ['persistence', 'UtilityFunctions', 'World',
		function ( persistence, util, theWorld ) {
            console.log("services/view.js - services:"+JSON.stringify(services));
            return function(viewData){
				return new ViewObject( theWorld, viewData);
			}
		}]);

})(angular.module('graph-O-matic-services'));
