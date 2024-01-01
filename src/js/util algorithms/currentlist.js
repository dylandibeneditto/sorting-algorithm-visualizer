export default function currentListState(arr, index, list, length) {
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