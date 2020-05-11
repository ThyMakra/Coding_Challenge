let ax, ay;
let bx, by;
let cx, cy;

let x, y;

function setup() {
    createCanvas(800, 800);
    // frameRate(20);
    background(0);
    // create 3 points
    ax = width / 2;
    ay = 10;
    bx = 10;
    by = height - 10;
    cx = width - 10;
    cy = height - 10;

    // create a random point coordinates
    x = random(width);
    y = random(height);
    console.log('calllllllled')
    stroke(255);
    strokeWeight(5);
    point(ax, ay);
    point(bx, by);
    point(cx, cy);


}

function draw() {


    for (i = 0; i <= 200; i++) {
        strokeWeight(1);
        stroke(255, 144, 255);
        point(x, y);

        var rand = floor(random(3));

        // lerp = linear interpolation. by percentage
        if (rand == 0) {
            x = lerp(x, ax, 0.5);
            y = lerp(y, ay, 0.5);
            // stroke(255, 144, 0);
        } else if (rand == 1) {
            x = lerp(x, bx, 0.5);
            y = lerp(y, by, 0.5);
            // stroke(255, 0, 144);
        } else if (rand == 2) {
            x = lerp(x, cx, 0.5);
            y = lerp(y, cy, 0.5);
            // stroke(0, 144, 255);
        }



    }


    // noLoop();


}