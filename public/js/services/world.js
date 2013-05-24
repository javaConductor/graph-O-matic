'use strict';

/* World Service */
(function (services) {

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
				var fList = util.getOrCreateObjectFromPath(extensionTable, "views." + viewId + ".items", {});
				fList = util.copy(fList, util.getOrCreateObjectFromPath(extensionTable, "views." + viewId + ".relationships", {}));
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
			getGeneralItemTypeFunctions: function () {
				/// look for itemTypes
				/// look for relationshipTypes
				var fList = util.getOrCreateObjectFromPath(extensionTable, "general.itemTypes", {});
				return fList;
			},
			////////////
			////////////   Overridden Relationship Type Object functions
			////////////
			getRelationshipTypeFunctions: function (relationshipTypeId) {
				/// look for itemTypes.<itemTypeId>.itemTypes
				/// look for itemTypes.<itemTypeId>.relationshipTypes
				//var fList = util.getOrCreateObjectFromPath(extensionTable, "relationshipTypes."+relationshipTypeId, {});
				//return fList;
				return {};//TODO DO THIS LATER
			},
			getGeneralRelationshipTypeFunctions: function () {
				/// look for relationshipTypes
				var fList = util.getOrCreateObjectFromPath(extensionTable, "general.relationshipTypes", {});
				return fList;
			},

			applyRelationshipTypeExtensions: function (relationshipType, extensionTable) {
				var funks = this.getRelationshipExtensions(relationshipType);
				return this.applyFunctions(relationshipType, funks);
			}
		}
	};

	services.factory('World', ['persistence', 'UtilityFunctions', 'ContextService',
		function (persistence, util, ctxtSvc) {
			var thisf = this;
			var mergeViewStyle = function (destViewStyle, srcViewStyle) {
				return util.copy(destViewStyle, srcViewStyle);
			};
			///////////////////////////////////////////////////////////////////////////
			/// Extension functions
			///////////////////////////////////////////////////////////////////////////
			var extensionPoints = {
			};
			thisf.extensionTable = {};

			var itemTypes = [];
			var relationshipTypes = [];
			var itemCategories = [];
			var relationshipCategories = [];
			var findOrCreateObjectFromPath = util.getOrCreateObjectFromPath;

			var addExtensionPointToTable = function (extensionTable, extensionPoint, f) {
				/// get the location
				var insertLocation = util.getOrCreateObjectFromPath(extensionTable, extensionPoint);
				// see if any thing is there
				if (insertLocation.f) {
					// if so, its now the previous one
					insertLocation.previous = insertLocation.f;
				}
				insertLocation.f = f;
				return thisf.extensionTable;
			};

			return {
				self: this,
				persistence: persistence,
				allItems: persistence.allItems,
				allItemTypes: persistence.allItemTypes,
				allRelationships: persistence.allRelationships,
				allViews: persistence.allViews,
				initialize: function (f) {
					thisf.extensionPoints[""] = function (item) {
						return item.data.name
					};
					extensionPoints["_$itypes$City$titleFunction"] = function (item) {
						return item.data.city + (item.data.state.name ? (", " + item.data.state.name ) : "")
					};
					initContexts(itemCategories, relationshipCategories, itemTypes, relationshipTypes, extensionPoints);
					// call user-defined function
					f(this);
					thisf.extensionTable = self.buildExtensionTable(extensionPoints);
					thisf.extensionMgr = extensionMgr(thisf.extensionTable );
					return self;
				},
				initContexts: function (itemCategories, relationshipCategories, itemTypes, relationshipTypes, extensionPoints) {

					var ctxtList = [contextService.basicReality].concat(contextService.loadContexts());

					ctxtList.forEach(function (ctxt) {
						ctxt.updateItemCategories(itemCategories, function (updatedItemCategories) {
							itemCategories = updatedItemCategories;

						});
						ctxt.updateRelationshipCategories(relationshipCategories, function (updatedRelationshipCategories) {
							relationshipCategories = updatedRelationshipCategories;

						});
						ctxt.updateItemTypes(itemTypes, function (updatedItemTypes) {
							itemTypes = updatedItemTypes;

						});
						ctxt.updateRelationshipTypes(relationshipTypes, function (updatedRelationshipTypes) {
							relationshipTypes = updatedRelationshipTypes;
						});
						ctxt.updateExtensionPoints(extensionPoints, function (updatedExtensionPoints) {
							extensionPoints = updatedExtensionPoints;

						});
					});
				},

				decorator: function(){
					return {
						decorateView: function(view){
							return thisf.extensionMgr.applyViewExtensions(view );
						},
						decorateViewItem: function(viewItem){
							return thisf.extensionMgr.applyViewItemExtensions(viewItem, thisf.extensionTable);
						},
						decorateItemType: function(itemType){
							return thisf.extensionMgr.applyItemTypeExtensions(itemType, thisf.extensionTable)
						},
						decorateRelationshipType: function(relationshipType){
							return thisf.extensionMgr.applyRelationshipTypeExtensions(relationshipType, thisf.extensionTable);
						}
					};
				},
				getExtensions: function(viewId, itemId, itemTypeId){
					/// look for pattern extensionTable[viewId]
					/// in order:
					//      if viewId present
					//          get extensions {views.*}
					//      if (itemType present) itemType
					//
					util.getOrCreateObjectFromPath();
				},

				initProperties: function (itemType, defaultProps) {
					return (itemType.parent)
						? util.copy(this.initProperties(itemType.parent, defaultProps), util.mapBy("name", itemType.properties))
						: util.copy(defaultProps, util.mapBy("name", itemType.properties))
				},

				getCategoryViewStyle: function (category, defaultViewStyle) {
					return (category.parent)
						? mergeViewStyle(this.getCategoryViewStyle(category.parent, defaultViewStyle), category.viewStyle)
						: mergeViewStyle(defaultViewStyle, category.viewStyle);
				},
				getItemTypeViewStyle: function (itemType, defaultViewStyle) {
					return (itemType.parent)
						? mergeViewStyle(this.getItemTypeViewStyle(itemType, defaultViewStyle), mergeViewStyle(itemType.viewStyle, this.getCategoryViewStyle(itemType.category)))
						: mergeViewStyle(defaultViewStyle, mergeViewStyle(itemType.viewStyle, this.getCategoryViewStyle(itemType.category)));
				},
				itemTypesForItems: function (itemIdList) {

				},
				findRelatedImages:function(item, f){

					//f(items)

				},

				views: function (f) {
					// an object key=view name, value=view id
					this.world.allViews();
				},

				view: function (viewId, f) {
					// a view or null
					this.persistence.getView(viewId, function (e, v) {
						if (e) return f(e, null);
						v = v || modelFactory.newView();
						f(null, new View(this, v));

					})

				},
				extend: function (extensionPoint, funktion) {
					extensionPoints[extensionPoint] = funktion;
				},

				buildExtensionTable: function (extensions) {
					var Examples = {
						"general": {
							"itemTypes": {
								"DrawItem": {
									f: function (view, element, viewItem) {
									},
									previous: function (view, element, viewItem) {
									}
								},
								"DrawRelationship": {
									f: function (element, relationship, viewElementFrom, viewElementTo) {
									},
									previous: function (element, relationship, viewElementFrom, viewElementTo) {
									}
								}}},
						"views": {
							"44ac-143d-33fa-b3aa": {
								"items": {
									"aaac-143d-33fa-678c-b34c": {
										"GetItemViewInfo": {
											f: function (item) {
												return viewInfo;
											},
											previous: function (item) {
												return viewInfo;
											}
										},
										"GetItemTitle": {
											f: function (item) {
												return title;
											},
											previous: function (item) {
												return item.name;
											}
										},
										"GetItemRelationships": {
											f: function (item) {
												return viewInfo;
											},
											previous: function (item) {
												return relationships;
											}// To and From???
										}
									}

								},
								"relationships": {
									"678c-aaac-143d-33fa-b34c": {
										"GetRelationshipViewInfo": {
											f: function (relationship) {
												return viewInfo;
											},
											previous: function (relationship) {
												return viewInfo;
											}
										},
										"DrawRelationship": {
											f: function (element, relationship, viewElementFrom, viewElementTo) {
											},
											previous: function (element, relationship, viewElementFrom, viewElementTo) {
											}
										}
									}
								}
							}
						},
						"itemTypes": {
							"678c-cccc-143d-b34c-33fa": {
								"GetItemViewInfo": {
									f: function (item) {
										return viewInfo;
									},
									previous: function (item) {
										return viewInfo;
									}
								},
								"GetItemTitle": {
									f: function (item) {
										return viewInfo;
									},
									previous: function (item) {
										return viewInfo;
									}
								},
								"GetItemRelationships": {
									f: function (item) {
										return viewInfo;
									},
									previous: function (item) {
										return relationships;
									}// To and From???
								}
							}
						},
						"relationshipTypes": {
							"143d-b34c-33fa-3482-dd7a": {
								"GetRelationshipViewInfo": {
									f: function (relationship) {
										return viewInfo;
									},
									previous: function (relationship) {
										return viewInfo;
									}
								},
								"GetRelationshipText": {
									f: function (element, relationship, viewElementFrom, viewElementTo) {
									},
									previous: function (element, relationship, viewElementFrom, viewElementTo) {
									}
								},

								"DrawRelationship": {
									f: function (element, relationship, viewElementFrom, viewElementTo) {
									},
									previous: function (element, relationship, viewElementFrom, viewElementTo) {
									}
								}
							}
						}
					};
					var extensionTable = {

					};

					for (var extensionPoint in extensions) {
						extensionTable = self.addExtensionPointToTable(extensionPoint, extensions[extensionPoint], extensionTable);
					}
					return extensionTable;
				}
			}
		}]);


})(angular.module('GraphOMaticServices'));
