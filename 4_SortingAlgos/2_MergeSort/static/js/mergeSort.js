function mergeSort(array) {
    size = array.length;
    if (size == 1) {
        return array;
    }

    var middle = Math.floor(size / 2);
    left = array.slice(0, middle);
    right = array.slice(middle);

    // index = 
    left = mergeSort(left)

    // index = 
    right = mergeSort(right)

    return merge(
        left, right
    )
}

function merge(left, right) {
    var array = [];
    var leftIndex = 0;
    var rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array.push(left[leftIndex]);
            leftIndex++;
        } else {
            array.push(right[rightIndex]);
            rightIndex++;
        }
    }
    // either left or right has no element
    // now add the leftover elements at the end
    return array.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
