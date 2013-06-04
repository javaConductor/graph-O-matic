/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/22/13
 * Time: 6:52 PM
 */
(function (services) {

	var Constants = {
		ViewItemIdScopePrefix: 'vi_',
		ViewItemElementIdPrefix: 'vi_el_',
		ViewItemMovedEvent: "ViewItemMoved",
		RelationshipIdPrefix:"rel_",
		RelationshipElementIdPrefix:"rel_el_"
	};

	services.factory('ConstantsService', ['$resource', '$location', function ($resource, $location) {
		return Constants;

	}]);

})(angular.module('GraphOMaticServices'));
