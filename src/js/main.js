import Visualizer from './visualizer.js'

import bogosort from './algorithms/bogosort.js';
import bubblesort from './algorithms/bubblesort.js';
import selectionsort from './algorithms/selectionsort.js';
import mergesort from './algorithms/mergesort.js';
import insertionsort from './algorithms/insertionsort.js';
import binaryinsertionsort from './algorithms/binaryinsertionsort.js';
import quicksort from './algorithms/quicksort.js';
import LSDradixsort from './algorithms/LSDradixsort.js';
import countingsort from './algorithms/countingsort.js';
import bucketsort from './algorithms/bucketsort.js';
import combsort from './algorithms/combsort.js';

const el = document.getElementById("container");
const v = new Visualizer(combsort,10,100,el)

document.addEventListener('click', () => {
    v.start()
});