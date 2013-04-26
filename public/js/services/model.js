'use strict';

/* Model Service */

(function(services){
	services.factory('Model', ['persistence', function (persistence) {
		var thisf = this;
        var Validator = require('../../lib/jsonschema/validator');
		var applyProperties = function()
		var types = {
			"ItemType":  {
			create : function(initProperties){
			},
			validate : function(value, f){
			},
			save : function(value, f){

			},
			get : function(id, f){
				persistence.getItemType(id, f);
			}
		},
			"Item":  {
				create : function(initProperties){
				},
				validate : function(value){

				}
			},
			"RelationshipType":  {
				create : function(initProperties){
					var obj = {
						name: initProperties["name"]
					};
					obj = applyProperties(obj, initProperties);
					return obj;
				},
				validate : function(value){

				}
			},
			"Relationship":  {
				create : function(initProperties){
				},
				validate : function(value){

				}
			}
		};
		return {
			model : function(typeName){
				return types[typeName];
			}
		};
	}]);


})(angular.module('GraphOMaticServices'));
