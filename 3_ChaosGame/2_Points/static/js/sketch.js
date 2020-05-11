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