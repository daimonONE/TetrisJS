/* global Common */
"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var columns = 10;
var rows = 20;

var cellWidth = canvas.width / columns;
var cellHeight = canvas.height / rows;

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var SPACE = 32;

var CELL_MARGIN = 5; 



// var color = new Common.Color(200,200,0);
// var moving = new Tetris.Point(color, cellWidth - CELL_MARGIN, cellHeight - CELL_MARGIN);
var moving;
var movingPoint = {
    row: 0,
    column: 0
};
var isMoving = false;
var filledPoints = {};



window.onload = function () {
    drawGrid();
    //fillGrid(10);
    document.body.onkeydown = keyEvent;

    document.getElementById("b_up").addEventListener('click', function () {
        move(UP_ARROW);
    });
    document.getElementById("b_down").addEventListener('click', function () {
        move(DOWN_ARROW);
    });
    document.getElementById("b_left").addEventListener('click', function () {
        move(LEFT_ARROW);
    });
    document.getElementById("b_right").addEventListener('click', function () {
        move(RIGHT_ARROW);
    });
    
    
    movingPoint.row = 4;
    movingPoint.column = 5;
    moving = addFigure(movingPoint.row,movingPoint.column);
    var timerId = setInterval(function () {
        move(DOWN_ARROW);
    }, 500);   
}

function addFigure(row, column) {    
    var figureS = new Tetris.FigureLine(cellWidth - CELL_MARGIN, cellHeight - CELL_MARGIN);        
    moveFigure(figureS, row, column);    
    return figureS;   
}

function arePointsAvailable(points) {
    var mayMove = true;
    for(var i = 0; i < points.length; ++i) {
        var point = points[i];
        if(point.row+":"+point.column in filledPoints ||
        point.row < 0 || point.row >= rows ||
        point.column < 0 || point.column >= columns) {
            mayMove = false;
            break; 
        }
    };
    return mayMove;
}


var gridCells = new Array(rows);
for (var i = 0; i < rows; i++) {
    gridCells[i] = new Array(columns);
}


function drawGrid() {

    ctx.strokeStyle = "rgba(150, 150, 150, 0.5)";

    // console.log("CellWidth: " + cellWidth);
    // console.log("CellHeight: " + cellHeight);

    for (var i = cellWidth; i < canvas.width; i += cellWidth) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.closePath();
        ctx.stroke();
    }

    for (var i = cellHeight; i < canvas.height; i += cellHeight) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    var row = 0;
    var column = 0;
    for (var i = 0; i < canvas.height; i += cellHeight) {
        //gridCells.push([]);
        column = 0;
        for (var j = 0; j < canvas.width; j += cellWidth) {
            gridCells[row][column] = {                
                "x": j,
                "y": i                
            }
            ++column;
        }
        ++row;
    }

    //console.log(gridCells);

}

