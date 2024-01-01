export default function combsort(arr) {
    let result = []

    function getNextGap(gap) {
        // Shrink gap by Shrink factor
        gap = parseInt((gap * 10) / 13, 10);
        if (gap < 1)
            return 1;
        return gap;
    }

    // initialize gap
    let gap = arr.length;

    // Initialize swapped as true to
    // make sure that loop runs
    let swapped = true;

    // Keep running while gap is more than
    // 1 and last iteration caused a swap
    while (gap != 1 || swapped == true) {
        // Find next gap
        gap = getNextGap(gap);

        // Initialize swapped as false so that we can
        // check if swap happened or not
        swapped = false;

        // Compare all elements with current gap
        for (let i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap arr[i] and arr[i+gap]
                let temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                const newArr = [...arr]
                newArr[arr.length + 1] = [i, gap]
                result.push(newArr)

                // Set swapped
                swapped = true;
            }
        }
    }
    return result
}