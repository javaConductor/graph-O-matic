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
console.log("graphViewList.js");
(function (graphModule) {
    graphModule.directive('graphViewList', ['$rootScope', '$compile', 'ContextEventProcessor', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (rootScope, $compile, eventProcessor, $parse, util, constants) {
            console.log("directives/graphViewList.js - directives:"+JSON.stringify(graphModule));
            /**
             * This function is called when the user wants to open a view that may not be open
             *
             * @param scope
             * @param key
             * @param view
             */
            var onOpenView = function onOpenView( scope, key, view ){
                var t = findTab(view);
                // if we have a tab then set it to active
                // if not, add this view to the related scope variable
                if ( t )
                    t.attr("active",true);
                else{
                    scope[key] = scope[key] || [];
                    scope[key].push(view);
                }
            };

            /**
             * onSelectedFunc(view)
             *
             * Creates a function that fires an event => viewSelectionChange
             *
             * @param view
             * @returns {Function}
             */
            var onSelectedFunc = function(view){
                return function(){
                    eventProcessor.emit(constants.events.ViewSelectionChanged, [view.id] );
                };
            };

            var selectView = function(viewId){
                //deselect all
                d3.select("tab")
                    .attr("active",false);
                // select the one
                if(viewId)
                    d3.select("tab[data-view-id="+viewId+"]")
                        .attr("active",true);
            };

            var closeView = function(viewId){
                d3.select("tab[data-view-id="+viewId+"]")
                    .remove();
            };

            /**
             * Given a view, this function returns the related tab or null if the view
             * is not already open.
             *
             * @param view
             * @returns {null}
             */
            var findTab = function findTab(view){
                var selector = 'tab[data-view-id="'+ view.id +'"]  ';
                var t = d3.select(selector);
                return t.empty() ? null : t;
            };

            var  createContent = function( viewList, tabsetSelection  ){

                viewList = viewList || [];
                var selection = tabsetSelection.selectAll("tab")
                    .data(viewList);

                ///FIX THIS !!!!
                selection.enter()
                        .append("tab")
                        .attr("heading", function(d,i){return d.name;})
                        .attr("active", true)
                        .attr("class","worldViewList")
                        .attr("select", function(d,i){  return onSelectedFunc(d); })
                        .attr("data-view-id",  function(d,i){  return (d.id); })
                            //.append( $compile("<graph-view/>")(scope))
                            .append(("<graph-view />"))
                            .attr("ng-model", function(d,i){  return 'viewList['+ i+']'; })
            };

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    viewList: '=ngModel'
                },
                template: "<tabset class='worldViewList'/>",
                link: function (scope, element, attrs, model) {
                    console.log("worldViewList.link("+scope.$id+"): ENTER.");
                    //var mdl = $parse( attrs.ngModel );
                    var viewList = scope.viewList;
                    //var viewList = mdl(rootScope);
                    var selection = d3.select( element[0])
                        .select("tabset.worldViewList");

                    /// listen for the OpenView event
                    eventProcessor.on(constants.events.OpenViewEvent,
                        // returns a function waiting ONLY for a view - 1st 2 args fixed.
                       wu.curry(onOpenView, scope, attrs.ngModel)
                    );
                    //listen for openView, closeView, selectView, removeView
                    eventProcessor.on(constants.events.SelectView, selectView );
                    eventProcessor.on(constants.events.CloseView, closeView );
                    createContent( viewList, selection  );

                        /// Can we use this to update the screen for each item ???
                    scope.$watch( "viewList", function (nuList, oldVal) {
                        createContent( nuList,  selection );
                    });
                    console.log("worldViewList.link("+scope.$id+"): EXIT.");
                }
            };
        }])
})(angular.module('graphOmatic.directives'));
