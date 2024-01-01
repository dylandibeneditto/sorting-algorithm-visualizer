export default function bubblesort(list) {
    let result = [];
    const length = list.length + 1
    
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < (list.length - i - 1); j++) {
            if (list[j] > list[j + 1]) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
                list[length] = [j,j + 1]
                result.push(list.slice());
            }
        }
    }

    return result;
}