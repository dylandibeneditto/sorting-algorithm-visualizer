export default function overlapLists(list1, list2) {
    let result = []
    for(let i = 0; i < list1.length; i++) {
        if(list2[i]) {
            result.push(list2[i])
        } else {
            result.push(list1[i])
        }
    }
    return result;
}