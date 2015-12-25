"use strict";
var Tetris = Tetris || {};

Tetris.FigureS = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[0, 1, 1],
		[1, 2, 0]
	];
	this.templates[Tetris.Directions.UP] = [
		[1, 0],
		[2, 1],
		[0, 1]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[0, 2, 1],
		[1, 1, 0]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[1, 0],
		[1, 2],
		[0, 1]
	];

	this.setColor(new Common.Color(200, 100, 100));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureS.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureS.prototype.constructor = Tetris.FigureS;

Tetris.FigureZ = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[1, 1, 0],
		[0, 2, 1]
	];
	this.templates[Tetris.Directions.UP] = [
		[0, 1],
		[2, 1],
		[1, 0]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[1, 2, 0],
		[0, 1, 1]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[0, 1],
		[1, 2],
		[1, 0]
	];

	this.setColor(new Common.Color(100, 200, 100));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureZ.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureZ.prototype.constructor = Tetris.FigureZ;

Tetris.FigureT = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[0, 1, 0],
		[1, 2, 1]
	];
	this.templates[Tetris.Directions.UP] = [
		[1, 0],
		[2, 1],
		[1, 0]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[1, 2, 1],
		[0, 1, 0]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[0, 1],
		[1, 2],
		[0, 1]
	];

	this.setColor(new Common.Color(10, 200, 200));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureT.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureT.prototype.constructor = Tetris.FigureT;

Tetris.FigureL = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[0, 0, 1],
		[1, 2, 1]
	];
	this.templates[Tetris.Directions.UP] = [
		[1, 0],
		[2, 0],
		[1, 1]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[1, 2, 1],
		[1, 0, 0]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[1, 1],
		[0, 2],
		[0, 1]
	];

	this.setColor(new Common.Color(10, 100, 200));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureL.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureL.prototype.constructor = Tetris.FigureL;

Tetris.FigureJ = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[1, 0, 0],
		[1, 2, 1]
	];
	this.templates[Tetris.Directions.UP] = [
		[1, 1],
		[2, 0],
		[1, 0]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[1, 2, 1],
		[0, 0, 1]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[0, 1],
		[0, 2],
		[1, 1]
	];

	this.setColor(new Common.Color(200, 200, 100));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureJ.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureJ.prototype.constructor = Tetris.FigureJ;

Tetris.FigureO = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] =
	this.templates[Tetris.Directions.UP] =
	this.templates[Tetris.Directions.DOWN] =
	this.templates[Tetris.Directions.RIGHT] = [
		[2, 1],
		[1, 1]
	];

	this.setColor(new Common.Color(200, 200, 10));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureO.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureO.prototype.constructor = Tetris.FigureO;

Tetris.FigureLine = function (pointWidth, pointHeight) {
	Tetris.Figure.call(this, pointWidth, pointHeight);
	//Tetris.Figure.call(this);
	
	this.templates[Tetris.Directions.LEFT] = [
		[1, 2, 1, 1]
	];
	this.templates[Tetris.Directions.UP] = [
		[1],
		[2],
		[1],
		[1]
	];
	this.templates[Tetris.Directions.RIGHT] = [
		[1, 1, 2, 1]
	];
	this.templates[Tetris.Directions.DOWN] = [
		[1],
		[1],
		[2],
		[1]
	];

	this.setColor(new Common.Color(255, 0, 0));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureLine.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureLine.prototype.constructor = Tetris.FigureLine;