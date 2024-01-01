import binarysearch from '../util algorithms/binarysearch.js'

export default function binaryinsertionsort(list) {
    let result = []

    for (let i = 1; i < list.length; i++) {
        let j = i - 1;
        let x = list[i];
        let loc = Math.abs(binarysearch(list, x, 0, j));

        while (j >= loc) {
            list[j + 1] = list[j];
            j--;
        }

        let newList = [...list]
        newList[list.length + 1] = [j, i]
        result.push(newList)
        list[j + 1] = x;
    }
    return result
}