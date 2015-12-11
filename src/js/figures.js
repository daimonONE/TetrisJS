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

	this.setColor(new Common.Color(10, 200, 200));
	
	for (var i = 0; i < 3; ++i) {
		this.points.push(new Tetris.Point(this.color, this.pointWidth, this.pointHeight, 0, 0));		
	}
	
	this.setStartRow(1);
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureS.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureS.prototype.constructor = Tetris.FigureS;


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
	
	this.setStartRow(1);
	this.findCenters();
	this.generatePoints();
}

Tetris.FigureLine.prototype = Object.create(Tetris.Figure.prototype);
Tetris.FigureLine.prototype.constructor = Tetris.FigureLine;