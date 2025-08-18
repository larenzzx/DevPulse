// Default parameters
function createUser(name, age = 18, role = "user") {
  return { name, age, role };
}

console.log(createUser("John"));
console.log(createUser("Jane", 25, "admin"));

// Rest parameters
// The ...numbers syntax is called the rest parameter.
//It means: "Take all the arguments passed to the function and collect them into an array called numbers.
// If you call sum(1, 2, 3, 4, 5), then inside the function:
// numbers = [1, 2, 3, 4, 5];
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));

// Destructuring parameters
function displayUser({ name, age, email }) {
  console.log(`${name} (${age}) - ${email}`);
}

displayUser({ name: "Alice", age: 30, email: "alice@email.com" });
