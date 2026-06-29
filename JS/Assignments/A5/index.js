// Q1. Create Setter Method
function createSetter(obj) {
    obj.setter = function () {
        console.log(this.name);
    };
    return obj;
}

let obj1 = { name: "Utkarsh" };
obj1 = createSetter(obj1);
obj1.setter(); 


// Q2. Delete rollno property
function deleteRollNo(obj) {
    delete obj.rollno;
    return obj;
}

let obj2 = { name: "Utkarsh", rollno: 129 };
obj2 = deleteRollNo(obj2);
console.log(!obj2.hasOwnProperty("rollno")); 


// Q3. Dream Package Check
function checkDream(obj) {
    return obj.salary > 500000 ? "Dream" : "NotDream";
}

let obj3 = { salary: 100000 };
console.log(checkDream(obj3)); 


// Q4. Check if Object is Empty
function checkObject(obj) {
    return Object.keys(obj).length === 0 ? "false" : "true";
}

let obj4 = { a: 1 };
console.log(checkObject(obj4)); 


// Q5. Merge Objects
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

let obj5a = { name: "Utkarsh", id: 129 };
let obj5b = { state: "Haryana", code: 121009 };

console.log(mergeObjects(obj5a, obj5b));


// Q6. Object Multiplier
function multiply(obj, N) {
    obj.id *= N;
    obj.houseno *= N;
    return obj;
}

let obj6 = { id: 12, houseno: 146 };
console.log(multiply(obj6, 2));


// Q7. Sum of Object Members
function checkSum(obj) {
    return obj.p1 + obj.p2 + obj.p3;
}

let obj7 = { p1: 1, p2: 2, p3: 3 };
console.log(checkSum(obj7)); 


// Q8. Compare Objects
function checkSame(obj, new_name, new_id) {
    return (obj.name === new_name && obj.id === new_id)
        ? "true"
        : "false";
}

let obj8 = { name: "Utkarsh", id: 2 };

console.log(checkSame(obj8, "Utkarsh", 2));  
console.log(checkSame(obj8, "Prepbytes", 3)); 