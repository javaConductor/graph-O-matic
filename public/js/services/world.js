'use strict';

/* World Services */

(function(services){
	services.factory('World', ['persistence', 'utilFunctions', 'contextService',
		function (persistence, util, ctxtSvc) {
		/// return the util funcs

			var mergeViewStyle = function (destViewStyle, srcViewStyle) {
				return util.copy(destViewStyle, srcViewStyle);
			};
			///////////////////////////////////////////////////////////////////////////
			/// Extension functions
			///////////////////////////////////////////////////////////////////////////
			var thisf = this;
			var extensionPoints = {
			};
			thisf.extensionTable= {};

			var itemTypes = [];
			var relationshipTypes = [];
			var itemCategories = [];
			var relationshipCategories = [];
			var findOrCreateObjectFromPath = function findOrCreateObjectFromPath(theObject, path) {
				var objAtPath = eval("theObject." + path);
				if (!objAtPath) {
					eval("theObject." + path + " = {}");
					objAtPath = eval("theObject." + path);
				}
				return objAtPath;
			};

			var addExtensionPointToTable = function (extensionTable, extensionPoint, f) {
				/// get the location
				var insertLocation = self.findOrCreateObjectFromPath(extensionTable, extensionPoint);
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

				initialize: function (f) {
					thisf.extensionPoints[""] = function (item) {
						return item.data.name
					};
					extensionPoints["_$itypes$City$titleFunction"] = function (item) {
						return item.data.city + (item.data.state.name ? (", " + item.data.state.name ) : "")
					};
					initContexts(itemCategories, relationshipCategories, itemTypes, relationshipTypes, extensionPoints);
					f(this);
					thisf.extensionTable = buildExtensionTable(extensionPoints);
					return self;
				},
				initContexts: function (itemCategories, relationshipCategories, itemTypes, relationshipTypes, extensionPoints) {

					var ctxtList = [contextService.basicReality].concat(contextService.loadContexts());

					ctxtList.forEach(function(ctxt){
						ctxt.updateItemCategories(itemCategories, function(updatedItemCategories){
							itemCategories = updatedItemCategories;

						});
						ctxt.updateRelationshipCategories(relationshipCategories, function(updatedRelationshipCategories){
							relationshipCategories = updatedRelationshipCategories;

						});
						ctxt.updateItemTypes(itemTypes, function(updatedItemTypes){
							itemTypes = updatedItemTypes;

						});
						ctxt.updateRelationshipTypes(relationshipTypes, function(updatedRelationshipTypes){
							relationshipTypes = updatedRelationshipTypes;
						});
						ctxt.updateExtensionPoints(extensionPoints, function(updatedExtensionPoints){
							extensionPoints = updatedExtensionPoints;

						});
					});
				},
				applyExtensions: function (world, extensionTable) {

				},
				applyItemTypeExtensions: function (itemType, extensionTable) {
				},
				applyItemExtensions: function (item, extensionTable) {
					item.properties = this.initProperties(item.itemType,{});
					return item;
				},
				applyRelationshipExtensions: function (relationshipType, extensionTable) {
				},

				initProperties: function (itemType, defaultProps) {
					return (itemType.parent)
						? util.copy(this.initProperties(itemType.parent, defaultProps), mapBy("name", itemType.properties))
						: util.copy(defaultProps, mapBy("name", itemType.properties))
				},

				getCategoryViewStyle: function (category, defaultViewStyle) {
					return (category.parent)
						? mergeViewStyle(getCategoryViewStyle(category.parent, defaultViewStyle), category.viewStyle)
						: mergeViewStyle(defaultViewStyle, category.viewStyle);
				},
				getItemTypeViewStyle: function (itemType, defaultViewStyle) {
					return (itemType.parent)
						? mergeViewStyle(getItemTypeViewStyle(itemType, defaultViewStyle), mergeViewStyle(itemType.viewStyle, getCategoryViewStyle(itemType.category)))
						: mergeViewStyle(defaultViewStyle, mergeViewStyle(itemType.viewStyle, getCategoryViewStyle(itemType.category)));
				},

				views: function (f) {
					// an object key=view name, value=view id
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
						"GetItemViewInfo": {
							f: function (item) {
								return viewInfo;
							},
							previous: function (item) {
								return viewInfo;
							}
						},
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
						},
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


})( angular.module('GraphOMaticServices'));
