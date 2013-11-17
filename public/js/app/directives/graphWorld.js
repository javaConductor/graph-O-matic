/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 8/27/13
 * Time: 1:47 AM
 *
 * This directive is used to wrap a Angular Bootstrap Tab Container.
 *
 * Emits Events:
 *      viewSelectionChanged- - emitted when view selection is changed
 *
 * Consumes Events:
 *      openViewEvent  - recv'd when the user wants to open a view that is not open
 *
 */
console.log("graphWorld.js");
(function (graphModule) {
    graphModule.directive('GraphWorld', ['$rootScope', '$compile', 'ContextEventProcessor', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (rootScope, $compile, eventProcessor, $parse, util, constants) {
            console.log("directives/graphWorld.js - directives:"+JSON.stringify(graphModule));

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                templateUrl: 'templates/world.ejs',
                link: function (scope, element, attrs, model) {
                    console.log("graphWorld.link("+scope.$id+"): ENTER.");
                    var mdl = $parse( attrs.ngModel);
                    //var viewList = mdl(rootScope);
                    var selection = d3.select( element[0])
                        .select("tabset.worldViewList");

//                    /// listen for the OpenView event
                    ///
                    scope.$watch( "currentView", function ( nuCurrentView, oldVal) {
                        console.dir("nuCurrentView: ", nuCurrentView);
                        // fire the openView event
                        if ( nuCurrentView ){
                            console.log("graphWorld.$watch(): new="+ JSON.stringify(nuCurrentView) );
                            eventProcessor.emit(constants.events.OpenViewEvent, [nuCurrentView.id]);
                        }
                        else
                            console.log("graphWorld.$watch(): currentView=NULL!" );
                    });
                    console.log( "graphWorld.link(" + scope.$id + "): EXIT!" );
                }
            };
        }])
})(angular.module('graphOmatic.directives'));
