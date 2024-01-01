export default function insertionsort(list) {
    let i, key, j;
    let result = []
    for (i = 1; i < list.length; i++) {
        key = list[i];
        j = i - 1;
        while (j >= 0 && list[j] > key) {
            list[j + 1] = list[j];
            j = j - 1;
        }
        list[j + 1] = key;
        let newList = [...list]
        newList[list.length + 1] = [j, i]
        result.push(newList)
    }
    return result;
}  