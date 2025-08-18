const todoList = [
  "make dinner",
  "wash dishes",
  "watch youtube",
  "hello this is a sample",
];

// console.log(todoList);

// looping through an array
for (let i = 0; i < todoList.length; i++) {
  // console.log(todoList[i]);
  const value = todoList[i];
  console.log(value);
}

todoList.forEach(todo => {
  console.log(todo);
  console.log('helo todo')
});

// Accumulator Pattern
// 1 - creates a variable to store the result
// 2 - loop through the array and update the result

const nums = [1, 1, 3];
console.log(nums);

// using the accumulator pattern to calculate the array of numbers
let total = 0;

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  total += num;
}

console.log(total);

// using the "Accumalator Pattern" to create a copy of the array with each number and doubled. [2, 2, 6]

// create a variable to store the result
const numsDoubled = [];

// loop through the array and update the result
for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    numsDoubled.push(num * 2);
}

console.log(numsDoubled);
