export default function LSDradixsort(list) {
    let result = [];
    function getMax(list) {
        let mx = list[0];
        for (let i = 1; i < list.length; i++)
            if (list[i] > mx)
                mx = list[i];
        return mx;
    }

    function countSort(list, exp) {
        let output = new Array(list.length);
        let i;
        let count = new Array(10);
        
        for (let i = 0; i < 10; i++) {
            count[i] = 0;
        }

        for (i = 0; i < list.length; i++) {
            var x = Math.floor(list[i] / exp) % 10;
            count[x]++;
        }
        
        for (i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (i = list.length - 1; i >= 0; i--) {
            var x = Math.floor(list[i] / exp) % 10;
            output[count[x] - 1] = list[i];
            count[x]--;
        }
        
        for (i = 0; i < list.length; i++) {
            list[i] = output[i];
            var newList = [...list]
            newList[list.length+1] = [i]
            result.push(newList)
        }
    }

    let m = getMax(list);

    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        countSort(list, exp);
    }

    return result
}