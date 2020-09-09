export var pathsList = []

// Utilities
const GetDistanceBetween = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        console.log("Pass arrays in parameters")
        return;
    }
    if (a.length != 2 || b.length != 2) {
        console.log("Pass arrays with 2 items")
        return;
    }

    return 3963 * Math.acos((Math.sin(a[0])*Math.sin(b[0])) + Math.cos(a[0])* Math.cos(b[0]) * Math.cos(b[1]-a[1]))
    //return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2))
}

const Swap = (array, index1, index2) => {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return array;
};

const HeapPermutation = (array, array1, callback, n) => {
    n = n || array.length; // set n default to array.length
    if (n === 1) {
        callback(array, array1);
    } else {
        for (var i = 1; i <= n; i++) {
            HeapPermutation(array, array1, callback, n - 1);
            if (n % 2) {
                // When length is odd so n % 2 is 1,  select the first number, then the second number, then the third number. . . to be swapped with the last number
                Swap(array, 0, n - 1);
            } else {
                // When length is even so n % 2 is 0,  always select the first number with the last number
                Swap(array, i - 1, n - 1);
            }
        }
    }
};

const Output = (input, array) => {
    var clone = input.slice();
    clone.unshift(array[0])
    clone.push(array[1])
    pathsList.push(clone)
};


const GetLenghtOfPath = (checkpoints) => {
    // Loop through all points and execute GetDistanceBetween(n,n+1) if n < chekpoints.lenght
    var length = 0

    checkpoints.forEach((checkpoint, index) => {
        if (index < checkpoints.length - 1) {
            length += GetDistanceBetween(checkpoint[1], checkpoints[index + 1][1])
        }
    });

    return length
}

export const ClearPathList = () => {
    pathsList = []
}

export const GetAllPossiblePaths = (checkpoints, start, end) => {
    const clone = checkpoints.slice();
    // Extract start and end from the list
    var innerChekpoints = clone

    innerChekpoints.splice(innerChekpoints.indexOf(start), 1)
    innerChekpoints.splice(innerChekpoints.indexOf(end), 1)

    var outerCheckpoints = [start, end]

    // Find all permutations
    HeapPermutation(innerChekpoints, outerCheckpoints, Output)
}

export const GetFastestPath = () => {
    var lengthList = []

    // Loop through all paths and execute GetLenghtOfPath and Store result
    pathsList.forEach((path, index) => {
        lengthList.push(GetLenghtOfPath(path))
    })
    // Return the fastest
    return pathsList[lengthList.indexOf(Math.min(...lengthList))]
}