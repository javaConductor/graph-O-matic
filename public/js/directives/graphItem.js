

/*
 Should look like this:
 <graphView  ng-model='A1234Z'  height='500' width='800' />

 should turn into:

 <g class="draggable">

 <rect x="10" y="10" height="100" width="100"
 style="stroke:#006600; fill: #00cc00">    	</rect>
 <image x="20" y="5" width="80" height="80"
 xlink:href="http://jenkov.com/images/layout/top-bar-logo.png" />
 <foreignObject class="node" x="46" y="22" width="200" height="300">
 <body xmlns="http://www.w3.org/1999/xhtml">
 <table>
 <thead><tr><th cols="2" >{{itemType.name}}</th></tr></thead>

 </table>
 </body>
 </foreignObject>
 <text y="100" style="stroke:#00ffff; fill: #00ffff">
 <tspan dy="25" y="50" x="15">tspan line 0</tspan>
 <tspan dy="25" y="70" x="15">tspan line 1</tspan>
 </text>

 </g>
 */
var cx = 60, cy = 60;
var createItemNode = function(svgElement, viewItem){
    var g = angular.element("<g></g>");
    var r = angular.element("rect").
        attr('x', viewItem.position.x ).
        attr('y', viewItem.position.y).
        attr('height', cy ).
        attr('width', cx );

    var img = angular.element("image").
        attr('x', viewItem.position.x ).
        attr('y', viewItem.position.y).
        attr('height', cy ).
        attr('width', cx-20 );


};

var graphModule = angular.module('graphOmatic.directives');

graphModule.directive('graphItem', ['$compile', '$timeout', function ($compile, $timeout) {
    console.log("creating directive graphItem");



    return {
        restrict:'E',
        replace:true,
        scope:true,
        'require':'?ngModel',
        template: '<svg><rect cx="50" cy="50" x="100" y="100" color="black" ></rect></svg>',
        link : function(scope, element, attrs, model){
            /// Can we use this to update the screen for each item ???
            model.$render = function () {
                /// redisplay the item inside the view
                console.log('$render');
                console.dir(this.$modelValue);
                if ( this.$modelValue ){
                    var graphOptions = this.$modelValue;
                    //var jsonObj = angular.fromJson( jsonText );
                    if ( graphOptions ){
                        var nuElem = angular.element("<div></div>");
                        addItems(jsonObj, graphOptions);
                        element.html(nuElem);
                    }
                }
            }
        }

    };
}]);
/**
 * Created with JetBrains WebStorm.
 * User: lcollins
 * Date: 4/28/13
 * Time: 4:00 PM
 * To change this template use File | Settings | File Templates.
 */
