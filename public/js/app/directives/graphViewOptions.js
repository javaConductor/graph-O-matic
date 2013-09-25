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
console.log("graphViewOptions.js");
(function (graphModule) {
    graphModule.directive('viewOptions', ['$rootScope', '$compile', 'ContextEventProcessor', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (rootScope, $compile, eventProcessor, $parse, util, constants) {
            console.log("directives/graphViewOptions.js - directives:"+JSON.stringify(graphModule));
            /**
             * This function is called when the user wants to open a view that may not be open
             *
             * @param scope
             * @param key
             * @param view
             */
            var onOptionsChanged = function onOptionsChanged( scope, key, view ){

            };

            var selectView = function(viewId){
                //deselect all
                d3.select("tab")
                    .attr("active",false);
                // select the one
                if(viewId)
                    d3.select("tab[data-view-id='+viewId+']")
                        .attr("active",true);
            };

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                templateUrl: 'templates/viewOptions.ejs',
                link: function (scope, element, attrs, model) {
                    console.log("viewOptions.link("+scope.$id+"): ENTER.");
                    var mdl = $parse( attrs.ngModel);
                    //var viewList = mdl(rootScope);
                    var selection = d3.select( element[0])
                        .select("tabset.viewOptions");

                    /// listen for the ViewOptionsChanged event
                    eventProcessor.on(constants.events.ViewOptionsChanged,
                        // returns a function waiting ONLY for a view - 1st 2 args fixed.
                       wu.curry(onOptionsChanged, scope, attrs.ngModel)
                    );

                }
            };
        }])
})(angular.module('graphOmatic.directives'));
