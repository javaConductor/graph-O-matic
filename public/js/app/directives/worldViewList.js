/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 8/27/13
 * Time: 1:47 AM
 * To change this template use File | Settings | File Templates.
 */
(function (graphModule) {
    var cx = 60, cy = 60;
    graphModule.directive('worldViewList', ['$rootScope', '$compile', '$timeout', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (rootScope, $compile, $timeout, $parse, util, constants) {
            console.log("creating directive graphItem");

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template:"<tabset> </tabset>",
                link: function (scope, element, attrs, model) {
                    console.log("worldViewList.link("+scope.$id+"): ENTER.");

                    var mdl = $parse( attrs.ngModel);
                    var viewList = mdl(rootScope);

                    // these elements should already be in the DOM

                    scope.$on(constants.ViewItemMovedEvent + fromViewItem.id, moveHandler);
                    scope.$on(constants.ViewItemMovedEvent + toViewItem.id, moveHandler);
                    element.append(line);
                    console.log("graphRelationship.link("+scope.$id+"): Added line to DOM");
                    /// Can we use this to update the screen for each item ???
                    model.$render = function () {
                        /// redisplay the item inside the view
                    }
                }
            };
        }])
})(angular.module('graphOmatic.directives'));
