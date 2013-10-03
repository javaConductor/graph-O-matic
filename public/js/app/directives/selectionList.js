/**
 * Spacely Text & Binary Goods Inc.
 *
 * User: lcollins
 * Date: 9/29/13
 * Time: 2:37 AM
 *
 */

angular.module('graph-o-matic-directives', []).
    directive('selectionList', ['$compile', '$parse','ContextEventProcessor','ConstantsService',
        function ($compile, $parse, eventProcessor,constants) {

var onList = [];
var offList = [];

        function createLists(){
            onList = [];
            offList = [];
            d3.select(".cbx")
                .forEach(function(d,i){
                    if(d3.select(this).attr("selected"))
                        onList.push(d);
                    else
                        offList.push(d);
                })
        }

        function selectionClicked(d, labelFn, valueFn, element, event ){
            var bChecked = element.attr("checked");

            createLists();
            var evt = {
                value: valueFn(d),
                label: labelFn(d),
                selected: bChecked,
                selectedList: onList,
                deselectedList: offList
            };

            /// fire event
            eventProcessor.emit(constants.events.SelectionChanged, [evt]);
        };

        function createListItems(itemList, container, labelFn, valueFn,normalClass,selectionClass)
        {
            var rowEnter = container.selectAll("tr.data-row")
                .data(itemList)
                .enter();

            var tr = rowEnter.append("tr")
                .attr("class", "data-row");

            tr.append("td")
                .attr("class", function(d,i){
                    var b = d3.select(this).attr("selected");
                    return b ? selectionClass : normalClass;
                })
                .text(function(d,i){
                    return labelFn(d);
                })


            tr.append("td")
                .attr("class", function(d,i){
                    var b = d3.select(this).attr("selected");
                    return b ? selectionClass : normalClass;
                })
                .append("input")
                    .attr("id", function(d,i){
                        return "cbx-"+ i;
                    })
                    .attr("class", "cbx")
                    .attr("type", "checkbox")
                    .on("click", function(d,i){
                        wu.curry(selectionClicked, d, labelFn, valueFn, d3.select(this));
                    });
        };

        return {
            template: "<table > </table>",
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: '=ngModel',
                labelFn:'&label-fn',
                valueFn:'&value-fn',
                title: '@title',
                normalClass:'@class',
                selectionClass: '@selection-class'
            },
            'require': '?ngModel',
            link: function (scope, element, attrs, model) {

                if (!model)
                    return;

                var container = d3.select(element[0]);
                var tr = container.append("tr")
                    .attr("class", "header-row");

                tr.append("th")
                    .attr("colspan","2")
                    .text(scope.title);

                createListItems(scope.ngModel, container, scope.labelFn, scope.valueFn, scope.normalClass, scope.selectionClass);

                /// change the view if the data changes
                model.$render = function () {
                    /// redisplay the item inside the view
                    if (this.$modelValue) {
                        // use new value
                        // nuData = this.$modelValue;
                    }
                }
            }
        };
    }]);
