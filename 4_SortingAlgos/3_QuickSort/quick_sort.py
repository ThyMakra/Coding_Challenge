# low = starting index
# high = ending index

def quickSort(array, low, high):
    if low < high: 
        pivot = partition(array, low, high)
    
        quickSort(array, low, pivot - 1)
        quickSort(array, pivot + 1, high)
    print(f'array : {array}')
'''
    this function takes last element as pivot, places the pivot element
    at its correct position in sorted array, and places all smaller 
    (small than pivot) and all greater elements to right of pivot
'''

def partition(array, low, high):
    # pivot (element to be placed at right position)
    pivot = array[high]

    i = low - 1

    for j in range(low, high):
        if array[j] < pivot:
            i += 1
            # swap(array[i], array[j])
            array[i], array[j] = array[j], array[i]
    # swap (array[i + 1], array[high])
    array[i + 1], array[high] = array[high], array[i + 1]
    return i + 1

quickSort([80, 30, 90, 40, 50, 70], 0, 5)