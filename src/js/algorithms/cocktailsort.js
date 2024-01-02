export default function cocktailsort(list) {
    let swapped = true;
    let start = 0;
    let end = list.length;
    let result = []

    while (swapped == true) {

        swapped = false;

        for (let i = start; i < end - 1; ++i) {
            if (list[i] > list[i + 1]) {
                let temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
                swapped = true;
                let newList = [...list]
                newList[list.length+1] = [i, i+1]
                result.push(newList)
            }
        }

        if (swapped == false)
            break;

        swapped = false;

        end = end - 1;

        for (let i = end - 1; i >= start; i--) {
            if (list[i] > list[i + 1]) {
                let temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
                swapped = true;
                let newList = [...list]
                newList[list.length+1] = [i, i-1]
                console.log(newList)
                result.push(newList)
            }
        }

        start = start + 1;
    }
    return result
}