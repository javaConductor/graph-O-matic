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
    graphModule.directive('graphViewList', ['GraphWorld','$rootScope', '$compile', 'ContextEventProcessor', '$parse', 'UtilityFunctions', 'ConstantsService',
        function (World, rootScope, $compile, eventProcessor, $parse, util, constants) {
            console.log("directives/graphViewList.js - directives:"+JSON.stringify(graphModule));

            var selectView = function(viewId){
                console.log("GraphViewList.selectView("+viewId+")");
                //deselect all
                d3.select("tab")
                    .attr("active",false);
                // select the one
                if ( viewId ) {
                    var tab = findTab( viewId );
                    if ( tab ){
                        tab.attr( "active", true );
                        return tab;
                    }else
                        return null;
                }else
                    return null;
            };

            /**
             * This function is called when the user wants to open a view that may not be open
             *
             *
             * @param scope
             * @param key
             * @param evt
             * @param viewIdInArray
             */
            var onOpenView = function onOpenView( scope, key, evt, viewIdInArray ){
                var viewId = viewIdInArray[0][0];
                if(!viewId)
                    return;

                console.log("GraphViewList.onOpenView("+scope.$id+","+key+","+viewId+")");
                var t = findTab(viewId);
                // if we have a tab then set it to active
                // if not, add this view to the related scope variable
                if ( t )
                    t.attr( "active", true );
                else{
                    scope[key] = scope[key] || [];
                    World.view(viewId).then(function(view){
                        scope.$apply(function(){
                            scope[key].push( view );
                        });
                        selectView(view.id);
                    })
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

            var closeView = function(viewId){
                console.log("GraphViewList.closeView("+viewId+")");
                var tab = findTab( viewId );
                if ( tab )
                    tab.remove();
            };

            /**
             * Given a view, this function returns the related tab or null if the view
             * is not already open.
             *
             * @param viewId
             * @returns {null}
             */
            var findTab = function findTab(viewId){
                var selector = 'tab[data-view-id="'+ viewId +'"]  ';
                var t = d3.select(selector);
                return t.empty() ? null : t;
            };
  /*
            var scopeKeyForView = function(idx){
                return 'view.'+ idx;
            };
*/
//            var  createContent = function( scope, viewList  ){ };

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    viewList: '=ngModel'
                },
                templateUrl: "/templates/view-list.ejs",
                link: function (scope, element, attrs, model) {
                    console.log("worldViewList.link("+scope.$id+"): ENTER.");
                    //var mdl = $parse( attrs.ngModel );
                    //var viewList = mdl(rootScope);
                    var viewList = scope.viewList;
                    var selection = d3.select( element[0])
                        .select("tabset.worldViewList");

                    /// listen for the OpenView event
                    eventProcessor.on(constants.events.OpenViewEvent,
                        // returns a function waiting ONLY for a view - 1st 2 args fixed.
                       wu.curry(onOpenView, scope, "viewList")
                    );
                    //listen for openView, closeView, selectView, removeView
                    eventProcessor.on(constants.events.SelectView, selectView );
                    eventProcessor.on(constants.events.CloseView, closeView );
//                    createContent( scope, viewList, element  );

                    /// Can we use this to update the screen for each item ???
//                    scope.$watch( "viewList" /*attrs.ngModel*/, function (nuList, oldVal) {
//                        if(nuList) console.log("GraphViewList.link.$watch("+ JSON.stringify(nuList.map(function(x){ return x.id;}) ) +")");
//                        createContent( scope, nuList,  selection );
//                    });

                    console.log("worldViewList.link("+scope.$id+"): EXIT.");
                }
            };
        }])
})(angular.module('graphOmatic.directives'));
