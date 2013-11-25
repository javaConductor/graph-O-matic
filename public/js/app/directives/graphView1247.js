//var graphModule = ;
(function (graphModule) {

    graphModule.directive('graphView', ['$compile', '$parse', 'ConstantsService', 'UtilityFunctions', '$timeout', 'RelationshipManager',
        function ($compile, $parse, constants, utils, timer, relationshipMgr) {
            console.log("creating directive graphView");

            function DndHandlerNu(theViewItem, fItemMoved) {
                if (!theViewItem) return null;

                this.viewItem = theViewItem;
                this.lastX = 0;
                this.lastY = 0;
                this.beforeLastX = 0;
                this.beforeLastY = 0;
                this.initX = 0;
                this.initY = 0;
                this.initTop = 0;
                this.initLeft = 0;

                this.dragStart = $.proxy(function (event) {
                    var evt = event.originalEvent;
                    console.log('dragStartEvent ' +
                        'client -> x:' + evt.clientX + " y:" + evt.clientY +
                        ' page  -> x:' + evt.pageX + " y:" + evt.pageY);

                    var el = angular.element(evt.currentTarget);
                    //store the difference in top/left and where the mouse is
                    this.initX = evt.pageX;
                    this.initY = evt.pageY;
                    var off = el.offset();
                    this.initTop = off.top;
                    this.initLeft = off.left;
                    this.beforeLastX = this.lastX = off.left;
                    this.beforeLastY = this.lastY = off.top;
                    console.log('dragStartEvent ' +
                        'element pos -> x:' + this.initLeft + " y:" + this.initTop);
                    return evt;
                }, this);

                this.drag = $.proxy(function (event) {
                    var evt = event.originalEvent;
                    if (evt.preventDefault)
                        evt.preventDefault();
//			console.log('dragEvent ' +
//					' client   -> x:' + evt.clientX + " y:" + evt.clientY +
//					' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
//					' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
//					' page   -> x:' + evt.pageX + " y:" + evt.pageY);

                    this.beforeLastX = this.lastX === 0 ? evt.pageX : this.lastX;
                    this.beforeLastY = this.lastY === 0 ? evt.pageY : this.lastY;

                    this.lastX = evt.pageX;
                    this.lastY = evt.pageY;
                    var ofs = angular.element(evt.currentTarget).offset();

                    $('#position').text(ofs.left + ', ' + ofs.top);

                    var el = angular.element(evt.currentTarget);
                    var x = (this.beforeLastX - this.initX) + this.initLeft;
                    var y = (this.beforeLastY - this.initY) + this.initTop;
//			console.log('dragEndEvent ' +
//					' last -> x:' + this.beforeLastX + " y:" + this.beforeLastY +
//					' new pos -> x:' + x + " y:" + y);
                    el.offset({"left": x, "top": y});

                }, this);

                this.dragOver = $.proxy(function (event) {
                    var evt = event.originalEvent;

//		console.log('dragOverEvent ' +
//			//'client -> x:'+evt.clientX + " y:"+evt.clientY+
//		  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
//		  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
                    if (evt.preventDefault)
                        evt.preventDefault();
                    var el = angular.element(evt.currentTarget);
                    return evt;
                }, this);

                this.drop = $.proxy(function (event) {
                    var evt = event.originalEvent;

                    if (evt.preventDefault)
                        evt.preventDefault();
                    console.log('dropEvent ' +
                        ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
                        ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
                        ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
                        ' page   -> x:' + evt.pageX + " y:" + evt.pageY);

                }, this);

                this.dragEnd = $.proxy(function (event) {
                    var evt = event.originalEvent;
                    if (evt.preventDefault)
                        evt.preventDefault();
                    var el = angular.element(evt.currentTarget);
                    var off = el.offset();
                    console.log('dragEndEvent ' +
                        ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
                        ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
                        ' moverOffset   -> x:' + off.left + " y:" + off.top +
                        ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
                        ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
                    // broadcast the move
                    fItemMoved(this.viewItem, off.left, off.top);
                    return evt;
                }, this);
                this.dropped = $.proxy(function (event, node) {
                    var evt = event.originalEvent;

                    console.log('droppedEvent ' +
                        ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
                        ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
                        ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
                        ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
                }, this);

                return this;
            };

            var dragfn = d3.behavior.drag()
                .on('dragstart', function () {
                    var sel = d3.select(this),
                        cx = sel.attr('cx'),
                        cy = sel.attr('cy');
                    var cursorData = d3.select(this).data();

                })
                .on('drag', function (d, i) {
                    var sel = d3.select('.drag'),
                        cy = sel.attr('cy');
                    sel.attr('cy', parseInt(cy) + d3.event.dy);

                    console.log(d, i, cy);
                })
                .on('dragend', function (d, i) {
                    var drag = d3.selectAll('.drag');
                    drag.remove();
                });

            var itemElementMap = {};
            var itemRelationshipMap = {};

            function addItems(parentElement, viewItems, scope) {

                var viewEnter = (parentElement).selectAll("g")
                    .data(viewItems)
                    .enter()
                    .append("g")
                    .attr("id", function (d) {
                        return utils.viewItemIdToElementId(d.id);
                    })
                    .attr("ng-model", function (d) {
                        return utils.viewItemIdToScopeName(d.id)
                    })
                    .attr("style", function (d) {
                        return "left:" + d.position().x + "px;top:" + d.position().y + "px"
                    })
                    .each(function (d, i) {
                        scope[utils.viewItemIdToScopeName(d.id)] = d;
                        var thing = d3.select(this);
                        var pos = utils.elementPosition(thing.node());
                        console.log("graphView.addItems(" + d.title() + "): added element:" + thing.attr('id') + " ngModel:" + thing.attr('ng-model') + "@" + pos.toString());
                    });

                viewEnter.append("circle")
                    .attr("cx", 15)
                    .attr("cy", 15)
                    .attr("r", 10)
                    .attr("class", "connector")
                    //.attr("fill", "url(#grad1)")
                    .attr("id", function (d) {
                        return utils.viewItemIdToConnectorId(d.id, 1);
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");

                viewEnter.append("text")
                    .attr("x", 250)
                    .attr("y", 250)
                    .attr("class", "node")
                    .text(function (d) {
                        return d.title();
                    });

                viewEnter.append("image")
                    .attr("x", 20)
                    .attr("y", 50)
                    .attr("width", 160)
                    .attr("height", 80)
                    .attr("xlink:href", function (d) {
                        return d.image();
                    });

                viewEnter.append("circle")
                    .attr("cx", 235)
                    .attr("cy", 200)
                    .attr("r", 10)
                    .attr("class", "connector")
                    .attr("id", function (d) {
                        return utils.viewItemIdToConnectorId(d.id, 2);
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");

                viewEnter.call(dragfn);
            };

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                'require': '?ngModel',
                templateUrl: '/templates/view3.ejs',
                link: function (scope, element, attrs, model) {
                    console.log("graphView.link((" + JSON.stringify(arguments) + ")): ENTER.");
                    if (!model)
                        return;
                    console.log("graphView.link((" + scope.$id + ", phase:" + scope.$$phase + ")): ENTER.");

                    /// find our view in the scope
                    var mdl = $parse(attrs.ngModel);
                    scope.view = mdl(scope);
                    console.log("graphView.link((" + scope.$id + ", phase:" + scope.$$phase + ")): scope.view:" + scope.view);
                    var theView = d3.select(element[0]);//.append("g");
                    // called when data value changes(like a watch)
                    /// here is where we update the gui with new data
                    scope.$watch(attrs.ngModel, function (viewData, oldVal) {
                        //    model.$render = function () {
                        console.log("graphView.link((" + scope.$id + ", phase:" + scope.$$phase + ")).$render: ENTER.");
                        console.dir(viewData);
                        theView.select("*").remove();
                        if (viewData) {
                            addItems(theView, viewData.items, scope);
                            timer(function () {
                                relationshipMgr(element, viewData.relationships);
                            }, 1500, false);
                        }
                        console.log("graphView.link((" + scope.$id + ", phase:" + scope.$$phase + ")).$render: EXIT.");
                    });
                }
            };
        }]);
})(angular.module('graphOmatic.directives'));
