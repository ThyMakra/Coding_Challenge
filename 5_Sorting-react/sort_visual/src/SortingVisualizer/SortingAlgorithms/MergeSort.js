const doMerge = (
    mainArray,
    startInd,
    middleInd,
    endInd,
    auxiArray,
    animations
) => {
    let k = startInd;
    let i = startInd;
    let j = middleInd + 1;
    /* comparing, reverting, swapping animation */
    /* 
        i : start -> middle
        j: middle+1 -> end 
    */
    
    while (i <= middleInd && j <= endInd) {
        /* values that are comparing, push to change color */
        animations.push([i, j]);
        /* push again to revert back the color */
        animations.push([i, j]);
            /* 
            main vs auxi
            main: iterates and change element '0' to 'len - 1'
            auxi: is not swapped, divided-like.
            */
        /* overwrite the value at index k in original array
        with value of index i in auxiArray */
        if (auxiArray[i] <= auxiArray[j]) {
            animations.push([k, auxiArray[i]]);
            mainArray[k++] = auxiArray[i++];
        } else {
            animations.push([k, auxiArray[j]]);
            mainArray[k++] = auxiArray[j++];
        }
    }
    /* either half is leftover */
    while (i <= middleInd) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiArray[i]]);
        mainArray[k++] = auxiArray[i++];
    }
    while (j <= endInd) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiArray[j]]);
        mainArray[k++] = auxiArray[j++];
    }
}

const mergeSortHelper = (
    mainArray, 
    startInd,
    endInd,
    auxiArray,
    animations
) => {
    if (startInd === endInd) return;
    const middleInd = Math.floor((startInd + endInd) / 2);
    mergeSortHelper(auxiArray, startInd, middleInd, mainArray, animations);
    mergeSortHelper(auxiArray, middleInd + 1, endInd, mainArray, animations);
    doMerge(mainArray, startInd, middleInd, endInd, auxiArray, animations);
}

const getMergeSortAnimation = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiArray, animations);
    return animations;
}

export default getMergeSortAnimation;



/* const MergeSort = (array, startInd, endInd, animations = []) => {
    if (array.length === 1) return array;
    const middleInd = Math.floor((endInd - startInd + 1) / 2);
    const firstHalf = MergeSort(array, startInd, middleInd, animations);
    const secondHalf = MergeSort(array, middleInd + 1, endInd, animations);
    let sortedArray = [];
    let i = 0, j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]){
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]);
        }
    }
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
}

export default MergeSort; */

