

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

    var position = viewItem.position();
    var image = viewItem.image();
    var data = viewItem.data();
    var title = viewItem.title();
    var style = viewItem.style();
    var properties = viewItem.properties();
	var description = item.data["description"];
	var item = viewItem.item;
	var marginSize = 20;
	var cRadius = 10;

	var g = angular.element("<g></g>");
	g.attr("draggable","true");
/*
<text x="200" y="150" fill="blue" >
 You are
 <tspan font-weight="bold" fill="red" >not</tspan>
 a banana.
 </text>

 */
	/// set the default values first
	var w = 100, h = 150;
	var textMargin = 5;
	var outerX = position.x,
		outerW=position.x+w+(2*marginSize),
		outerY=position.y,
		outerH= position.y + h + (2*marginSize);
	var mainRectX = position.x + marginSize,
		mainRectY = position.y+marginSize,
		mainRectW = w - (2*marginSize),
		mainRectH = h - (2*marginSize);

	var ttlRectX = mainRectX + textMargin,
		ttlRectY = mainRectY + textMargin,
		ttlRectW = mainRectW - (2*textMargin),
		ttlRectH = mainRectH - (2*textMargin);
	var titleElement = angular.element("svg:text").
			attr('x', ttlRectX ).
			attr('y', ttlRectY).
			attr('height', ttlRectH).
			attr('width', ttlRectW).text(title);


	var imgRectX = ttlRectX ,
		imgRectY = mainRectY,
		imgRectW = mainRectW - ( 2 * textMargin),
		imgRectH = mainRectH - ( 2 * textMargin);
	var imgElement = angular.element("svg:image").
		attr('x', imgRectX ).
		attr('y', imgRectY).
		attr('height', imgRectH ).
		attr('width', imgRectW );


	var descRectX = ttlRectX,
		descRectY = imgRectY + textMargin,
		descRectW = mainRectW - ( 2 * textMargin),
		descRectH = mainRectH - ( 2 * textMargin);
	var descr = angular.element("svg:text").
		attr('x', descRectX ).
		attr('y', descRectY).
		attr('height', descRectH ).
		attr('width', descRectW).text(description);

	var fo = angular.element("<foriegnObject></foriegnObject>");

	g.add( r );
	g.add(titleElement);
	svgElement.add(g);

	var c1 = {x: position.x + w - (marginSize/2), y: position.y + h/2 };
	var c2 = {x: position.x + w/2, y: position.y + (marginSize/2)};
	var c3 = {x: position.x + w/2, y: position.y + (marginSize/2)};
	var c4 = {x: position.x + (marginSize/2), y: position.y + h/2};

};

var graphModule = angular.module('graphOmatic.directives');

graphModule.directive('graphItem', ['$compile', '$timeout', function ($compile, $timeout) {
    console.log("creating directive graphItem");

    return {
        restrict:'E',
        replace:true,
        scope:true,
        'require':'?ngModel',
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
