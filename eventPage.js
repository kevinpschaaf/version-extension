var colors = ["red","orange","brown","green","blue","purple"];

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}


var version = navigator.userAgent.match('Chrome/(\\d+)')[1];
var color = colors[parseInt(version) % colors.length];
console.log(color);

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
context.fillStyle = color;
roundRect(context, 0,0,19,19,6,true);
context.fillStyle = "white";
context.font = "12px arial";
context.fillText(version,3,14);
var imageData = context.getImageData(0, 0, 19, 19);
chrome.browserAction.setIcon({
  imageData: imageData
});

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': "chrome://chrome/"});
});