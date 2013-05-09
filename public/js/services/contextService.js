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
			}

		};

	};

	services.factory('Context', ['$resource', '$location', function ($resource, $location) {
		return {
			basicReality: fContext(basicRealityCtxt),
			loadContexts: function () {
				return [];
			}

		};
	}]);
})(angular.module('GraphOMaticServices'));
