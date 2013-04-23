'use strict';

/* Services */

var neo4jHost = "localhost";
var neo4jPort = 7474;

var Root, Item, ItemType, Relationship, RelationshipTypes;

var services = angular.module('GraphOMaticServices', ['ngResource']);

var modelFactory = {
	newItemType: function (name) {
		return {
			name: name
		}
	},
	newItem: function (itemType, name ) {
		return {

		}
	},
	newRelationshipType: function () {
	},
	newRelationship: function () {
	},
	newView: function () {
	}
};
/**
 *
 */

Item = function (itemObj) {

	return {
		is: function (itemType) {


		}

	};

}

var View = function View(world, viewData) {
	var theItemTypes = world.itemTypesForItems(viewData.itemIdList);
	var newItems = [];
	viewData.items.forEach(function (vitem) {
		newItems.push(this.initViewItem(vitem));
	});
	viewData.items = newItems;
	// returns a function that, given a viewId, will return a
	// View Object representing that view
	/// return the View object for viewId
	return {
		'name': viewData.name,
		"world": world,
		initialize: function (f) {
			f(this);


		},
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
};

var theWorld = function (persistence, contextService) {

		var copy = function (destination, source) {
			if (!destination)
				return source;
			if (!source)
				return destination;

			for (var property in source) {
				destination[property] = source[property];
			}
			return destination;
		};
		var mapBy = function (key, objectArray) {
			var destination = {};
			if (objectArray)
				for (var idx in objectArray) {
					if (objectArray[idx][key])
						destination[objectArray[idx][key]] = objectArray[idx];
				}
			return destination;
		};

		var mergeViewStyle = function (destViewStyle, srcViewStyle) {
			return copy(destViewStyle, srcViewStyle);
		};
		///////////////////////////////////////////////////////////////////////////
		/// Extension functions
		///////////////////////////////////////////////////////////////////////////

		var extensionPoints = {
		};

		var itemTypes = {};
		var itemTypesByName = {};

		var relationshipTypes = {};
		var relationshipTypesByName = {};

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
			return extensionTable;

		};

		return {
			self: this,
			persistence: persistence,
			allItems: persistence.allItems,
			allItemTypes: persistence.allItemTypes,
			allRelationships: persistence.allRelationships,
			extensionTable: {},
			initialize: function (f) {

				extensionPoints[""] = function (item) {
					return item.data.name
				};
				extensionPoints["_$itypes$City$titleFunction"] = function (item) {
					return item.data.city + (item.data.state.name ? (", " + item.data.state.name ) : "")
				};

				f(this);

				this.extensionTable = buildExtensionTable(extensionPoints);
			},
			initContexts: function (itemTypes, relationshipTypes, extensionTable) {

				var ctxtList = [contextService.basicReality].concat(contextService.loadContexts());

				ctxtList.forEach(function(ctxt){
					ctxt.updateItemCategories(itemCategories, function(updatedItemCategories){


					});
					ctxt.updateRelationshipCategories(relationshipCategories, function(updatedRelationshipCategories){


					});
					ctxt.updateItemTypes(itemTypes, function(updatedItemTypes){


					});
					ctxt.updateRelationshipTypes(relationshipTypes, function(updatedRelationshipTypes){


					});
					ctxt.updateExtensionTable(extensionTable, function(updatedExtensionTable){


					});
				});
			},
			applyExtensions: function (world, extensionTable) {

			},
			applyItemTypeExtensions: function (itemType, extensionTable) {
			},
			applyItemExtensions: function (itemType, extensionTable) {
			},
			applyRelationshipExtensions: function (relationshipType, extensionTable) {
			},

			initProperties: function (itemType, defaultProps) {
				return (itemType.parent)
					? copy(this.initProperties(itemType.parent, defaultProps), mapBy("name", itemType.properties))
					: copy(defaultProps, mapBy("name", itemType.properties))
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
			createView: function (viewName, f) {
				// an empty view
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
	};

services.factory('Directory', ['$http', '$location', function ($http, $location) {
	/// send to server for the directory: Map(k.v)
	var urlPrefix = "http://" + $location.hostname + ":" + $location.port + "/";
	var dirUrl = urlPrefix + "directory";
	var thiz = this;
	this.directoryEntries = {}
	$http({method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, url: dirUrl}).
		error(function (data, status, headers, config) {
			return null;
		}).success(function (data) {
			thiz.directoryEntries = data;
		});
	return {
		entries: function () {
			return thiz.directoryEntries;
		},
		prefix: function () {
			return urlPrefix;
		}
	}
}]);

var memberDadClubRelType = {
	name: "memberOfDadsClub",
	parent: "member",
	category: "Social",
	dated: true,
	constraintTo: "item.is('DadsClub')",
	// OR set _$rtype$memberOfDadsClub$constraintTo(itemFrom, itemTo) in World.extend({"entrypoint":function})
	constraintFrom: "item.hasRelationship('Child')"
	// OR set _$rtype$memberOfDadsClub$constraintFrom(itemFrom, itemTo)
};
var relCriteria = "item.hasRelationship('child')";
///
/// We use the graph-o-matic REST API for persistence
///
// steps: send out the /directory to server

/**
 * This service is responsible for the drawing operations of GraphOMatic (c)
 *
 */
services.factory('World', ['persistence', function (persistence) {

	return theWorld(persistence);

}]);

var directory = {
	entries: {  },
	getDirectory: function () {


	}
};

/**
 * This service is responsible for the persistence in graph-O-matic (c)
 *
 * Right now it should be using Neo4J but we should be  able to swap it out for  ANYTHING we want
 *
 */
services.factory('persistence', ['$http', '$resource', 'Directory', function ($http, $resource, restDirectory) {
	var prefix = 'http://' + restDirectory.prefix;
	Item = $resource(prefix + '/item/:id', {id: '@id'});
	ItemType = $resource(prefix + '/item/:id', {id: '@id'});
	Relationship = $resource(prefix + '/relationship/:id', {id: '@id'});
	RelationshipTypes = $resource(prefix + '/relationship/types');

	return {
		getItem: function (itemId, f) {
			Item.get({}, {id: itemId}, function (item) {
				f(null, item);
			}, function (err) {
				f('Could not get Item:' + err, null);
			})
		},
		removeItem: function (itemId, f) {
		},

		saveItem: function (item, f) {
			Item.save({}, item, function (savedItem) {
				item.id = savedItem.id;
				f(null, savedItem);
			}, function (err) {
				f('Could not save item:' + err, null);
			});
		},

		getRelatedItems: function (itemId, relationshipType, f) {
			Item.get({}, {id: itemId}, function (items) {
				f(null, items);
			}, function (err) {
				f('Could not get Item:' + err, []);
			})
		},

		getItemCategory: function (categoryId, f) {
		},
		getItemCategories: function (f) {
		},
		getRelationshipCategory: function (categoryId, f) {
		},
		getRelationshipCategories: function (f) {
		},
		getView: function (viewId, f) {
		},
		removeViewItem: function (viewItem, f) {
		},

		removeView: function (viewId, f) {
		},
		saveView: function (viewData, f) {
		},
		createViewItem: function (theViewItem, f) {
		},
		saveViewItem: function (viewItem, f) {
		}

	}
}]);
