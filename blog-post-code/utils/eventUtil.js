
 var EventUtil = {
	addHandle: function(element,type,handle) {
		if(element.addEventListener) {
			element.addEventListener(type,handle);
		}else if(element.attachEvent) {
			element.attachEvent("on"+type,handle);
		}else {
			element["on"+type] = handle;
		}
	},
	removeHandle: function(element,type,handle) {
		if(element.removeEventListener) {
			element.removeListener(type,handle);
		}else if(element.detachEvent) {
			element.detachEvent("on"+type,handle);
		}else {
			element["on"+type] = null;
		}
	}
}