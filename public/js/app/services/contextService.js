/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/22/13
 * Time: 10:55 PM
 */
(function (services) {
	var basicRealityCtxt = {};
	var fContext = function (ctxt) {
		return {
			updateItemCategories: function (categories, f) {
				return (ctxt.itemCategories) ? categories.concat(ctxt.itemCategories) : categories;
			},
			updateRelationshipCategories: function (categories, f) {
				return (ctxt.relationshipCategories) ? categories.concat(ctxt.relationshipCategories) : categories;
			},
			updateItemTypes: function (itemTypes, f) {
				return (ctxt.itemTypes) ? itemTypes.concat(ctxt.itemTypes) : itemTypes;
			},
			updateRelationshipTypes: function (relationshipTypes, f) {
				return (ctxt.relationshipTypes) ? relationshipTypes.concat(ctxt.relationshipTypes) : relationshipTypes;
			},
			updateExtensionTable: function (extensionTable, f) {
				return (ctxt.extensionTable) ? extensionTable.concat(ctxt.extensionTable) : extensionTable;
			},
            cssFiles :  function(){},
            jsFiles :  function(){}



        };

	};


    var extensionMgr = function (extensionTable) {
/// this class does two things:
//      1) Gets Extension Functions,
//      2) Applies Functions to Objects.


        return {
            applyFunctions: function(theObject, funks){
                theObject = theObject || {};
                funks = funks || {};
                funks.forEach(function (value, key) {
                    theObject[key] = value.f;
                });
                return theObject;
            },
            ////////////
            ////////////   Overridden View Object functions
            ////////////
            getViewFunctions: function (viewId) {
                /// look for views.<viewId>.items
                /// look for views.<viewId>.relationships
                ///
                var fList = util.getOrCreateObjectFromPath(extensionTable, "views." + viewId + ".items", {});
                fList = util.copy(fList, util.getOrCreateObjectFromPath(extensionTable, "views." + viewId + ".relationships", {}));
                return fList;
            },
            applyViewExtensions: function (view) {
                var funks = this.getViewFunctions(view.id);
                return this.applyFunctions(view, funks);
            },

            ////////////
            ////////////   Overridden View Item Object functions
            ////////////
            getViewItemFunctions: function (viewItemId) {
                /// look for views.<viewId>.items
                /// look for views.<viewId>.relationships
                ///
                var fList = util.getOrCreateObjectFromPath(extensionTable, "views." + viewItemId + ".items", {});
                fList = util.copy(fList, util.getOrCreateObjectFromPath(extensionTable, "views." + viewItemId + ".relationships", {}));
                return fList;
            },
            applyViewItemExtensions: function (viewItem, extensionTable) {
                var funks = this.getViewItemFunctions(viewItem.id);
                return this.applyFunctions(viewItem, funks);
            },
            ////////////
            ////////////   Overridden Item Type Object functions
            ////////////

            getItemTypeFunctions: function (itemTypeId) {
                /// look for itemTypes.<itemTypeId>.itemTypes
                var fList = util.getOrCreateObjectFromPath(extensionTable, "itemTypes." + itemTypeId, {});
                return fList;
            },
            applyItemTypeExtensions: function (itemType, extensionTable) {
                var funks = this.getItemTypeFunctions( itemType );
                return this.applyFunctions(itemType, funks);
            },
            ////////////
            ////////////   Overridden Relationship Type Object functions
            ////////////

            applyRelationshipTypeExtensions: function (relationshipType, extensionTable) {
                var funks = this.getRelationshipExtensions(relationshipType);
                return this.applyFunctions(relationshipType, funks);
            }
        }
    };

    services.factory('ContextService', ['$resource', '$location', function ($resource, $location) {
        console.log("services/contextService.js - services:"+JSON.stringify(services));
        return {

            decorator: function(){
                return {
                    decorateView: function(view){
                        return extensionMgr.applyViewExtensions(view );
                    },
                    decorateViewItem: function(viewItem){
//                        return extensionMgr.applyViewItemExtensions(viewItem, extensionTable);
                    },
                    decorateItemType: function(itemType){
  //                      return extensionMgr.applyItemTypeExtensions(itemType, extensionTable)
                    },
                    decorateRelationshipType: function(relationshipType){
    //                    return extensionMgr.applyRelationshipTypeExtensions(relationshipType, extensionTable);
                    }
                };
            },


			loadContexts: function () {
				return [];
			}

		};
	}]);
})(angular.module('GraphOMaticServices'));
