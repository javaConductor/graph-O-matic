/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {

    var ViewItemFilterObject = function ViewItemFilterObject( viewObject ){

            return {

                filter: function(){



                }
            };
        };

	services.factory('ViewItemFilter', ['persistence', 'UtilityFunctions', 'World',
		function ( persistence, util, theWorld ) {

            console.log("services/viewType.js - services:"+JSON.stringify(services));

            var initViewTypes = function(){

                // look in /public/viewTypes for the viewType defs
                // for each dir
                //  find artifacts.json
                //

            };


            return {
                init: initViewTypes

            };

			return function(viewData){
				return new ViewItemCtrl( theWorld, viewData);
			}

		}]);

})(angular.module('graph-O-matic-services'));
