/*
 Should look like this:
 <graphItem  ng-model='viewItem'  x='500' y='800' />

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

var itemMoved= function(viewItem, x, y){
	console.log("Item: "+viewItem.id + "moved to "+ x + ", " + y);
}

var dnd = function (viewItem) {
	return {
		viewItem : viewItem,
		lastX: 0,
		lastY: 0,
		beforeLastX: 0,
		beforeLastY: 0,
		initX: 0,
		initY: 0,
		initTop: 0,
		initLeft: 0,
		dragStart: function (evt) {

			console.log('dragStartEvent ' +
			  'client -> x:' + evt.clientX + " y:" + evt.clientY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);

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
		},

		drag: function (evt) {
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

		},

		dragOver: function (evt) {

			console.log('dragOverEvent ' +
				//'client -> x:'+evt.clientX + " y:"+evt.clientY+
			  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
			if (evt.preventDefault)
				evt.preventDefault();
			evt.dataTransfer.dropEffect = 'move';
			var el = angular.element(evt.currentTarget);
			return evt;
		},

		drop: function (evt) {
			if (evt.preventDefault)
				evt.preventDefault();
			console.log('dropEvent ' +
			  ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
			  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
			  ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);

		},

		dragEnd: function (evt) {
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
			itemMoved(this.viewItem, off.left, off.top);
//			alert("item moved to:  x:" + off.left + " y:" + off.top);
			return evt;
		},
		dropped: function (evt, node) {
			console.log('droppedEvent ' +
			  ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
			  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
			  ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
		}
	}
}

var cx = 60, cy = 60;
var createItemNode = function (svgElement, viewItem) {
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
	g.attr("draggable", "true");
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
	  outerW = position.x + w + (2 * marginSize),
	  outerY = position.y,
	  outerH = position.y + h + (2 * marginSize);
	var mainRectX = position.x + marginSize,
	  mainRectY = position.y + marginSize,
	  mainRectW = w - (2 * marginSize),
	  mainRectH = h - (2 * marginSize);

	var ttlRectX = mainRectX + textMargin,
	  ttlRectY = mainRectY + textMargin,
	  ttlRectW = mainRectW - (2 * textMargin),
	  ttlRectH = mainRectH - (2 * textMargin);
	var titleElement = angular.element("svg:text").
	  attr('x', ttlRectX).
	  attr('y', ttlRectY).
	  attr('height', ttlRectH).
	  attr('width', ttlRectW).text(title);


	var imgRectX = ttlRectX ,
	  imgRectY = mainRectY,
	  imgRectW = mainRectW - ( 2 * textMargin),
	  imgRectH = mainRectH - ( 2 * textMargin);
	var imgElement = angular.element("svg:image").
	  attr('x', imgRectX).
	  attr('y', imgRectY).
	  attr('height', imgRectH).
	  attr('width', imgRectW);


	var descRectX = ttlRectX,
	  descRectY = imgRectY + textMargin,
	  descRectW = mainRectW - ( 2 * textMargin),
	  descRectH = mainRectH - ( 2 * textMargin);
	var descr = angular.element("svg:text").
	  attr('x', descRectX).
	  attr('y', descRectY).
	  attr('height', descRectH).
	  attr('width', descRectW).text(description);

	var fo = angular.element("<foriegnObject></foriegnObject>");

	g.add(r);
	g.add(titleElement);
	svgElement.add(g);

	var c1 = {x: position.x + w - (marginSize / 2), y: position.y + h / 2 };
	var c2 = {x: position.x + w / 2, y: position.y + (marginSize / 2)};
	var c3 = {x: position.x + w / 2, y: position.y + (marginSize / 2)};
	var c4 = {x: position.x + (marginSize / 2), y: position.y + h / 2};

};

var graphModule = angular.module('graphOmatic.directives');

graphModule.directive('graphItem', ['$compile', '$timeout', '$parse', function ($compile, $timeout) {
	console.log("creating directive graphItem");

	return {
		restrict: 'E',
		replace: true,
		scope: true,
		'require': '?ngModel',
		templateUrl: 'viewItem.ejs',
		link: function (scope, element, attrs, model, ctrl) {

			if (!model)
				return;

			var modelGetter = $parse()
			var viewItem = model;
			scope.viewItem = viewItem;
			createItemNode(element, viewItem);
			element.html(nuElem);
			model.$render = function () {
				/// redisplay the item inside the view
				console.log('$render');
				console.dir(this.$modelValue);
				if (this.$modelValue) {
					var vitem = this.$modelValue;
					//var jsonObj = angular.fromJson( jsonText );
					if (vitem) {
						var nuElem = angular.element("<div></div>");
						nuElem.add(createItemNode(nuElem, vitem));
						element.html(nuElem);
					}
				}
			}
		}
	};
}]);