function clear(figure) {
    if(figure) {        
        figure.getRects().forEach(function(rect) {        
            ctx.clearRect(rect.x - ctx.lineWidth, rect.y - ctx.lineWidth, rect.width + ctx.lineWidth*2, rect.height + ctx.lineWidth*2);    
        }, this);                    
    } else 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function refresh() {
    clear(moving);
    //clear();
    
    //movePoint(moving, movingPoint.row, movingPoint.column);
    moveFigure(moving, movingPoint.row, movingPoint.column); 
   
    //drawGrid();    
}

function fillGrid(count) {
    if(count == undefined)
        return;
    filledPoints = {}; 
    for (var i = 0; i < count; ++i) {
        var row = Common.getRandomInt(0, rows);
        var column = Common.getRandomInt(0, columns);
        console.log("Fill " + row + " " + column);
        var red = Common.getRandomInt(0, 256);
        var green = Common.getRandomInt(0, 256);
        var blue = Common.getRandomInt(0, 256);
        var alpha = Common.getRandomInt(0, 11)/10;
        var temp_mc = moving.color.toRGB();
        var temp_color = new Common.Color(red,green,blue,alpha);        
        var point = new Tetris.Point(temp_color, cellWidth - CELL_MARGIN, cellHeight - CELL_MARGIN);             
        movePoint(point, row, column); 
        Common.assert(temp_mc === moving.color.toRGB());
        
        filledPoints[row+":"+column] = true;               
    }        
}


function applyClick() {
    var canvas = document.getElementById("canvas");
    if (canvas) {
        var width = document.getElementById("canvas_width").value;
        var height = document.getElementById("canvas_height").value;
        canvas.width = width;
        canvas.height = height;
        cellWidth = canvas.width / columns;
        cellHeight = canvas.height / rows;
        drawGrid();
    }
}

function applyCountClick() {
    var count = document.getElementById("fill_count").value;
    clear();
    drawGrid();
    fillGrid(count);
    //clear(moving.rect());
    //moving.setColor(new Common.Color(0,0,0));
    refresh();
}



function keyEvent(event) {
    var key = event.keyCode || event.which;
    // var keychar = String.fromCharCode(key);
    // console.log("Keychar is " + key);
    //alert("Key pressed " + key);

    if (key == LEFT_ARROW || key == RIGHT_ARROW || key == UP_ARROW || key == DOWN_ARROW) {
        move(key);
        //alert("Key pressed " + key);
    }
    if(key == SPACE) {
        rotateFigure(moving);
    }
}

function move(key) {
    if(isMoving)
        return;
    isMoving = true;    
    var shouldMove = false;
    var row = movingPoint.row;
    var column = movingPoint.column;
    if (key == RIGHT_ARROW) {
        if (movingPoint.column < columns - 1) {
            ++column;
            shouldMove = true;
        }
    } else if (key == LEFT_ARROW) {
        if (movingPoint.column > 0) {
            --column;
            shouldMove = true;
        }
    } if (key == DOWN_ARROW) {
        if (movingPoint.row < rows - 1) {                   
            ++row;
            shouldMove = true;
        }
    } else if (key == UP_ARROW) {
        if (movingPoint.row > 0) {
            --row;
            shouldMove = true;
        }
    }
    if (shouldMove) {
        if(moveFigure(moving, row, column)) {
            movingPoint.row = row;
            movingPoint.column = column;
        }
        // if(!(row+":"+column in filledPoints)) {
        //     movingPoint.row = row;
        //     movingPoint.column = column;            
        //     refresh();
        // }
    }
    isMoving = false;
}

function movePoint(point, row, column) {
    var gridPoint = gridCells[row][column];
    var x = gridPoint.x;
    var y = gridPoint.y;    
    x += CELL_MARGIN/2.0;
    y += CELL_MARGIN/2.0;
    ctx.fillStyle = point.color.toRGB();
    ctx.fillStroke = new Common.Color(0,0,0).toRGB();
    ctx.beginPath();        
    ctx.moveTo(x, y + point.radius);
    ctx.lineTo(x, y + point.height - point.radius);
    ctx.quadraticCurveTo(x, y + point.height, x + point.radius, y + point.height);
    ctx.lineTo(x + point.width - point.radius, y + point.height);
    ctx.quadraticCurveTo(x + point.width, y + point.height, x + point.width, y + point.height - point.radius);
    ctx.lineTo(x + point.width, y + point.radius);
    ctx.quadraticCurveTo(x + point.width, y, x + point.width - point.radius, y);
    ctx.lineTo(x + point.radius, y);
    ctx.quadraticCurveTo(x, y, x, y + point.radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    point.x = x;
    point.y = y;
    point.row = row;
    point.column = column;
    //point
}

function moveFigure(figure, row, column) {
    figure.getPoints().forEach(function(element) {
        var key = element.row + ":" + element.column;
        if(key in filledPoints)
            delete filledPoints[key];
    }, this);
    if(!arePointsAvailable(figure.pointsAfterMove(row,column)))
    {
        figure.getPoints().forEach(function(element) {
            filledPoints[element.row+":"+element.column] = true;
        }, this);
        return false;
    }
        
    clear(figure);        
    // var myPoints = [];
    figure.move(row, column);                   
    figure.getPoints().forEach(function(element) {
        filledPoints[element.row+":"+element.column] = true;
        movePoint(element, element.row, element.column);    
    }, this);       
    return true; 
}

function rotateFigure(figure) {
    figure.getPoints().forEach(function(element) {
        var key = element.row + ":" + element.column;
        if(key in filledPoints)
            delete filledPoints[key];
    }, this);
    if(!arePointsAvailable(figure.pointsAfterRotate()))
    {
        figure.getPoints().forEach(function(element) {
            filledPoints[element.row+":"+element.column] = true;
        }, this);
        return false;
    }
        
    clear(figure);        
    // var myPoints = [];
    figure.rotate();                   
    figure.getPoints().forEach(function(element) {
        filledPoints[element.row+":"+element.column] = true;
        movePoint(element, element.row, element.column);    
    }, this);       
    return true; 
}