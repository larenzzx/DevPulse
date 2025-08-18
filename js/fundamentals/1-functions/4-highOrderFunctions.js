// Function that takes another function as parameter
function processArray(arr, callback) {
  const result = [];
  for (let item of arr) {
    result.push(callback(item));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (x) => x * 2);
const squared = processArray(numbers, (x) => x * x);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]

// Function that returns another function
function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12
