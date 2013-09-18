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
		ViewItemMoved: "ViewItemMoved",//backward compat
		RelationshipIdPrefix:"rel_",
		RelationshipElementIdPrefix:"rel_el_",
        events : {
            ViewItemMoved: "view_item_moved",
            SelectView: "select_view",
            ViewSelectionChanged: "view_selection_changed",
            OpenViewEvent: "open_view",
            ViewOpened: "view_opened",
            CloseView: "close_view",
            ViewClosed: "view_closed"
        }
	};

	services.factory('ConstantsService', [ function () {
		return Constants;
	}]);

})(angular.module('GraphOMaticServices'));
