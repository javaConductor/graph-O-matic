/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/22/13
 * Time: 6:52 PM
 */
(function (services) {

	var Constants = {
		ViewItemIdPrefix: 'vi',
		ViewItemMovedEvent: "ViewItemMoved"
	};

	services.factory('ConstantsService', ['$resource', '$location', function ($resource, $location) {
		return Constants;

	}]);
})(angular.module('GraphOMaticServices'));

