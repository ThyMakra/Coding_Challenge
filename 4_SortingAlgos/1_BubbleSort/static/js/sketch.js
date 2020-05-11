let values = [];

let step = 0;
var A = 0;
var B = 0;

var W = 50;

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function setup() {
    createCanvas(800, 800);
    frameRate(10);
    // background(0);

    for (i = 0; i < width / W; i++) {
        values.push(random(height));
    }
    
    // for (i = 0; i < values.length; i++) {
    //     for (j = 0; j < values.length - i-1; j++) {
    //         var a = values[j];
    //         var b = values[j + 1];
    //         if (a > b) {
    //             swap(values, j, j+1);
    //         }
    //     }
    // }
}


function draw() {
    background(0);
    
    
    if (A < values.length) {
        // do only one comparison
        var a = values[B];
        var b = values[B + 1];
        if (a > b) {
            swap(values, B, B+1);
        }
        B++;
        if (B >= values.length - A - 1) {
            B = 0;
            A = A + 1;
        }
    } else {
        console.log("Finished");
        noLoop();
    }

    for (var i = 0; i < values.length; i++) {
        // line(i, height, i, height - values[i]);

        rect(i * W, 0, W, values[i])
        if (B == i + 1 && A < values.length) {
            fill(155, 0, 0)
        } else {
            fill(155, 0, 255)
        }
    }
}