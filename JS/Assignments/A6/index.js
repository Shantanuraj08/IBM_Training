// Q1. Find Smaller Angle
function Minimal_Angle(h, m) {
    let hourAngle = (h % 12) * 30 + (m * 0.5);
    let minuteAngle = m * 6;

    let diff = Math.abs(hourAngle - minuteAngle);
    return Math.min(diff, 360 - diff);
}

console.log(Minimal_Angle(5, 30));
console.log(Minimal_Angle(6, 0));


// Q2. Check Leap Year
function Check_Leap(N) {
    if ((N % 400 === 0) || (N % 4 === 0 && N % 100 !== 0)) {
        return "Leap Year";
    }
    return "Non Leap Year";
}

console.log(Check_Leap(1900));
console.log(Check_Leap(2012));


// Q3. Perfect Number Check
function Perfect_Check(N) {
    let sum = 0;

    for (let i = 1; i <= N / 2; i++) {
        if (N % i === 0) sum += i;
    }

    return sum === N ? "YES" : "NO";
}

console.log(Perfect_Check(1));
console.log(Perfect_Check(96345));


// Q4. Reverse a Number
function Reverse_Number(N) {
    let rev = 0;

    while (N > 0) {
        rev = rev * 10 + (N % 10);
        N = Math.floor(N / 10);
    }

    return rev;
}

console.log(Reverse_Number(1900));
console.log(Reverse_Number(2012));


// Q5. Substring Check
function Substring_Check(S1, S2) {
    return S2.includes(S1) ? "YES" : "NO";
}

console.log(Substring_Check("Prepbuddy", "Hii this is Prepbuddy"));
console.log(Substring_Check("Prepbuddy", "Hii this is Prepbytes"));