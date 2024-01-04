import overlapLists from "../util algorithms/overlaplists.js";

export default function heapsort(list) {
    let result = []
    function createHeap(arr) {
        let heap = [...arr];
        for (let i = Math.floor(heap.length / 2); i >= 0; i--) {
            heapify(heap, i, heap.length);

            var newList = overlapLists(overlapLists([...list],[...sortedlist]), heap)
            newList[list.length+1] = [i]
            result.push(newList)
        }
        return heap;
    }

    function heapify(heap, i, heapSize) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let largest = i;
        if (left < heapSize && heap[left] > heap[largest]) {
            largest = left;
        }
        if (right < heapSize && heap[right] > heap[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            heapify(heap, largest, heapSize);
        }
    }

    let sortedlist = [];
    let heap = createHeap(list);
    while (heap.length > 0) {
        // Remove the maximum element from the heap and add it to the sorted list

        sortedlist.unshift(heap.shift());
        var newList = overlapLists(result[result.length-1], sortedlist)
        newList[list.length+1] = [1]
        console.log(result.length)
        // Re-heapify the remaining elements
        heap = createHeap(heap);
    }
    return result;
}