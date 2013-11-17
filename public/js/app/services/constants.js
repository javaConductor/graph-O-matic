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
            ViewOptionsChanged: "view_options_changed",
            CloseView: "close_view",
            ViewClosed: "view_closed",
            SelectionChanged: "selection_changed"// data -
        },
        viewItemStates:{
            SummaryEdit: "summary_edit",
            SummaryView: "summary_view",
            DataEdit: "data_edit",
            DataView: "data_view",
            FullScreen: "full_screen",
            Hidden: "hidden"
        }
	};

	services.factory('ConstantsService', [ function () {
        console.log("services/constants.js - services:"+JSON.stringify(services));
        return Constants;
	}]);

})(angular.module('graph-O-matic-services'));
