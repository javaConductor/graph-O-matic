var graphModule = angular.module('graphOmatic.directives');
graphModule.directive('graphView', ['$compile', '$timeout', function ($compile, $timeout) {
    console.log("creating directive graphView");

    return {
        restrict:'E',
        replace:true,
        controller: "GraphItemController",
        scope:{localModel: "="},
        'require':'?ngModel',
        link:function (scope, element, attrs, model) {
            if (!model)
                return;
            element = angular.element(element);

            // called when data value changes(like a watch)
            var textPromise;
            // called when data value changes(like a watch)
            model.$render = function () {
                console.log('$render');
                console.dir(this.$modelValue);
                if(this.$modelValue){
                    var graphOptions = this.$modelValue;
                    //var jsonObj = angular.fromJson( jsonText );
                    if(graphOptions){
                        var nuElem = angular.element("<div></div>");
                        addItems(jsonObj, graphOptions);
                        element.html(nuElem);
                    }
                }
            };
            /// get ViewData from the parent scope
            var modelVar = attrs.ngModel;
            var viewData = scope.$parent.$eval(modelVar);
            /// add it to the scope in a bidirectional way.
            scope.viewData = viewData;
            //determine template
            var t = '<svg><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="400" width="450">'+
                "   <graph-item ng-repeat='item in viewData.items' id='item.id' ng-model='item' data-id='{{item.id}}' >" +
                "   </graph-item>" +
                "   <graph-relationship ng-repeat='relationship in viewData.relationships'  ng-model='relationship' data-id='{{relationship.id}}' >" +
                "   </graph-relationship>" +
                "</svg>";
            //template meets data
            element.html($compile(t)(scope));
            //listen to changes in the text box
            (element).find('.verseSpec').bind('keyup change', function (e) {
                updateVerseSpec(e.target.value);
            });
        }
    };
}]);
/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 4/28/13
 * Time: 3:10 PM
 * To change this template use File | Settings | File Templates.
 */
