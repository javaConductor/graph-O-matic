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
    services.factory('ContextEventProcessor', ['$rootScope',
        function ( rootScope) {
            console.log("services/eventProcessor.js - services:"+JSON.stringify(services));

            ///////////////////  return the service function
            return {

                /**
                 *
                 * @param eventName
                 * @param f   f([data]) function taking an array of data
                 */
                on:function(eventName, f ){
                    rootScope.$on(eventName, f);
                },
                emit:function(eventName, eventData){
                    rootScope.$broadcast(eventName,[eventData]);
                }

            }
        }
    ]);

})(angular.module('GraphOMaticServices'));
