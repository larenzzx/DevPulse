const colors = ["red", "green", "blue", "yellow", "purple"];

// Basic destructuring
const [first, second] = colors;
console.log(first, second); // red green

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary); // red blue

// Rest operator
const [main, ...others] = colors;
console.log(main, others); // red ["green", "blue", "yellow", "purple"]

// Default values
const [a, b, c, d, e, f = "default"] = colors;
console.log(f); // default (since colors[5] doesn't exist)
