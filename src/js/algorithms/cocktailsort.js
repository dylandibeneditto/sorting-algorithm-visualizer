export default function cocktailsort(list) {
    let swapped = true;
    let start = 0;
    let end = list.length;
    let result = []

    while (swapped == true) {

        // reset the swapped flag on entering the
        // loop, because it might be true from a
        // previous iteration.
        swapped = false;

        // loop from bottom to top same as
        // the bubble sort
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

        // if nothing moved, then listay is sorted.
        if (swapped == false)
            break;

        // otherwise, reset the swapped flag so that it
        // can be used in the next stage
        swapped = false;

        // move the end point back by one, because
        // item at the end is in its rightful spot
        end = end - 1;

        // from top to bottom, doing the
        // same comparison as in the previous stage
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

        // increase the starting point, because
        // the last stage would have moved the next
        // smallest number to its rightful spot.
        start = start + 1;
    }
    return result
}