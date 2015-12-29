/* global Common */
"use strict";
var Tetris = Tetris || {};

Tetris.Directions = Tetris.Directions || {};

Tetris.Directions.LEFT = 0;
Tetris.Directions.UP = 1;
Tetris.Directions.RIGHT = 2;
Tetris.Directions.DOWN = 3;
Tetris.Directions.COUNT = 4;

Tetris.Figure = function (pointWidth, pointHeight) {

	this.templates = new Array(Tetris.Directions.COUNT);
	this.centers = new Array(Tetris.Directions.COUNT);
	this.startRow = 0;
	this.direction = Tetris.Directions.UP;
    
	this.centerPoint = null;
	this.points = [];
	this.color = new Common.Color(0, 0, 0);
	this.ctx = ctx;
	this.pointWidth = pointWidth;
	this.pointHeight = pointHeight;
	//this.pointsAfterRotate = [];
	this.templatePoints = new Array(Tetris.Directions.COUNT);
	for(var i = 0; i < this.templatePoints.length; ++i) {
		this.templatePoints[i] = {};
	}
    
    this.isDrawn = false;
	// this.templatePoints.forEach(function(element, i, arr) {
	// 	arr[i] = new Object();
	// }, this);		
}

Tetris.Figure.prototype.setIsDrawn = function(value) {
    this.isDrawn = value;
}
Tetris.Figure.prototype.getIsDrawn = function() {
    return this.isDrawn;
}

Tetris.Figure.prototype.setDirection = function(direction) {
    this.direction = direction;
}

Tetris.Figure.prototype.resize = function(pointWidth, pointHeight) {
    this.pointWidth = pointWidth;
	this.pointHeight = pointHeight;
    this.points.forEach(function(element) {
        element.width = pointWidth;
        element.height = pointHeight;
    }, this);    
}

Tetris.Figure.prototype.pointsAfterRotate = function () {
	var points = [];
	
	var tempDirection = this.direction;
	++tempDirection;
	if (tempDirection >= Tetris.Directions.COUNT)
		tempDirection = Tetris.Directions.LEFT;

	var template = this.templates[tempDirection];
	
	//find center
	var centerIndexes = this.centers[tempDirection];

	var centerPoint = {
			row: this.centerPoint.row,
			column: this.centerPoint.column
		};		
	

	template.forEach(function (row, i) {
		row.forEach(function (column, j) {
			if (i == centerIndexes.i && j == centerIndexes.j) {
				//skip
			} else if(column == Tetris.Figure.POINT_NOT_USED) {
				
			}				
			else {
				points.push(
					{
						row: i - centerIndexes.i + this.centerPoint.row,
						column: j - centerIndexes.j + this.centerPoint.column
					});
			}
		}, this);
	}, this);
	
	points.push(centerPoint);
	return points;
	
};

Tetris.Figure.prototype.getStartRow = function () {
	return this.centers[this.direction].i;
};

Tetris.Figure.prototype.setColor = function (color) {
	this.color = color;
};

Tetris.Figure.prototype.getDirection = function () {
	return this.direction;
};

Tetris.Figure.prototype.getPoints = function () {
	return this.points;
};

Tetris.Figure.prototype.getCenterPoint = function () {
	return this.centerPoint;
};

Tetris.Figure.prototype.rotate = function () {
	var tempDirection = this.direction;
	++tempDirection;
	if (tempDirection >= Tetris.Directions.COUNT)
		tempDirection = Tetris.Directions.LEFT;
	this.direction = tempDirection;
	this.templates[this.direction].forEach(function (row, i) {
			row.forEach(function (column, j) {
				if (column != Tetris.Figure.POINT_NOT_USED && column) {
					var point = this.getPointByIndex(this.direction, i, j);
					point.row = i - this.centers[this.direction].i + this.centerPoint.row;
					point.column = j - this.centers[this.direction].j + this.centerPoint.column;
				}
			},this);
		}, this);
};

Tetris.Figure.prototype.generatePoints = function () {
	//this.points = [];
	// var centerI = this.centers[this.direction].i;
	// var centerJ = this.centers[this.direction].j;
	// var centerRow = centerI;
	// var centerColumn = centerJ;
	this.centerPoint = new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0);	
		
		
	this.templates.forEach(function (rows, dir) {
		var pointNum = 0;
		rows.forEach(function (row, i) {
			row.forEach(function (column, j) {
				if (column != Tetris.Figure.POINT_NOT_USED) {
					if (column == Tetris.Figure.POINT_CENTER) {
						this.templatePoints[dir][i + "." + j] = this.centerPoint;
					} else {
						this.templatePoints[dir][i + "." + j] = this.points[pointNum++];
					}
				}
			}, this);
		}, this);
	}, this);
	
	this.points.push(this.centerPoint);
};

Tetris.Figure.prototype.pointsAfterMove = function (moveRow, moveColumn) {
	var points = [];

	var centerPoint = {
		row: moveRow,
		column: moveColumn
	};

	var rows = this.templates[this.direction];
	for(var i = 0; i < rows.length; ++i) {
		for(var j = 0; j < rows[i].length; ++j) {
			if (i == this.centers[this.direction].i && j == this.centers[this.direction].j) {
				continue;								
			}
			if(rows[i][j] == Tetris.Figure.POINT_NOT_USED)
				continue;
			points.push(
				{
					row: i - this.centers[this.direction].i + centerPoint.row,
					column: j - this.centers[this.direction].j + centerPoint.column
				});				
		}
	}
		
	// this.templates[this.direction].forEach(function (row, i) {
	// 	row.forEach(function (column, j) {
	// 		if (i != this.centers[this.direction].i && j != this.centers[this.direction].j)
	// 			points.push(
	// 				{
	// 					row: i - this.centers[this.direction].i + centerPoint.row,
	// 					column: j - this.centers[this.direction].j + centerPoint.column
	// 				});
	// 	}, this);
	// }, this);
	
	points.push(centerPoint);
	return points;
};

Tetris.Figure.prototype.move = function (moveRow, moveColumn) {
	// this.centerPoint.row = moveRow;
	// this.centerPoint.column = moveColumn;
	//this.points = [];
	this.templates[this.direction].forEach(function (row, i) {
		row.forEach(function (column, j) {
			if (column != Tetris.Figure.POINT_NOT_USED && column) {
				var point = this.getPointByIndex(this.direction, i, j);
				point.row = i - this.centers[this.direction].i + moveRow;
				point.column = j - this.centers[this.direction].j + moveColumn;
			}
		},this);
	}, this);
};

Tetris.Figure.prototype.findCenters = function () {
	for (var dir = 0; dir < Tetris.Directions.COUNT; ++dir) {
		var centerPointIndexes = null;
		for (var i = 0; i < this.templates[dir].length; ++i) {
			for (var j = 0; j < this.templates[dir][i].length; ++j) {
				if (this.templates[dir][i][j] == Tetris.Figure.POINT_CENTER) {
					centerPointIndexes = { i: i, j: j };
					this.centers[dir] = centerPointIndexes;
					break;
				}
			}
			if (centerPointIndexes)
				break;
		}
	}
}

Tetris.Figure.prototype.getPointByIndex = function (direction, i, j) {
	return this.templatePoints[direction][i + "." + j];
}

Tetris.Figure.prototype.getRects = function () {
	var rects = [];
	this.points.forEach(function(element) {
		rects.push(element.getRect());
	}, this);
	return rects;
}

Tetris.Figure.POINT_NOT_USED = 0;
Tetris.Figure.POINT_USED = 1;
Tetris.Figure.POINT_CENTER = 2;