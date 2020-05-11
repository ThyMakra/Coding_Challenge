/*

let N = 5;
let RATIO = 0.5;

let points;

let current;
let previous;


function setup() {
    createCanvas(800, 800);
    // frameRate(20);
    background(255);

    points = [];
    for (i = 0; i < N; i++) {
        // make the point surrount the circles. = around 360
        let angle = i * TWO_PI / N;
        let v = p5.Vector.fromAngle(angle);
        v.mult(width / 2);
        v.add(width / 2 , height / 2);
        points.push(v);
    }
    // custom function
    reset();
}


function reset() {
    stroke(255);
    strokeWeight(5);

    // create a random point coordinates
    current = createVector(random(width), random(height));
    for (let p of points) {
        point(p.x, p.y);
    }
}

function draw() {

    for (i = 0; i <= 1000; i++) {
        strokeWeight(0.5);
        stroke(77, 166, 255, 200);

        let next = random(points);
        if (next != previous) {
            current.x = lerp(current.x, next.x, RATIO);
            current.y = lerp(current.y, next.y, RATIO);
            point(current.x, current.y);
        }
        previous = next;


    }
    // noLoop();
}

*/

let x = 0;
let y = 0;

function setup() {
    createCanvas(500, 500);
    background(0);
}

// -2.1820 < x < 2.6558
// 0 <= y < 9.9983
function drawPoint() {
    stroke(79, 121, 66);
    strokeWeight(1);
    let px = map(x, -2.1820, 2.6558, 0     , width);
    let py = map(y, 0      , 9.9983, height, 0    );
    point(px, py);
}

function nextPoint() {
    let nextX;
    let nextY;

    let r = random(1);

    if (r < 0.01) {
        nextX = 0;
        nextY = 0.16 * y;
    } 
    else if (r < 0.86) {
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
    }
    else if (r < 0.93) {
        nextX = 0.2 * x - 0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
    } 
    else {
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
    }

    x = nextX;
    y = nextY;
}

function draw() {
    for (i = 0; i < 1000; i++) {
        drawPoint();
        nextPoint();
    }
}