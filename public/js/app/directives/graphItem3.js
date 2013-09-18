/*
 Should look like this:
 <graphItem  ng-model='viewItem'  x='500' y='800' />
*/

(function(graphModule){

	function DndHandlerNu (theViewItem, fItemMoved) {
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

		this.dragStart = $.proxy( function(event) {
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

		this.drag = $.proxy(function(event) {
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

		},this);

		this.dragOver = $.proxy(function(event) {
			var evt = event.originalEvent;

//		console.log('dragOverEvent ' +
//			//'client -> x:'+evt.clientX + " y:"+evt.clientY+
//		  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
//		  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
			if (evt.preventDefault)
				evt.preventDefault();
			var el = angular.element(evt.currentTarget);
			return evt;
		},this);

		this.drop = $.proxy(function(event) {
			var evt = event.originalEvent;

			if (evt.preventDefault)
				evt.preventDefault();
			console.log('dropEvent ' +
			  ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
			  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
			  ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);

		},this);

		this.dragEnd = $.proxy(function(event) {
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
		},this);
		this.dropped = $.proxy(function(event, node) {
			var evt = event.originalEvent;

			console.log('droppedEvent ' +
			  ' client   -> x:' + evt.clientX + " y:" + evt.clientY +
			  ' offset   -> x:' + evt.offsetX + " y:" + evt.offsetY +
			  ' screen   -> x:' + evt.screenX + " y:" + evt.screenY +
			  ' page   -> x:' + evt.pageX + " y:" + evt.pageY);
		},this);

		return this;
	};

	graphModule.directive('graphItem', ['$compile', '$parse', 'UtilityFunctions', '$rootScope', 'ConstantsService',
		function ($compile, $parse, utils, rootScope, constants) {
		console.log("creating directive graphItem");
		this.itemMoved = function (viewItem, x, y) {
			console.log("ViewItem(" + viewItem.id + ") moved to " + x + ", " + y);
			rootScope.$broadcast(constants.ViewItemMoved, {viewItemId: viewItem.id, x: x, y: y});
		};

		return {
			restrict: 'E',
			replace: true,
			scope: true,
			'require': '?ngModel',
			templateUrl: 'templates/viewItem.ejs',
			link: function (scope, element, attrs, model) {

				if (!model)
					return;

				var mdl = $parse(attrs.ngModel);
				var viewItem = mdl( scope.$parent );
				scope.dnd = new DndHandlerNu(viewItem, itemMoved);
				element.attr("id", utils.viewItemIdToElementId(viewItem.id));

				element.bind('drag', scope.dnd.drag);
				element.bind('dragend', scope.dnd.dragEnd);
				element.bind('dragstart', scope.dnd.dragStart);
				element.bind('dragover', scope.dnd.dragOver);
				element.bind('drop', scope.dnd.drop);

				/// set the ids of the connectors
				element.find('.connector').each(function (idx, connEl) {
					connEl = angular.element(connEl);
					connEl.attr("id", utils.viewItemIdToConnectorId(viewItem.id, idx));
				});
				var pos = viewItem.position();
				element.css("left", pos.x+"px");
				element.css("top", pos.y+"px");

				model.$render = function () {
					/// redisplay the item inside the view
					console.log('$render');
					console.dir(this.$modelValue);
					if (this.$modelValue) {
						scope.viewItem = this.$modelValue;
						element.offset(utils.xy2topLeft( scope.viewItem.position()));
					}
				}
			}
		};
	}]);


})( angular.module('graphOmatic.directives'));
