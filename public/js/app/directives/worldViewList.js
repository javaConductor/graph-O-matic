/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 8/27/13
 * Time: 1:47 AM
 *
 * This directive is used to wrap a Angular Bootstrap Tab Container.
 *
 * Emits Events:
 *      viewSelectionChangedEvent- - emitted when view selection is changed
 *
 * Consumes Events:
 *      openViewEvent  - recv'd when the user wants to open a view that is not open
 *
 */
(function (graphModule) {
    graphModule.directive('worldViewList', ['$rootScope', '$compile', 'ContextEventProcessor', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (rootScope, $compile, eventProcessor, $parse, util, constants) {
            console.log("creating directive world-view-list");
            /**
             * This function is called when the user wants to open a view that may not be open
             * @param evt
             */
            var openViewHandler = function openViewHandler( scope, key, view ){
                var t = findTab(view);
                if (t)
                    t.active = true;
                else{
                    scope[key] = scope[key] || [];
                    scope[key].push(view);
                }
            };

            /**
             * onSelectFunc(view)
             *
             * Creates a function that fires an event => viewSelectionChange
             *
             * @param view
             * @returns {Function}
             */
            var onSelectFunc = function(view){
                return function(){
                    eventProcessor.emit(constants.events.ViewSelectionChangedEvent, [view] );
                };
            };

            /**
             * Given a view, this function returns the related tab or null if the view
             * is not already open.
             *
             * @param view
             * @returns {null}
             */
            var findTab = function findTab(view){
                var selector = 'tab[data-view-id="'+ view._id +'"]  ';
                var t = d3.select(selector);
                return t.empty() ? null : t.node();
            };

            var  createContent = function( scope, viewListVar, tabsetSelection  ){

                var viewList = scope[viewListVar] || [];
                var selection = tabsetSelection.selectAll("tab")
                    .data(viewList);

                var ngModel = viewListVar+'['+ i+']';
                selection.enter()
                        .append("tab")
                        .attr("heading", function(d,i){return d.name;})
                        .attr("active", true)
                        .attr("select", function(d,i){  return onSelectFunc(d); })
                        .attr("data-view-id",  function(d,i){  return (d._id); })
                            .append( $compile("graph-view")(scope))
                            .attr("ng-model", function(d,i){  return  viewListVar+'['+ i+']'; })
            };

            var tmplate ='<div class="worldView"><tabset></tabset></div><div class="worldViewSettings">View Options</div>';

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template:tmplate,
                link: function (scope, element, attrs, model) {
                    console.log("worldViewList.link("+scope.$id+"): ENTER.");
                    var mdl = $parse( attrs.ngModel);
                    //var viewList = mdl(rootScope);
                    var selection = d3.select( element[0])
                        .select("tabset");
                    /// listen for the OpenView event
                    eventProcessor.on(constants.events.OpenViewEvent,
                        // returns a function waiting ONLY for a view - 1st 2 args fixed.
                       wu.curry(openViewHandler, scope, attrs.ngModel)
                    );
                    /// Can we use this to update the screen for each item ???
                    scope.$watchCollection( attrs.ngModel, function (nuList, oldVal) {
                        createContent( scope, attrs.ngModel, selection, nuList );
                    });
                }
            };
        }])
})(angular.module('graphOmatic.directives'));
