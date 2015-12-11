var Common = Common || {};

Common.Color = function(red,green,blue,alpha) {
	if (alpha == undefined)
        alpha = 1;
	
	var cssColor = "rgba(" + red + "," + green + "," + blue + "," + alpha;
	cssColor += ")"; 	
    //var cssColor = "#"+red.toString(16)+green.toString(16)+blue.toString(16);
	this.cssColor = cssColor;	
}


Common.Color.prototype.toRGB = function() {
  	return this.cssColor;
};


Common.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Common.assert = function(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
