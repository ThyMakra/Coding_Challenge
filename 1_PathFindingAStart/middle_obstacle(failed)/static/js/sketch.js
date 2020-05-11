
function removeFromArray(arr, ele) {
    // if going forward in an array, after removing an element, it will skip an element
    for (var i = arr.length - 1; i >= 0; i--) { 
        if (arr[i] == ele) {
            arr.splice(i, 1); // remove 1 element from the index "i"
        } 
    }
}

function getHeuristic(a, b) {
        // work with diagonal 
    var d = dist(a.i, a.j, b.i, b.j); // euclidean distance between point a & b

        // work with straight
    // var d = abs(a.i - b.i) + abs(a.j - b.j) // manhattan distance 
    
    return d;
}
    

// start the graph
var cols = 50;
var rows = 50;
var grid = new Array(cols); // initiate an array of size 5 as columns

var openSet = [];
var closedSet = [];     
var start;
var end;

var w, h; 
var path = [];

function Spot(i, j) {
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.previous = undefined;

    // obstacle
    this.wall = false;
    if (cols - i - 1 === j) {
        if (j !== Math.floor(rows / 1.3)){
            this.wall = true;
        }
    } else if (cols - i - 2 === j) {
        if (j !== Math.floor(rows / 1.3)){
            this.wall = true;
        }
        
    }
    

    this.show = function(color) {
        fill(color); // show the color on the grid
        if (this.wall) {
            fill(0);
        }

        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1); // make the grid
    }

    // get the neighbor nodes
    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }

        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1])
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1])
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1])
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1])
        }
        
    }
}


function setup() {
    createCanvas(400, 400);
    console.log('A*');

    w = width / cols;
    h = height / rows;

    
    // making 2D array 
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);  //  for each columns it has its own array of size "rows"
    }

    // for each cell / spot
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
            // you can't addNeighbors to the spot here
            // because there is no spots next to it yet
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid); 
        }
    }

    start = grid[0][0]; // start node
    end = grid[cols - 1][rows - 1]; // goal node
    start.wall = false;
    end.wall = false;

    openSet.push(start);

    console.log(grid);
}


// open_set (array) : nodes still need to evaluate
// closed_set (array) : store the nodes that have finished being evaluated, you don't need to revisit them again
// the program can either end when :
    // arrive at the destination
    // or nothing left in open_set

// this function will continue to loop in the program
// it is like a while loop already in the program
function draw() {

    if (openSet.length > 0) {

        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if (current === end) { // if reach the end
            noLoop();
            console.log("DONE!");
        }

        removeFromArray(openSet, current);// openSet.remove(current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            // check for neighbor that has not been visited
            // and not obstacle 
            if (!closedSet.includes(neighbor) && !neighbor.wall) { 
                var tempG = current.g + 1;

                var newPath = false;
                if (openSet.includes(neighbor)) { // check if you have evaluated before
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.h = getHeuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h; // f = g + h
                    
                    // trace back and find the optimal path
                    neighbor.previous = current;
                }
                
            }
            
        }

    } else { 
        console.log("No solution");
        noLoop();
        return;
    }

    background(0);

    // for debugging
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255)); // show each spot
        }
    }
    
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }
    
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0)); 
    }

    // find the optimal path 
    // backtrack
    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    // show the path
    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
}
