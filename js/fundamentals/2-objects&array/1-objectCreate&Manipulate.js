// Object literal
const person = {
  name: "John",
  age: 30,
  city: "New York",
  hobbies: ["reading", "coding", "gaming"],
};

// Accessing properties
console.log(person.name); // Dot notation
console.log(person.hobbies[1]);
console.log(person["age"]); // Bracket notation

// Adding/modifying properties
person.email = "rai@email.com";
person.age = 31;
console.log(person);

// Object methods
const calculator = {
  add: function (a, b) {
    return a + b;
  },
  // Shorthand method syntax
  subtract(a, b) {
    return a - b;
  },
  // Arrow function (be careful with 'this')
  multiply: (a, b) => a * b,
};

console.log(calculator.add(5, 3));
console.log(calculator.subtract(10, 4));
