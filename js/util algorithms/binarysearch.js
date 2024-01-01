export default function binarysearch(a, item, low, high) {

    if (high <= low)
        return (item > a[low]) ? (low + 1) : low;

    const mid = Math.floor((low + high) / 2);

    if (item == a[mid])
        return mid + 1;

    if (item > a[mid])
        return binarysearch(a, item, mid + 1, high);

    return binarysearch(a, item, low, mid - 1);
}