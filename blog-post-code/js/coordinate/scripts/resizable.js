;(function(){
	function Resizable(options){
		Resizable.self = this;
		var config = {
			el:'',
			resize:['width','height'],
			edge:5,
			minWidth:10,
			maxWidth:200,
			minHeight:10,
			maxHeight:200
		};
		this.opts = Util.assign(config,options);
		this.$el = document.getElementById(options.el);
		this.init()
	}
	Resizable.prototype = {
		constructor:Resizable,
		init:function(){
			var opts = this.opts;
			var $el = this.$el;
			$el.addEventListener('mousemove',this.addCursor)
			$el.addEventListener('mouseleave',this.removeCursor)
			$el.addEventListener('mousedown',this.downHandle)
		},
		addCursor:function(e){
			var self = Resizable.self,
				$el = self.$el,
				dir = self.getDirection($el,e),
			 	cursorVal = dir === ''?'':dir+'-resize'; 
			
			$el.style.cursor = cursorVal;
		},
		getDirection:function ($el,e){
			var edge = this.opts.edge,
				resize = this.opts.resize;
			var elRect = $el.getBoundingClientRect(),
				right = elRect.right,
				bottom = elRect.bottom,
				pageYOffset = window.pageYOffset,//滚动条的滚动距离
				pageXOffset = window.pageXOffset;
			var dir = '';
			if(e.pageY >= bottom-edge+pageYOffset && e.pageY <= bottom+pageYOffset  && resize.indexOf('height') !== -1){
				dir += 's';
			}
			if(e.pageX >= right-edge+pageXOffset && e.pageX <= right+pageXOffset && resize.indexOf('width') !== -1){
				dir += 'e';
			}
			return dir;
		},
		removeCursor:function (){
			Resizable.self.$el.style.cursor = '';
		},
		downHandle:function (e){
			e.preventDefault();
			var self = Resizable.self,
				$el = self.$el,
				dir = self.getDirection($el,e);
			
			if(dir === ''){return}
			
			self.data = {
				dir:dir,
				downX:e.pageX,
				downY:e.pageY,
				downW:parseInt(getCssValue($el,'width')),
				downH:parseInt(getCssValue($el,'height'))
			}
			
			document.addEventListener('mousemove',self.moveHandle)
			document.addEventListener('mouseup',self.upHandle)
		},
		moveHandle:function (e){
			e.preventDefault();
			var self = Resizable.self,
				data = self.data;
			self.moveRange(e);
			self.$el.style.width = data.width + 'px';
			self.$el.style.height = data.height + 'px';
			document.documentElement.style.cursor = dir + '-resize';
		},
		moveRange:function(e){
			var self = Resizable.self,
				opts = self.opts
				data = self.data,
				dir = data.dir;
			if (dir.indexOf('s') != -1) {
				var height = data.downH + e.pageY - data.downY;
				height = Math.min(
							Math.max(height, opts.minHeight),
							opts.maxHeight
						);
				data.height = height;
			}
			if (dir.indexOf('e') != -1) {
				var width = data.downW + e.pageX - data.downX;
				width = Math.min(
							Math.max(width, opts.minWidth),
							opts.maxWidth
						);
				data.width = width;
			}
		},
		upHandle:function (e){
			var self = Resizable.self;
			document.removeEventListener('mousemove',self.moveHandle)
			document.removeEventListener('mouseup',self.upHandle)
			document.documentElement.style.cursor = '';
		}
	}
	
	/* 辅助工具方法 */
	function getCssValue(dom,attr){
		return getComputedStyle(dom, false)[attr];
	}
	window.Resizable = Resizable;
})()