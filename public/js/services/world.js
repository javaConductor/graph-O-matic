'use strict';

/* World Services */

(function(services){

	var extensionMgr = function(extensionTable){

		return {
			getViewFunctions: function(viewId){
				/// look for views.<viewId>.items
				/// look for views.<viewId>.relationships
				///
				var fList = util.getOrCreateObjectFromPath(extensionTable, "views."+viewId+".items", {});
				fList = copy(fList, util.getOrCreateObjectFromPath(extensionTable, "views."+viewId+".relationships", {}));
				return fList;
			},
			getItemTypeFunctions: function(itemTypeId){
				/// look for itemTypes.<itemTypeId>.itemTypes
				var fList = util.getOrCreateObjectFromPath(extensionTable, "itemTypes."+itemTypeId, {});
				return fList;
			},
			getRelationshipTypeFunctions: function(relationshipTypeId){
				/// look for itemTypes.<itemTypeId>.itemTypes
				/// look for itemTypes.<itemTypeId>.relationshipTypes
				//var fList = util.getOrCreateObjectFromPath(extensionTable, "relationshipTypes."+relationshipTypeId, {});
				//return fList;
                return {};//TODO DO THIS LATER
			},
			getItemFunctions: function(itemId){
				/// look for itemTypes.<itemTypeId>.itemTypes
				/// look for itemTypes.<itemTypeId>.relationshipTypes
                var fList = util.getOrCreateObjectFromPath(extensionTable, "relationshipTypes."+relationshipTypeId, {});
                return fList;
			},
            getGeneralItemTypeFunctions: function(){
                /// look for itemTypes
                /// look for relationshipTypes
                var fList = util.getOrCreateObjectFromPath(extensionTable, "general.itemTypes", {});
                fList = util.getOrCreateObjectFromPath(extensionTable, "general.itemTypes", {});
                return fList;
            },

            getGeneralRelationshipTypeFunctions: function(){
                /// look for relationshipTypes
                var fList = util.getOrCreateObjectFromPath(extensionTable, "general.relationshipTypes", {});
                fList = util.getOrCreateObjectFromPath(extensionTable, "general.relationshipTypes", {});
                return fList;
            },

            applyItemTypeExtensions: function (itemType, extensionTable) {
                var funks = this.getExtensions(null,null,itemType);
                funks.forEach(function(value, key){
                    itemType[key] = value;

                });
                return itemType;
            },
            applyRelationshipTypeExtensions: function (relationshipType, extensionTable) {
                var funks = this.getRelationshipExtensions(relationshipType);
                funks.forEach(function(value, key){
                    relationshipType[key] = value;
                });
                return relationshipType;

            },
            applyItemExtensions: function (item, extensionTable) {
                var funks = this.getExtensions(null,item.id,itemTypeId);
                funks.forEach(function(value, key){
                    item[key] = value;

                });
                return item;
            },
            getExtensions: function(viewId, itemId, itemTypeId){
                /// look for pattern extensionTable[viewId]
                /// in order:
                //      if viewId present
                //          get extensions {views.*}
                //      if (itemType present) itemType
                //

                var ret = {};
                ret=util.copy(ret, this.getGeneralItemTypeFunctions());
                if ( viewId ){
                    ret= util.copy(ret, this.getViewFunctions(viewId));
                }
                if (itemTypeId)
                    ret=util.copy(ret, this.getItemTypeFunctions(itemTypeId));
                if (itemId)
                    ret=util.copy(ret, this.getItemFunctions(itemId));

                return ret;
            },
            getRelationshipExtensions:function(relationshipTypeId){
                var ret = {};
                ret=util.copy(ret, this.getGeneralRelationshipTypeFunctions(relationshipTypeId));
                return ret;
            },
            applyRelationshipExtensions: function (relationshipType, extensionTable) {
                return relationshipType;//TODO do this properly
            }

        }
	};

	services.factory('World', ['persistence', 'utilFunctions', 'contextService',
		function (persistence, util, ctxtSvc) {
		/// return the util funcs

			var thisf = this;
			var mergeViewStyle = function (destViewStyle, srcViewStyle) {
				return util.copy(destViewStyle, srcViewStyle);
			};
			///////////////////////////////////////////////////////////////////////////
			/// Extension functions
			///////////////////////////////////////////////////////////////////////////
			var extensionPoints = {
			};
			thisf.extensionTable= {};

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
                /// steal some functions from persistence for convenience
				allItems: persistence.allItems,
				allItemTypes: persistence.allItemTypes,
				allRelationships: persistence.allRelationships,
                createItem: this.persistence.createItem,
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
				initContexts: function (itemCategories, relationshipCategories,
				                        itemTypes, relationshipTypes,
				                        extensionPoints) {

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

				initProperties: function (itemType, defaultProps) {
					return (itemType.parent)
						? util.copy(this.initProperties(itemType.parent, defaultProps), util.mapBy("name", itemType.properties))
						: util.copy(defaultProps, util.mapBy("name", itemType.properties))
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
                        "general":{
						    "GetItemViewStyle": {
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
				},
                getPossibleNewRelationshipTypes: function(itemFrom, itemTo){
                    return this.persistence.getPossibleNewRelationshipTypes(itemFrom, itemTo);

                },
                findItemRelationships: function(item, f){


                }


			}
		}]);


})( angular.module('GraphOMaticServices'));
