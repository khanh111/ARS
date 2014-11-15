var UP = RIGHT = 1,
	DOWN = LEFT = -1,
	NONE = 0;

var gameOver = false;
var board;

// make board of height height and width width with (0,0) at bottom left
function Board(width, height) {
	// this.representation = [];
	// for(var i = 0; i < height; i++) {
	// 	this.representation.push([]);
	// }
	this.width = width || 25;
	this.height = height || 25;
	this.foodPos = null;
}

Board.prototype.placeFood = function placeFood() {
	var x = Math.floor(Math.random()*this.width);
	var y = Math.floor(Math.random()*this.height);

	while(snake.occupies(new Position(x,y))) {
		x = Math.floor(Math.random()*this.width);
		y = Math.floor(Math.random()*this.height);
	}

	this.foodPos = new Position(x,y);
};


board = new Board();



function Position(x, y) {
	this.x = x;
	this.y = y;
}

// equality for positions
Position.prototype.equals = function equals(pos2) {
	// chack for equality between two positions
	return this.x === pos2.x && this.y === pos2.y;
};

function Snake(headPos) {
	this.headPos = headPos || new Position(5,5);
	this.positions = [this.headPos];
	this.direction = {dx:NONE, dy:UP};
	this.digestions = [];
}

// return snake size
Snake.prototype.size = function size() {
	return this.positions.length;
};

Snake.prototype.turn = function turn(dir) {
	// change the direction of snake movement
	// fails if the exact opposite movement
	switch(dir) {
		case UP:
		case DOWN:
			if(this.direction.dy == NONE) {
				this.direction = { dx:NONE, dy:dir };
			}
			break;
		case LEFT:
		case RIGHT:
			if(this.direction.dx == NONE) {
				this.direction = { dx:dir, dy:NONE };
			}
			break;
	}
};

Snake.prototype.move = function move() {
	// move the headPos in the direction, then shift all other pos's to right
	// if there is a collision, the player loses
	var newX = calcNewVar(this.x, this.direction.dx, board.width);
	var newY = calcNewVar(this.y, this.direction.dy, board.height);
	var newPos = new Position(newX, newY);

	if(snake.occupies(newPos)) {
		alert('You lose!');
	}
	else {
		this.positions.unshift(newPos); // remove oldestPos

		/* Check that snake needs to grow */
		var digestionEnd;
		for(var i = 0; i < this.digestions.length; i++) {
			digestionEnd = this.positions.map(function(pos1) {pos1.equals(pos2)}).indexof(true) != -1;
		}

		// if not grow, then pop last position
		if(!digestionEnd) {
			this.positions.pop(); // remove last if there is no extra block
		}
	}

	if(board.foodPos.equals(newPos)) {
		this.eatFood(newPos)
	}
};

Snake.prototype.eatFood = function eatFood(newPos) {
	this.digestions.push(newPos);
}

// return true if the snake is in a position
Snake.prototype.occupies = function occupies(pos2) {
	return this.positions.map(function(pos1) {pos1.equals(pos2)}).indexof(true) != -1;
};

// Calculate the new position of a moving snake, including wrap arounds.
var calcNewVar = function(i, delta, upperBound) {
	if(i == 0 && delta < 0) {
		return upperBound - 1;
	}
	else if(i == upperBound - 1 && delta > 0) {
		return 0;
	}
	else {
		return i + delta;
	}
};
