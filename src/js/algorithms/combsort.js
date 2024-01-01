export default function combsort(arr) {
    let result = []

    function getNextGap(gap) {
        gap = parseInt((gap * 10) / 13, 10);
        if (gap < 1)
            return 1;
        return gap;
    }

    let gap = arr.length;

    let swapped = true;

    while (gap != 1 || swapped == true) {

        gap = getNextGap(gap);

        swapped = false;

        for (let i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                let temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                const newArr = [...arr]
                newArr[arr.length + 1] = [i, gap]
                result.push(newArr)

                swapped = true;
            }
        }
    }
    return result
}