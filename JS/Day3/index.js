let arr=['hello','world','how','to','-']

arr.push('10')
console.log(arr)

const newarr=['hello','world','how','to','-']

newarr.slice(1,2)
console.log(newarr)
const newarr2=['hello','world','how','to','-']
console.log(newarr2.shift())

const arr2=[1,2,3,4,5,6]
arr.map(x=>x*2)

const arr3=[1,2,3,4,5,6]
console.log(arr3.findIndex(x=>x==2))

const arr4=[1,2,3,4,5,6]
console.log(arr3.splice(1,3))

function func(name,age){
    return console.log("Regualar function",name,age);
}
func("Raj",22)

let a= function (name,age){
      console.log(name,age)
}
a("Raj",22)

const foo = (name, age) => {
    console.log(name, age);
}

foo("raj",22)



function greet(){
    console.log("Hello world")
}
greet();

let ar = ()=>{
    console.log("arrow functin with no return statment")
}

ar(); 

let det= function (firstname,lastname,age ){
      return console.log(`${firstname ,lastname} is ${age} year old `)
}

det(Shantanu,Raj,22);


[
  {
    "id": 1,
    "name": "Shantanu",
    "age": 24
  },
  {
    "id": 2,
    "name": "Rahul",
    "age": 22
  },
  {
    "id": 3,
    "name": "Priya",
    "age": 23
  }
]