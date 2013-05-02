/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 * T
 *
 * ime: 12:08 AM
 */
(function (services) {

    var viewStyleToCSSStyle = function(viewStyle){
        return viewStyle.style;
    };
    var ViewItemObject = function(world, view, decoratedViewItem )
    {
            return {
                is: function (itemType) {

                },
                position:function(){
                    return decoratedViewItem.viewPosition;
                },
                image: function(){
                    /// for now we use the default from the itemType
                    viewItem.image = world.findRelatedImages(viewItem.item, function(imgItems){
                    });
                },
                title: function(){
                    return decoratedViewItem.data()['title'];
                },
                style: function(){
                    return decoratedViewItem.viewStyle;
                },
                properties:function(){
                    return decoratedViewItem.item.itemType.properties;
                },
                data: function(){
                    return decoratedViewItem.item.data;
                }
            };

        }

    var View = function View(world, viewData) {
		/// all initialization done here before we return object


		/// add the types to the items
		var theItemTypes = world.itemTypesForItems(viewData.itemIdList);
		var itemTypesById = mapBy("id", theItemTypes);
		var newItems = [];
		viewData.items.forEach(function (vitem) {
			newItems.push(this.initViewItem(vitem, itemTypesById));
		});
		viewData.items = newItems;
        //

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
                world.createItem(item)
				return this.world.createViewItem(item);//creates both Item&ViewItem - sweet!
			},
            decorateViewItem: function(viewItem){
                viewItem.viewStyle = world.getItemTypeViewStyle(viewItem.itemType);
                viewItem.properties = world.initProperties(viewItem.itemType);
                viewItem.item = this.world.applyItemExtensions(viewItem.item);
                viewItem.item.itemType = this.world.applyItemTypeExtensions(viewItem.item.itemType);
                return viewItem;
            },
			initViewItem: function (viewItem) {
                viewItem = this.decorateViewItem(viewItem);
                return ViewItemObject(this.world, this, viewItem)
			},
            wrapItem:  function(item){
                var vitem = {
                    item: item,
                    itemType: itemTypesById[item.itemTypeId]
                };
                return this.initViewItem(vitem);
            },
			itemMatchesRelationshipCriteria: function (item, criteria) {
                return true;//TODO do the test
			},//bool
			addItem: function (item) {
				return this.createViewItem(this.wrapItem(item));
			},
			/////////////////////////////////////////////////////////
			// Relationships
			/////////////////////////////////////////////////////////
			getPossibleNewRelationships: function (itemFrom, itemTo) {
                return this.world.getPossibleNewRelationshipTypes(itemFrom, itemTo);
			},
			itemHasRelationship: function (item, relationshipTypeName) {
			},
			validRelationship: function (relationshipTypeName, itemFrom, itemTo) {
			},
			validToRelationship: function (relationshipTypeName, itemTo) {},
				validFromRelationship: function (relationshipTypeName, itemFrom) {
				}
				,
				createRelationship: function (itemFrom, itemTo, relationshipTypeName) {
				}
				,
				relationships: function () {
				}
				,
				findItemRelationships: function (item) {
                    world.
				}
			}
		};
		return theObject;

	})(angular.module('GraphOMaticServices'));
