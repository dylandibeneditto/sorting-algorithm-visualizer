export default function selectionsort(list) {
    let result = [];
    let length = list.length + 1

    for (let i = 0; i < list.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < list[minIndex]) {
                minIndex = j;
                console.log([...list])
                list[length] = [j]
                result.push([...list]);
            }
        }

        if (minIndex !== i) {
            const minValue = list[minIndex];
            for (let k = minIndex; k > i; k--) {
                list[k] = list[k - 1];
            }
            list[length] = [...list[length], minValue]
            list[i] = minValue;
            result.push([...list]);
            list.pop()
            list.pop()
        }
    }

    return result;
}