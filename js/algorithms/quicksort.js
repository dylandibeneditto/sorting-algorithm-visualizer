export default function quicksort(list) {
    let result = [];

    function partition(list, low, high) {
        let pivot = list[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            if (list[j] < pivot) {
                i++;
                [list[i], list[j]] = [list[j], list[i]];
            }
        }

        [list[i + 1], list[high]] = [list[high], list[i + 1]];
        return i + 1;
    }

    function quickSort(list, low = 0, high = list.length - 1) {
        if (low < high) {
            let pi = partition(list, low, high);
    
            quickSort(list, low, pi - 1);
            quickSort(list, pi + 1, high);
    
            let newList = [...list];
            newList[list.length+1] = [pi]
            result.push(newList)
        }
    }

    const sortedArray = quickSort(list.slice());

    return result;
}