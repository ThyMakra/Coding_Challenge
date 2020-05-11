let values = [];

// let step = 0;
// var A = 0;
// var B = 0;

var left = [1, 2, 3, 3].map(x => x * 100);
var right = [3, 4, 4, 5].map(x => x * 100);

var W = 100;


function setup() {
    createCanvas(windowWidth, 800);
    // frameRate(10);

    for (i = 0; i < width / W; i++) {
        values.push(random(height));
    }
    

}


function draw(val) {
    val = values
    background(0);

    // mergeSort(val)

    for (var i = 0; i < left.length; i++) {
        fill(255, 0, 0);
        rect(i * W, 0, W, left[i]);
    }
    l = left.length

    for (var i = 0; i < right.length; i++) {
        fill(0, 0, 255);
        rect((i + l) * W, 0, W, right[i]);
    }
    
    noLoop()
}