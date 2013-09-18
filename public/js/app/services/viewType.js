/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {

    var ViewTypeObject = function ViewTypeObject(world, viewType){
            return {
                name:           viewType.name ,
                id:                 viewType.id,
                pathPrefix:     function(){ return viewType.name },
                scripts :          viewType.scripts,
                css:                viewType.styleSheets,
                defaultOptions: {},
                isType:           function (viewType) {

                }
            };
        };


	services.factory('ViewTypeManager', ['persistence', 'UtilityFunctions', 'World',
		function ( persistence, util, theWorld ) {


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
				return new ViewTypeObject( theWorld, viewData);
			}

		}]);

})(angular.module('GraphOMaticServices'));
