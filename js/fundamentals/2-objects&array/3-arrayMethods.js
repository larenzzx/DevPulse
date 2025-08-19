const fruits = ["apple", "banana", "orange", "mango"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// forEach - iterate through array
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// map - transform array elements
const upperFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(upperFruits);

const doubled = numbers.map((num) => num * 2);
console.log(doubled);

// filter - create new array with elements that pass test
const longFruits = fruits.filter((fruit) => fruit.length > 5);
console.log(longFruits);

const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);

// reduce - reduce array to single value
// array.reduce((accumulator, currentItem) => { ... }, initialValue)
// accumulator → something we’re “carrying forward” as we loop through the array
// currentItem → the current element in the array that we’re checking right now
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);

const longest = fruits.reduce((longest, current) =>
  current.length > longest.length ? current : longest
);
console.log(longest);

// find - return first element that matches
const foundFruit = fruits.find((fruit) => fruit.startsWith("m"));
console.log(foundFruit);

// some & every
const hasLongFruit = fruits.some((fruit) => fruit.length > 6);
const allStrings = fruits.every((fruit) => typeof fruit === "string");
console.log(hasLongFruit, allStrings);
