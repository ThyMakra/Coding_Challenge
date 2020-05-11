def merge(left, right):
    new_array = []
    while len(left) > 0 and len(right) > 0:
        if (left[0] < right[0]):
            new_array.append(left[0])
            left = left[1:]
        else:
            new_array.append(right[0])
            right = right[1:]
    # at this point eith left of right is already empty
    # the left-over array will have the biggest elements
    return new_array + right + left

def mergeSort(array):
    size = len(array)
    if size == 1:
        return array
    
    left_side = array[:size//2]
    right_side = array[size//2:]
    # recusive 
    return merge(
        mergeSort(left_side), mergeSort(right_side)
    )


# TEST
import random
arr = random.sample(range(0, 100), 10)
print(f'before sort : {arr}')
print(f'after sort : {mergeSort(arr)}')