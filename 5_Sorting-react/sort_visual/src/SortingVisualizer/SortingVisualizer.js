import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import getMergeSortAnimation  from './SortingAlgorithms/MergeSort';


const ANIMATION_SPEED = 5;
const NUMBER_OF_BARS = 100;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


const SortingVisualizer = () => {
    // set empty array as the state
    const [array, setArray] = useState([]);

    // when component loaded
    useEffect(() => {
        resetArray();
    }, []);
    /* which means that the effect function should be called once: after the first mount/render only. This is used widely when you're doing data fetching in a component and you want to save the request data in the component's state */

    // function to get random elements in a new resetted array
    const resetArray = () => {
        let arr = [];
        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            arr.push(randomIntFromInterval(5, 500));
        }
        setArray(arr);
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimation(array);
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            /* 
            0: red; comparing 2 values
            1: turquoise; change color back
            2: then swap
            */
            const isColorChange = i % 3 !== 2;
            /* don't swap, but just override one value */
            if (isColorChange) {
                const [barOneInd, barTwoInd] = animations[i];
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;

                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {  
                    const [barOneInd, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneInd].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
        
    }
    const quickSort = () => {}
    const heapSort = () => {}
    const bubbleSort = () => {}

    return (
        <div className="array-container">
            {
                array.map((value, ind) => (
                    <div 
                        className="array-bar" 
                        key={ ind }
                        style={{height: `${value}px`}}>
                        
                    </div>
                ))
            }
            <div className="button-group">
                <button onClick={() => resetArray()}>Reset</button>
                <button onClick={() => mergeSort()}>Merge Sort</button>
                <button onClick={() => quickSort()}>Quick Sort</button>
                <button onClick={() => heapSort()}>Map Sort</button>
                <button onClick={() => bubbleSort()}>Bubble Sort</button>
            </div>
        </div>
        
    );
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;

