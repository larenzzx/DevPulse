// Global scope
let globalVar = "I'm global";

function outerFunction(x) {
  // Function scope
  let outerVar = "I'm in outer function";

  function innerFunction(y) {
    // Inner scope - has access to outer variables
    let innerVar = "I'm in inner function";
    console.log(globalVar, outerVar, innerVar);
    return x + y;
  }

  return innerFunction;
}

// Closure example
const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Practical closure example - counter
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (independent counter)
