import overlapLists from "../util algorithms/overlaplists.js";

export default function countingsort(list) {
    let result = []
    if (list.length === 0) {
       return list;
    }
     
    let min = list[0];
    let max = list[0];
    for (let i = 1; i < list.length; i++) {
       if (list[i] < min) {
          min = list[i];
       }
       if (list[i] > max) {
          max = list[i];
       }
    }
     
    const count = new Array(max - min + 1).fill(0);
    const output = new Array(list.length);
     
    for (let i = 0; i < list.length; i++) {
       count[list[i] - min]++;
       let res = overlapLists(list,output)
       res[[...list].length+1] = [i]
       result.push(res)
    }

    for (let i = 1; i < count.length; i++) {
       count[i] += count[i - 1];
       let res = overlapLists(list,output)
       res[[...list].length+1] = [i]
       result.push(res)
    }
     
    for (let i = list.length - 1; i >= 0; i--) {
       output[count[list[i] - min] - 1] = list[i];
       count[list[i] - min]--;
       let res = overlapLists(list,output)
       res[[...list].length+1] = [i]
       result.push(res)
    }
    console.log(result)
    return result;
 }