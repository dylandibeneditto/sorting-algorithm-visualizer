export default function bogosort (list) {
    var i = list.length, j, temp;
    if (i == 0) return list;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}