const items = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];

// for loop
console.log("=== for loop ===");
for (let i = 0; i < items.length; i++) {
  console.log(`${i}: ${items[i]}`);
}

// for...of loop (for arrays/iterables)
console.log("=== for...of loop ===");
for (const item of items) {
  console.log(item);
}

// for...in loop (for object properties)
const person = { name: "John", age: 30, city: "NYC" };
console.log("=== for...in loop ===");
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// while loop
console.log("=== while loop ===");
let i = 0;
while (i < 3) {
  console.log(`Count: ${i}`);
  i++;
}

// do...while loop
console.log("=== do...while loop ===");
let j = 0;
do {
  console.log(`Do-while count: ${j}`);
  j++;
} while (j < 3);
