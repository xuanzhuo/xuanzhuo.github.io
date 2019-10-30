;(function(){
	function Draggable(options){
		Draggable.self = this;
		this.opts = options;
		this.$el = typeof options.el === 'string'?document.getElementById(options.el):options.el;
		this.init();
	}
	Draggable.prototype = {
		constructor:Draggable,
		init:function(){
			var opts = this.opts,
				$el = this.$el,
				draggableArea = opts.draggableArea?document.getElementById(opts.draggableArea):$el;
			var drag = new Drag({
				el:draggableArea,
				dragStart:this.dragStart,
				dragMove:this.dragMove,
				dragEnd:this.dragEnd
			})
			draggableArea.style.cursor = 'move';
			
		},
		dragStart:function(data,e){
			var self = Draggable.self;
			self.$el.style.position = 'absolute';
			data.elRect = self.$el.getBoundingClientRect()
		},
		dragMove:function(data,e){
			var self = Draggable.self,
				$el = self.$el;
			self.moveRange(data);	
			$el.style.left = data.left + 'px';
			$el.style.top = data.top  + 'px';
		},
		moveRange:function(data){
			var elRect = data.elRect;
			var left = elRect.left + data.deltaX;
			left = Math.min(Math.max(0,left),window.innerWidth-elRect.width);
			var top = elRect.top + data.deltaY;
			top = Math.min(Math.max(0,top),window.innerHeight-elRect.height);
			Util.assign(data,{
				left:left,
				top:top
			}) 
		},
		dragEnd:function(data,e){
			console.log(data)
		}
	}
	window.Draggable = Draggable
})()