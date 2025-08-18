// .map() = accepts a callback and applies that function to each element of an array, then return a new array

const numbers = [1, 2, 3, 4, 5];
const mapping = numbers.map(cubes);

console.log(numbers);
console.log(mapping);

function square(element) {
  return Math.pow(element, 2);
}

function cubes(element) {
  return Math.pow(element, 3);
}

// map is similar to forEeach.
// this is the forEach version
numbers.forEach((num) => {
  num = Math.pow(num, 3);
  console.log(num);
});

// another example
const students = ["Raiza", "Mark", "Naksu", "Dazai"];

const stud = students.map(student);
const studUpper = students.map(uppercase);
const studLower = students.map(lowercase);

console.log(stud);
console.log(studUpper);
console.log(studLower);

function student(element) {
  return element;
}

function uppercase(element) {
  return element.toUpperCase();
}

function lowercase(element) {
  return element.toLowerCase();
}

// ========
const dates = ["2022-2-2", "2023-2-2", "2024-2-2", "2025-2-2"];
const formattedDates = dates.map(formatDates);

console.log(formattedDates);

function formatDates(element) {
  const parts = element.split("-"); //this means it will change the '-'
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
}
