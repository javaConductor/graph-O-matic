//var graphModule = ;
(function (directivesModule) {

    directivesModule.
        directive('graphView', ['$compile', '$parse', function ($compile, $parse) {

            var distance = function (x, y) {
                return  ( Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
            };

            function selectItem(d,i){
                //var element = evt.target;
                var g = d3.select(this);
                putToTop(this);
                g.classed("selectedRect")
            }

            function deselectItem(){
                var g = d3.select(this);
                g.classList.remove("selectedRect")

            }

            function putToBottom(element) {
                //insert selected  element before the first child
                //first test if it isn't already the first Child
                if (element.previousSibling) {
                    element.parentNode.insertBefore(element,element.parentNode.firstChild);
                }
            }

            function putToTop(element) {
                //appendChild after the last child
                element.parentNode.appendChild(element);
            }

            function createView(data, svgElement){
                var outerHeight = 250;
                var outerWidth = 200;
                var innerX = 10;
                var innerY = 20;
                var innerHeight = outerHeight - (2 * innerY);
                var innerWidth = outerWidth - (2 * innerX);

                var whenNewData = d3.select(svgElement)
                    .attr("width", window.screen.availWidth)
                    .attr("height", window.screen.availHeight)
                    .selectAll("g")
                    .data(data.items)
                    .enter();

                function dragmove() {
                    var oldx = +d3.select(this).attr("data-transform-x");
                    var oldy = +d3.select(this).attr("data-transform-y");
                    var newX = Math.round(oldx+d3.event.dx);
                    var newY = Math.round(oldy+d3.event.dy);

                    d3.select(this).attr("data-transform-x", newX );
                    d3.select(this).attr("data-transform-y", newY);
                    d3.select(this).attr("transform", function(d) {
                        var pos = d.position();
                        console.log("dragmove(): transform: " + newX + ", " + newY );
                        return "translate("+ newX+","+ newY+")";
                    });
                };

                var drag = d3.behavior.drag()
                    .on("drag", dragmove);
                var whenNewDatag =
                    whenNewData
                        .append("g")
                        .attr("draggable", "true" );

                var pointsString = function(x, y, width, height){
                    var xtra = 5;//strokeRange(distance(x,y));
                    return  ""+(x+width)+","+y+" " +
                        ""+(x+width)+","+(y+height-xtra)+" " +
                        ""+(x)+","+(y+height-xtra) +" " +
                        ""+(x)+","+y + " "+
                        ""+(x+width)+","+(y)+" " +
                        ""+(x+width)+","+(y+height-xtra);
                };

                whenNewDatag
                    .each(function(d,i){
                        d3.select(this).attr("data-transform-x", d.position().x );
                        d3.select(this).attr("data-transform-y", d.position().y );
                    });

                whenNewDatag
                    .attr("transform", function(d) {
                        var xformx = d.position().x;
                        var xformy = d.position().y;
                        return "translate("+xformx+","+xformy+")";
                    });


                whenNewDatag
                    .append("polyline")
                    .attr("points", function (d, i) {
                        return pointsString(0, 0, outerWidth, outerHeight);
                    })
                    .attr("stroke", "navy")
                    .attr("stroke-width", function(d){return 5;})
                    .attr("fill","navy");

                var textFunc = function(d, i){
                    return "" + d.item.itemType.name;
                };

                whenNewDatag
                    .append("image")
                    .attr("x",innerX)
                    .attr("y", innerY)
                    .attr("height", innerHeight)
                    .attr("width", innerWidth)
                    .attr("preserveAspectRatio","none")
//                .attr("xlink:href",function(d,i){ return d.image ? d.image(): "#";});
                    .attr("xlink:href", "/images/silvermetaltexture.jpg");

                whenNewDatag
                    .append("text")
                    .attr("x", innerX)
                    .attr("y", innerY+15)
                    .attr("stroke", "darkgray")
                    .text(textFunc);

                var titleFunc = function(d, i){
                    return  d.title();
                };

                whenNewDatag
                    .append("text")
                    .attr("x", innerX)
                    .attr("y", innerY+30)
                    .attr("stroke", "black")
                    .text(titleFunc);

                var imageWidth = innerWidth;
                var imageHeight = innerHeight - 50;
                var imageX = innerX;
                var imageY = innerY+35;
                whenNewDatag
                    .append("image")
                    .attr("x", function(d,i){
                        return d.image() ? imageX : 0
                    })
                    .attr("y", function(d,i){
                        return d.image() ? imageY : 0
                    })
                    .attr("height", function(d,i){
                        return d.image() ? imageHeight : 0
                    })
                    .attr("width", function(d,i){
                        return d.image() ? imageWidth : 0
                    })
                    .attr("preserveAspectRatio","none")
                    .attr("xlink:href",function(d,i){ return d.image ? d.image(): "#";});
//                .attr("xlink:href", "/images/silvermetaltexture.jpg");


                var descX = innerX+10;
                var descY = innerY+innerHeight - 50;
                var descWidth = innerWidth + 0;
                var descHeight = 50;
                var fobjEnter =whenNewDatag
                    .append("svg:foreignObject")
                    .attr("x", descX)
                    .attr("y", descY)
                    .attr("height", descHeight)
                    .attr("width", descWidth )

                    .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
                    .attr("style","pointer-events: all;overflow:hidden");

                var descEnter =fobjEnter
                    .append("xhtml:textarea")
                    .attr("style","overflow:auto;height:"+descHeight+"; width:"+descWidth+"; background: url('/images/silvermetaltexture.jpg')")
                    .text(function(d){
                        return d.description();
                    });

                whenNewDatag.append("circle")
                    .attr("cx", innerX + (innerWidth/2))
                    .attr("cy", 0)
                    .attr("r", 10)
                    .attr("class", "connector")
                    //.attr("fill", "url(#grad1)")
                    .attr("id", function (d) {
                        return "connector1"+ d.id;
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");


                whenNewDatag.append("circle")
                    .attr("cx", innerX + (innerWidth/2))
                    .attr("cy", outerHeight)
                    .attr("r", 10)
                    .attr("class", "connector")
                    //.attr("fill", "url(#grad1)")
                    .attr("id", function (d) {
                        return "connector2"+ d.id;
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");


                whenNewDatag
                    .on("click", selectItem)
                    .call(drag);
            }

            function createViewWithHtmlTable(data, svgElement){
                var whenNewData = d3.select(svgElement)
                    .attr("width", window.screen.availWidth)
                    .attr("height", window.screen.availHeight)
                    .selectAll("g")
                    .data(data.items)
                    .enter();

                function dragmove() {
                    var oldx = +d3.select(this).attr("data-transform-x");
                    var oldy = +d3.select(this).attr("data-transform-y");
                    var newX = Math.round(oldx+d3.event.dx);
                    var newY = Math.round(oldy+d3.event.dy);

                    d3.select(this).attr("data-transform-x", newX );
                    d3.select(this).attr("data-transform-y", newY);
                    d3.select(this).attr("transform", function(d) {
                        var pos = d.position();
                        console.log("dragmove(): transform: " + newX + ", " + newY );
                        return "translate("+ newX+","+ newY+")";
                    });
                };

                var drag = d3.behavior.drag()
                    .on("drag", dragmove);
                var whenNewDatag =
                    whenNewData
                        .append("g")
                        .attr("draggable", "true" );

                var pointsString = function(x, y, width, height){
                    var xtra = 5;//strokeRange(distance(x,y));
                    return  ""+(x+width)+","+y+" " +
                        ""+(x+width)+","+(y+height-xtra)+" " +
                        ""+(x)+","+(y+height-xtra) +" " +
                        ""+(x)+","+y + " "+
                        ""+(x+width)+","+(y)+" " +
                        ""+(x+width)+","+(y+height-xtra);
                };

                whenNewDatag
                    .each(function(d,i){
                        d3.select(this).attr("data-transform-x", d.position().x );
                        d3.select(this).attr("data-transform-y", d.position().y );
                    });

                whenNewDatag
                    .attr("transform", function(d) {
                        var xformx = d.position().x;
                        var xformy = d.position().y;
                        return "translate("+xformx+","+xformy+")";
                    });

                whenNewDatag
                    .append("polyline")
                    .attr("points", function (d, i) {
                        return pointsString(0, 0, 200, 200);
                    })
                    .attr("stroke", "navy")
                    .attr("stroke-width", function(d){return 5;})
                    .attr("fill","navy");

                var textFunc = function(d, i){
                    return "" + d.item.itemType.name;
                };

                whenNewDatag
                    .append("text")
                    .attr("x", 10)
                    .attr("y", 15)
                    .attr("stroke", "white")
                    .text(textFunc);

                var titleFunc = function(d, i){
                    return  d.title();
                };

                whenNewDatag
                    .append("text")
                    .attr("x", 10)
                    .attr("y", 30)
                    .attr("stroke", "white")
                    .text(titleFunc);

                whenNewDatag
                    .append("image")
                    .attr("x", 20)
                    .attr("y", 45)
                    .attr("height", 150)
                    .attr("width", 160 )
                    .attr("preserveAspectRatio","none")
//                .attr("xlink:href",function(d,i){ return d.image ? d.image(): "#";});
                    .attr("xlink:href", "/images/silvermetaltexture.jpg");


                whenNewDatag.append("circle")
                    .attr("cx", 100)
                    .attr("cy", 0)
                    .attr("r", 10)
                    .attr("class", "connector")
                    //.attr("fill", "url(#grad1)")
                    .attr("id", function (d) {
                        return "connector1"+ d.id;
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");


                whenNewDatag.append("circle")
                    .attr("cx", 100)
                    .attr("cy", 200)
                    .attr("r", 10)
                    .attr("class", "connector")
                    //.attr("fill", "url(#grad1)")
                    .attr("id", function (d) {
                        return "connector2"+ d.id;
                    })
                    .attr("fill", "white")
                    .attr("style", "stroke:black;stroke-width:2");


                var fobjEnter =whenNewDatag
                    .append("svg:foreignObject")
                    .attr("x", 20)
                    .attr("y", 45)
                    .attr("height", 150)
                    .attr("width", 160 )
                    .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
                    .attr("style","pointer-events: all;");

                var tblEnter =fobjEnter
                    .append("xhtml:table")
                    .attr("class","itemData")
                    .selectAll("tr")
                    .data(function(d){
                        return d.data();
                    })
                    .enter()
                    .append("tr")
                    .attr("class", "itemData");

                tblEnter
                    .append("th")
                    .text(function(d,i){
                        return d.name;});

                tblEnter
                    .append("td")
                    .text(function(d,i){
                        return d.value;});

                whenNewDatag
                    .on("click", selectItem)
                    .call(drag);
            }

            return {
                restrict: 'E',
                replace: true,
                scope: true,
                'require': '?ngModel',
                template: "<svg> </svg>",
                link: function (scope, element, attrs, model) {

                    if (!model)
                        return;

                    var mdl = $parse(attrs.ngModel);
                    var modelData = mdl(scope.$parent);

                    if (!modelData){
                        alert("Value "+attrs.ngModel+ " not found in scope.");
                        return null;
                    }
                    createView(modelData, element[0]);

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

})(angular.module('graphOmatic.directives'));

