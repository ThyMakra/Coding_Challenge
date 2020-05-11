// to remove a certain wall

// Daniel Shiffman
// DFS, Recursive backtracker

var cols, rows;
var w = 40;
var grid = [];

var current;

var stack = [];

function setup() {
    createCanvas(400, 400);
    // frameRate(20);
    cols = floor(width / w);
    rows = floor(height / w);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            console.log(2)
            grid.push(cell);

        }
    }

    current = grid[0];

}

function draw() {
    console.log(1)
    background(50);

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    // STEP1 : pick a random neighbor
    current.visited = true;
    current.hightlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        // STEP 2 : push the current to the stack
        stack.push(current);
        // STEP3 : remove the wall of the current cell and the chose cell
        removeWalls(current, next);
        // STEP4 : move to the next cell
        current = next;
    } else if (stack.length > 0) { // if the stack is not empty 
        current = stack.pop(); // going back to the previus cell
    } else {
        noLoop();
        console.log("FINISHED");
    }

    // noLoop();

}

// convert 1D array to behave like 2D
function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || i > rows - 1) { // edge
        return -1;
    }
    return i + j * cols; // the algorithm
}

//constructor function for each cell
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // top right bottom left

    this.visited = false;

    this.show = function() {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255, 255, 25);

        if (this.walls[0]) { // top
            line(x    , y    , x + w, y    ); 
        }
        if (this.walls[1]) { // right 
            line(x + w, y    , x + w, y + w); 
        }
        if (this.walls[2]) { // bottom
            line(x + w, y + w, x    , y + w);
        }
        if (this.walls[3]) { // left
            line(x    , y + w, x    , y    );
        }
        
        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }

    this.checkNeighbors = function() {
        var neighbors = [];

        var top    = grid[index(i    , j - 1)];
        var right  = grid[index(i + 1, j    )];
        var bottom = grid[index(i    , j + 1)];
        var left   = grid[index(i - 1, j    )];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.hightlight = function() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(100, 100, 255, 100);
        rect(x, y, w, w);
    }
}


function removeWalls(current, neighbor) {
    var horizontal = current.i - neighbor.i;

    if (horizontal === 1) { // left side
        current.walls[3] = false; // remove the left wall of the current cell
        neighbor.walls[1] = false; // remove the right wall of the neighbor cell
    } else if (horizontal === -1) { // right side
        current.walls[1] = false; // remove the right wall of the current cell
        neighbor.walls[3] = false; // remove the left wall of the neighbor cell
    } 

    var vertical = current.j - neighbor.j; 
    if (vertical === 1) { // top
        current.walls[0] = false; // remove the top wall of the current cell
        neighbor.walls[2] = false; // remove the bottom wall of the neighbor cell
    } else if (vertical === -1) { // bottom
        current.walls[2] = false; // remove the bottom wall of the current cell
        neighbor.walls[0] = false; // remove the top wall of the neighbor cell
    }


}