// Q1
let M = 35;

switch (true) {
    case (M <= 10):
        console.log("E");
        break;

    case (M <= 20):
        console.log("D");
        break;

    case (M <= 30):
        console.log("C");
        break;

    case (M <= 40):
        console.log("B");
        break;

    case (M <= 50):
        console.log("A");
        break;
}


// Q2
let D = "E";

switch (D) {
    case "P":
    case "p":
        console.log("PrepBytes");
        break;

    case "Z":
    case "z":
        console.log("Zenith");
        break;

    case "E":
    case "e":
        console.log("Expert Coder");
        break;

    case "D":
    case "d":
        console.log("Data Structure");
        break;
}

// Q3
let A = 2;
let B = 5;
let C = 4;

if (A === B && B === C) {
    console.log(-1);
} else if (A >= B && A >= C) {
    console.log(A);
} else if (B >= A && B >= C) {
    console.log(B);
} else {
    console.log(C);
}


// Q4
let X = 2;
let Y = 9;
let Z = 23;

if ((X > Y && X < Z) || (X > Z && X < Y)) {
    console.log(X);
} else if ((Y > X && Y < Z) || (Y > Z && Y < X)) {
    console.log(Y);
} else {
    console.log(Z);
}


// Q5
let Q = 60;
let R= 100;
let S = 20;

if (Q > 90 || R > 90 || S > 90) {
    console.log("obtuse");
} else {
    console.log("acute");
}