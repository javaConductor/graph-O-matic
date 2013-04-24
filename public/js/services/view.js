/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 * Time: 12:08 AM
 */
(function () {



	var View = function View(world, viewData) {


		var initViewItem = function(vItem, itemTypesById){






		};
		/// all initialization done here before we return object

		/// add the types to the items

		var theItemTypes = world.itemTypesForItems(viewData.itemIdList);
		var itemTypesById = mapBy("id", theItemTypes);
		var newItems = [];
		viewData.items.forEach(function (vitem) {
			newItems.push(this.initViewItem(vitem, itemTypesById));
		});
		viewData.items = newItems;


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
			initViewItem: function (viewItem) {

				viewItem.viewStyle = world.getItemTypeViewStyle(viewItem.itemType);
				viewItem.properties = world.initProperties(viewItem.itemType);
				return viewItem;
			},
			itemMatchesRelationshipCriteria: function (item, criteria) {
			},//bool
			addItem: function (item) {
				this.createViewItem(item)
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
			validToRelationship: function (relationshipTypeName, itemTo) {
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
				}
			}
		};

		return theObject;

	};

})();
