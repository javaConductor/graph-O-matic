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

                //the\

            };
            var onViewSelectionChanged = function onViewSelectionChanged( scope, key, view ){

                /// get the options from the view
                scope[key] = view.options;


            };

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                templateUrl: 'templates/viewOptions.ejs',
                link: function (scope, element, attrs, model) {
                    console.log("viewOptions.link("+scope.$id+"): ENTER.");
                    var accordionSelection = d3.select( element[0])
                        .select("accordion");


                    /// listen for the ViewOptionsChanged event
                    eventProcessor.on(constants.events.ViewSelectionChanged,
                        // returns a function waiting ONLY for a view - 1st 2 args fixed.
                       wu.curry(onViewSelectionChanged, scope, attrs.ngModel)
                    );

                }/// link
            };
        }])
})(angular.module('graphOmatic.directives'));
