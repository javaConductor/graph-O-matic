/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 8/13/13
 * Time: 12:05 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 4/24/13
 *
 * Time: 12:08 AM
 */
(function (services) {
    services.factory('ContextEventProcessor', ['$rootScope', 'UtilityFunctions', 'World',
        function ( rootScope, util, theWorld ) {
            ///////////////////  return the service function
            return function(  ){
                var theListeners = {};

                this.on = function(eventName, f ){

                        if(!theListeners[eventName]){
                            theListeners[eventName] = [f];
                        }
                        else
                            theListeners[eventName].push( f );
                    };
                    this.emit = function(eventName, eventData){
                        theListeners.forEach(function(listnr){

                            listnr(eventData);
                        } );
                    };
                };
        }]);

})(angular.module('GraphOMaticServices'));
