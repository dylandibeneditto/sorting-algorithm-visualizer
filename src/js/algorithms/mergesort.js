export default function mergesort(list) {
    const result = [];
    const length = [...list].length+1;

    function merge(left, right, index) {
        let sortedArr = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                sortedArr.push(left[leftIndex++]);
            } else {
                sortedArr.push(right[rightIndex++]);
            }
            const currentList = currentListState(sortedArr, index, [...list], length)
            result.push(currentList)
            list = currentList
        }

        while (leftIndex < left.length) {
            sortedArr.push(left[leftIndex++]);

            const currentList = currentListState(sortedArr, index, [...list], length)
            result.push(currentList)
            list = currentList
        }

        while (rightIndex < right.length) {
            sortedArr.push(right[rightIndex++]);

            const currentList = currentListState(sortedArr, index, [...list], length)
            result.push(currentList)
            list = currentList
        }
        return sortedArr;
    }

    function mergeSort(arr, index = 0) {
        if (arr.length <= 1) {

            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid), index);
        const right = mergeSort(arr.slice(mid), index + mid);
        const currentList = currentListState(merge(left, right, index), index, [...list], length)
        result.push(currentList)
        list = currentList
        return merge(left, right, index);
    }
    
    const sortedArray = mergeSort(list.slice());
    return result;
}

function currentListState(arr, index, list, length) {
    let aux = []
    for (let i = 0; i < list.length; i++) {
        if(i>index-1&&i<arr.length+index) {
            aux.push(arr[i-index])
        } else {
            aux.push(list[i])
        }
    }
    aux[length] = [index]
    return aux;
}