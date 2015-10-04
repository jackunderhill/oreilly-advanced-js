/*
var onSale = true,
    inventoryLevel = 12,
    discount = 3;
if (onSale && inventoryLevel > 10) { 
    console.log("We have plenty left");
}
if (onSale || discount > 0) {
    console.log("On sale!");
} else {
    console.log("Full price");
}
var rect = {
    width: 100,
    height: 50,
    toString: function() {
        return "Width: " + this.width + ", height: " + this.height;
    }
};
console.log(rect);
console.log("My object rect is: " + rect);   
console.log("My object rect is: " + rect.toString()); 
*/  

//
// This function computes the area of a circle
//
// @param {number} The radius of the circle
// @return {number} The area of the circle
//
function computeArea(radius) {
return radius * radius * Math.PI;
}

console.log("Area is: " + computeArea(3)); 