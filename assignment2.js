const students = [
  { name: "Aditya", marks: 35, subject: "Math" },
  { name: "Rahul", marks: 78, subject: "Physics" },
  { name: "Priya", marks:29,subject: "chemistry"},
  { name: "Sneha", marks: 88, subject: "Biology" },
  { name: "Amit", marks: 75, subject: "biology" },
  { name: "Neha", marks: 18, subject: "computer" },
  { name: "Rohan", marks: 69, subject: "physics" },
  { name: "Kavya", marks: 5, subject: "Computer" },
  { name: "Arjun", marks: 72, subject: "chemistry" },
  { name: "Pooja", marks: 27, subject: "Math" }
];

const pass=students.filter(n=>(n.marks>40));
const fail=students.filter(n=>(n.marks<40));
const subject=Object.groupBy(students,n=>n.subject);
const average=students.reduce((sum,s)=>sum+s.marks,0)/students.length;
const topper = students.reduce((a,b)=> a.marks>b.marks ? a : b).name;

console.log(pass);
console.log("");
console.log("");
console.log(fail);
console.log("");
console.log("");
console.log(subject);
console.log("");
console.log("");
console.log(average)
console.log("");
console.log("");
console.log(topper);