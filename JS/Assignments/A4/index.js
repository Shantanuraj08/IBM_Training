
function Find_Prod(arr) {
    let product = 1;

    for (let i = 0; i < arr.length; i++) {
        product *= arr[i];
    }

    return product;
}

console.log("Q1:", Find_Prod([1, 2, 3, 4, 5])); 


// Q2. Find the Sum

function Find_Sum(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

console.log("Q2:", Find_Sum([1, 2, 3, 4, 5]));


// Q3. Count Occurrences

function findCount(arr, K) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === K) {
            count++;
        }
    }

    return count;
}

console.log("Q3:", findCount([3, 3, 1, 2], 3)); 


// Q4. Even Odd

function findEvenOdd(arr) {
    let evenSum = 0;
    let oddSum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            evenSum += arr[i];
        } else {
            oddSum += arr[i];
        }
    }

    return [evenSum, oddSum];
}

console.log("Q4:", findEvenOdd([1, 2, 3, 4, 5, 6, 7])); // 


// Q5. Find whether number is present

function Find_Num(arr, M) {
    return arr.includes(M) ? "YES" : "NO";
}

console.log("Q5:", Find_Num([1, 2, 3, 4, 5], 2)); 
console.log("Q5:", Find_Num([1, 2, 3, 4, 5], 9)); 


// Q6. Higher Age

function highAge(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 18) {
            result.push(arr[i]);
        }
    }

    return result;
}

console.log("Q6:", highAge([11, 23, 3, 45, 72, 68]));



// Q7. Increment Array Elements

function Inc_Arr(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i] + 1);
    }

    return result;
}

console.log("Q7:", Inc_Arr([1, 2, 3, 4, 5]));



// Q8. Pass or Fail

function isAllPass(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 32) {
            return "NO";
        }
    }

    return "YES";
}

console.log("Q8:", isAllPass([13, 89, 45, 98, 67, 45, 54]));


console.log("Q8:", isAllPass([35, 40, 50]));


// Q9. Unique Color Shirt

function uniqueShirts(arr) {
    let freq = {};

    for (let color of arr) {
        freq[color] = (freq[color] || 0) + 1;
    }

    let count = 0;

    for (let key in freq) {
        if (freq[key] === 1) {
            count++;
        }
    }

    return count;
}

console.log("Q9:", uniqueShirts([3, 2, 4, 1, 2, 3]));



// Q10. Min and Max

function MinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }

        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return [min, max];
}

console.log("Q10:", MinMax([33, 11, 44, 66, 22, 77]));