var Tetris = Tetris || {};

Tetris.Point = function (color, width, height, row, column) {
  ctx.fillStyle = color.toRGB();
  ctx.fillStroke = new Common.Color(0,0,0).toRGB();
  //Properties 
  //this.margin = 5;
  
  this.color = color;
  //this.width = cellWidth - (this.margin + ctx.lineWidth);
  //this.height = cellHeight - (this.margin + ctx.lineWidth);
  this.width = width;
  this.height = height;
  this.radius = Math.max(width, height) / 10.0;
  this.x = 0;
  this.y = 0;  
  this.row = row;
  this.column = column;
};

Tetris.Point.prototype.getRect = function() {
    return {x: this.x, y: this.y, width: this.width, height: this.height};
}


Tetris.Point.prototype.setColor = function(color) {
  this.color = color;  
  //this.testMove(this.x, this.y);
  
}




