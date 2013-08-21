/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {
    var ItemEditorObject = function(world, view, decoratedViewItem )
    {
            return {
	            item: decoratedViewItem,
                is: function (itemType) {

                },
                position:function(){
                    return decoratedViewItem.viewPosition;
                },
                image: function(){
                    /// for now we use the default from the itemType
                    decoratedViewItem.image = world.findRelatedImages(decoratedViewItem.item, function(imgItems){
                    });
                },
                title: function(){
                    return decoratedViewItem.data()['title'];
                },
                style: function(){
                    return decoratedViewItem.viewStyle;
                },
                properties:function(){
                    return decoratedViewItem.item.itemType.properties;
                },
                data: function(){
                    return decoratedViewItem.item.data;
                }
            };

        }

	services.factory('ItemEditor', ['$rootScope', 'UtilityFunctions', 'World',
		function ( rootScope, util, theWorld ) {

            ///////////////////  return the service function
			return function(itemType, item ){
				return new ItemEditorObject( theWorld, viewData);
			}


		}]);

})(angular.module('GraphOMaticServices'));
