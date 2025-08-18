// Function Declaration:
// Hoisted - can be called before definition
// Works!
// console.log(greet("Alice"));

// function greet(name) {
//   return `Hello, ${name}!`;
// }

// =============================
// Function Expression:
// Not hoisted - must be defined before use
// const greet = function(name) {
//     return `Hello, ${name}!`;
// };

// console.log(greet("Bob"));

// ==================================
// Arrow Functions:
// Shorter syntax, no 'this' binding
const greet = (name) => `Hello, ${name}!`;
const add = (a, b) => a + b;
const multiply = (x, y) => {
  const result = x * y;
  return result;
};

console.log(greet("Charlie"));
console.log(add(5, 3));
console.log(multiply(4, 6));
