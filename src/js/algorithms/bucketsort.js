import insertionsort from "./insertionsort.js";
import currentListState from "../util algorithms/currentlist.js";

export default function bucketsort(array) {
    let result = []
    const length = array.length+1
    // create K buckets
    const buckets = [...new Array(5)].map(() => []);

    // find the maximum value that will be used for distribution
    const max = Math.max(...array);

    // distribute the elements into the buckets
    for (let i = 0; i < array.length; i++) {
        const number = array[i];
        const bucketIndex = Math.floor(number / (max + 1) * 5);
        const bucket = buckets[bucketIndex];
        bucket.push(number);
        // visualize {
            let n = [...array];
            n[length] = [bucketIndex]
            result.push(n)
        // }

        // insertion sort within the bucket
        let j = bucket.length - 1;
        while (j > 0 && bucket[j - 1] > bucket[j]) {
            const temp = bucket[j - 1];
            bucket[j - 1] = bucket[j];
            bucket[j] = temp;
            // visualize {
                
                let na = [...array];
                na[length] = [j]
                result.push(na)
            // }
            j--;
        }
        // visualize {
            
            let nb = [...array];
            nb[length] = [i]
            result.push(nb)
        // }
    }

    // concatenate the buckets back into the array
    let i = 0;
    for (let bucketIndex = 0; bucketIndex < 5; bucketIndex++) {
        const bucket = buckets[bucketIndex];
        for (let j = 0; j < bucket.length; j++) {
            array[i] = bucket[j];
            // visualize {
                let nc = [...array];
                nc[length] = [i]
                result.push(nc)
                
            // }
            i++;
        }
    }
    return result
}