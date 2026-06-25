function countCharacters(S) {
    let countA = 0;
    let countD = 0;

    for (let ch of S) {
        if (ch === 'A') countA++;
        if (ch === 'D') countD++;
    }

    return [countA, countD];
}

console.log("Q1:", countCharacters("AbaDd")); 


// Q2. Count the Heads

function CountHead(S) {
    let freq = {};

    for (let ch of S) {
        freq[ch] = (freq[ch] || 0) + 1;
    }

    let result = "";

    Object.keys(freq)
        .sort()
        .forEach(ch => {
            if (freq[ch] > 1) {
                result += ch + freq[ch];
            }
        });

    return result;
}

console.log("Q2:", CountHead("prepbytes")); 


// Q3. Count the Vowels

function Count_Vowel(S) {
    let count = 0;
    let vowels = "aeiouAEIOU";

    for (let ch of S) {
        if (vowels.includes(ch)) {
            count++;
        }
    }

    return count;
}

console.log("Q3:", Count_Vowel("Prepbytes")); 


// Q4. Concatenate the Strings

function Concatenate_Strings(S1, S2) {
    return S1 + S2;
}

console.log("Q4:", Concatenate_Strings("Prep", "bytes")); 


// Q5. Find Length

function findLength(S) {
    let count = 0;

    for (let ch of S) {
        count++;
    }

    return count;
}

console.log("Q5:", findLength("CeDqe")); 


// Q6. Find the Winner

function Game_Winner(S) {
    let aditya = 0;
    let danish = 0;

    for (let ch of S) {
        if (ch === "A") aditya++;
        else if (ch === "D") danish++;
    }

    if (aditya > danish) return "Aditya";
    else if (danish > aditya) return "Danish";
    else return "Draw";
}

console.log("Q6:", Game_Winner("ADDAAADDDDD")); 
console.log("Q6:", Game_Winner("ADDAAADD")); 


// Q7. Join Strings

function joinStrings(S, P) {
    return S + P;
}

console.log("Q7:", joinStrings("PrepBytes", "Technologies"));



// Q8. Palindrome Check

function Plain_Check(S) {
    let reversed = S.split("").reverse().join("");

    return S === reversed ? "True" : "False";
}

console.log("Q8:", Plain_Check("Naman")); 
console.log("Q8:", Plain_Check("naman")); 


// Q9. Reverse the String

function Reverse_String(S) {
    return S.split("").reverse().join("");
}

console.log("Q9:", Reverse_String("I am utkarsh raj"));



// Q10. Match the Strings

function String_Match(S1, S2) {
    return S1 === S2 ? "YES" : "NO";
}

console.log("Q10:", String_Match("Prepbytes", "Prepbytes")); // YES
console.log("Q10:", String_Match("Prepbytes", "PrepBytes")); // NO


// Q11. String Replace

function Replace(S, pattern, text) {
    return S.replace(pattern, text);
}

console.log(
    "Q11:",
    Replace("Hi, I am You.", "You", "Prepbytes")
);



// Q12. Split the String

function Split_the_String(S) {
    return S.split(" ");
}

console.log("Q12:", Split_the_String("I am utkarsh raj"));



// Q13. Count Vowels & Consonants

function Count_Vowels(S) {
    let count = 0;
    let vowels = "aeiouAEIOU";

    for (let ch of S) {
        if (vowels.includes(ch)) {
            count++;
        }
    }

    return count;
}

function Count_Consonants(S) {
    let count = 0;
    let vowels = "aeiouAEIOU";

    for (let ch of S) {
        if (
            ((ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z")) &&
            !vowels.includes(ch)
        ) {
            count++;
        }
    }

    return count;
}

let str = "Prepbytes";
console.log("Q13 Vowels:", Count_Vowels(str)); 
console.log("Q13 Consonants:", Count_Consonants(str)); 