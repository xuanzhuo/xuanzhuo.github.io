;(function(){
	function Drag(options){
		Drag.self = this;
		var config = {
			el:'',
			dragStart:null,
			dragMove:null,
			dragEnd:null
		}
		this.opts = Util.assign(config,options);
		this.$el = typeof options.el === 'string'?document.getElementById(options.el):options.el;
		this.init();
	}
	Drag.prototype = {
		constructor:Drag,
		init:function(){
			var $el = this.$el;
			$el.addEventListener('mousedown',this.downHandle)
		},
		downHandle:function(e){
			e.preventDefault();
			var self = Drag.self,
				dragStart = self.opts.dragStart
			self.data = {
				downX:e.pageX,
				downY:e.pageY,
			}
			if(typeof dragStart === 'function'){
				dragStart.call(self,self.data,e)
			}
			document.addEventListener('mousemove',self.moveHandle);
			document.addEventListener('mouseup',self.upHandle);
		},
		moveHandle:function(e){
			e.preventDefault();
			var self = Drag.self,
				dragMove = self.opts.dragMove,
				data = self.data
			Util.assign(data,{
				deltaX:e.pageX - data.downX,
				deltaY:e.pageY - data.downY
			}) 
			if(typeof dragMove === 'function'){
				dragMove.call(self,data,e)
			}
		},
		upHandle:function(e){
			e.preventDefault();
			var self = Drag.self;
			if(typeof dragEnd === 'function'){
				dragEnd.call(self,self.data,e)
			}
			document.removeEventListener('mousemove',self.moveHandle)
			document.removeEventListener('mouseup',self.upHandle)
		}
	}
	window.Drag = Drag
})()