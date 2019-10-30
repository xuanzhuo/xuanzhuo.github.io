window.Util = {}
;(function(){
	function assign(){
		var target = arguments[0],
			sources = Array.prototype.slice.call(arguments,1);
		sources.forEach(function(source){
			for(var prop in source){
				if(source.hasOwnProperty(prop)){
					target[prop] = source[prop]
				}
			}
		})
		return target;
	}
	window.Util.assign = assign;
})()