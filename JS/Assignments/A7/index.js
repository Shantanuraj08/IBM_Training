// Q1. Find number of digits
function Find_Digits(N) {
    return N.toString().length;
}

console.log(Find_Digits(1234));


// Q2. Find the Fives
function Find_Five(N) {
    let count = 0;
    let str = N.toString();

    for (let ch of str) {
        if (ch === '5') count++;
    }

    return count;
}

console.log(Find_Five(345654));


// Q3. Find Sum of even numbers till N
function findSum(N) {
    let sum = 0;

    for (let i = 2; i <= N; i += 2) {
        sum += i;
    }

    return sum;
}

console.log(findSum(6));


// Q4. Sum of digits
function Number_Sum(N) {
    let sum = 0;

    while (N > 0) {
        sum += N % 10;
        N = Math.floor(N / 10);
    }

    return sum;
}

console.log(Number_Sum(1234));


// Q5. Print Odds (2 first, then odd numbers)
function Print_Odd(N) {
    let res = "2 ";

    for (let i = 3; i <= N; i++) {
        if (i % 2 !== 0) res += i + " ";
    }

    console.log(res.trim());
}

Print_Odd(10);


// Q6. Print Pattern
function Print_pattern(N) {
    for (let i = 1; i <= N; i++) {
        console.log("*".repeat(i));
    }
}

Print_pattern(5);


// Q7. Prime Check
function Prime_Check(N) {
    if (N < 2) return "NO";

    for (let i = 2; i * i <= N; i++) {
        if (N % i === 0) return "NO";
    }

    return "YES";
}

console.log(Prime_Check(7));
console.log(Prime_Check(4));


// Q8. Print Numbers
function printNumbers(N) {
    let res = "";
    for (let i = 1; i <= N; i++) {
        res += i + " ";
    }
    console.log(res.trim());
}

printNumbers(4);


// Q9. Print Table
function Print_Table(N) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${N}*${i}=${N * i}`);
    }
}

Print_Table(3);