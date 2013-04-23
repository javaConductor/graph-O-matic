/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/22/13
 * Time: 10:55 PM
 */
(function (services) {
	var basicRealityCtxt = {
		"name": "$Builtin",
		itemCategories: [
			/* mathematics, family, school,  */
			{"name": "People", parent: "", description: ""},
			{"name": "Animals", parent: "", description: ""}
		],
		itemTypes: [
			{
				"name": "Person",
				category: "People",
				data: [
					{"name": firstName, type: text, required: true},
					{"name": lastName, type: text},
					{"name": birthdate, relationshipType: 'hasBirthdate', itemType: "CalendarDate"},
					{"name": deathDate, relationshipType: 'diedOn', itemType: "CalendarDate"},
					{"name": family, relationshipType: 'relatedTo', itemType: "Person"},
					{"name": residence, relationshipType: 'resides', itemTypes: ["StreetAddress", "City", "State", "Country"]},
				]
			},
			{
				"name": "Man",
				parent: "Person",
				defaults: [
					{"name": "sex", "value": "male"}
				]
			},
			{
				parent: "Person",
				"name": "Woman",
				defaults: [
					{"name": "sex", "value": "female"}
				]
			},
			{
				"name": "Notes",
				"category": "Notes",
				"requiredData": [
					{"name": "date", "type": "date"},
					{"name": "notes", "type": "text"}
				]
			},
			{
				"name": "EmailAddress",
				"properties": [
					{"name": "email", "type": "emailAddress"}
				]
			}
		],
		relationshipTypes: [
		/* friend, parent, mother, father, brother, sister, residesAt, ingredientOf,
		* co-worker, employee,
		* */
		],
		extensions: {
		},
		relationshipCategories: [
		/* family, medical, financial, */
		]
	};

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
