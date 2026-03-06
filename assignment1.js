// =======================================================
// Question 1
// Write a function calculateTotal(price, deliveryFee)
// with deliveryFee as a default parameter
// =======================================================

function calculateTotal(price, deliveryFee = 50) {
  return price + deliveryFee;
}

// Example
console.log("Q1 Output:");
console.log(calculateTotal(200));      // 250
console.log(calculateTotal(200, 30));  // 230



// =======================================================
// Question 2
// Write a function greetUser(name, greeting)
// greeting should be a default parameter
// =======================================================

function greetUser(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log("\nQ2 Output:");
console.log(greetUser("Alice"));           
console.log(greetUser("Bob", "Welcome"));  



// =======================================================
// Question 3
// Default parameters behavior
// =======================================================

function greet(name = "Guest") {
  return "Hello " + name;
}

console.log("\nQ3 Output:");
console.log(greet(undefined)); 
// Output: Hello Guest
// Reason: default value used when argument is undefined

console.log(greet(null));      
// Output: Hello null
// Reason: null is treated as a real value, default not used

console.log(greet(""));        
// Output: Hello 
// Reason: empty string is also considered a valid value



// =======================================================
// Question 4
// Logical operators outputs
// =======================================================

console.log("\nQ4 Output:");

console.log(0 || "Hello");
// Output: Hello
// Reason: OR returns first truthy value, 0 is falsy

console.log("" || "World");
// Output: World
// Reason: "" is falsy

console.log("JS" && 100);
// Output: 100
// Reason: AND returns last truthy value

console.log(null && "Test");
// Output: null
// Reason: AND stops at first falsy value



// =======================================================
// Question 5
// Difference between || and ?? operators
// =======================================================

console.log("\nQ5 Output:");

console.log(0 || 10);
// Output: 10
// Reason: || treats 0 as falsy

console.log(0 ?? 10);
// Output: 0
// Reason: ?? only checks null or undefined

console.log(null || 20);
// Output: 20

console.log(null ?? 20);
// Output: 20



// =======================================================
// Question 6
// Debug the code
// Problem: "" is treated as falsy with ||
// Fix: use ?? instead
// =======================================================

function showMessage(message) {
  const finalMessage = message ?? "No message provided";
  return finalMessage;
}

console.log("\nQ6 Output:");
console.log(showMessage(""));  
// Output: "" (empty string preserved)



// =======================================================
// Question 7
// Nested for loop printing pattern
// =======================================================

console.log("\nQ7 Output:");

for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i + " " + j);
  }
}



/*
Output:
1 1
1 2
2 1
2 2
3 1
3 2
*/



// =======================================================
// Question 8
// FizzBuzz from 1 to 20
// =======================================================

function fizzBuzz() {
  console.log("\nQ8 Output:");

  for (let i = 1; i <= 20; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    }
    else if (i % 3 === 0) {
      console.log("Fizz");
    }
    else if (i % 5 === 0) {
      console.log("Buzz");
    }
    else {
      console.log(i);
    }

  }
}

fizzBuzz();