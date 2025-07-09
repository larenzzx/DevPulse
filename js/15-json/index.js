// -data-interchange format
// - used for exchanging data between a server and a web application
// - JSON files {key:value} or {value1, value2, value3}

// JSON.stringify() = converts a JS object to a JSON string.
// JSON.parse() = converts a JSON string to a JS object



// ==== stringify()
// arrays
const names = ["Mark", "Raiza", "Dazai", "Naksu"];
const jsonStringNames = JSON.stringify(names);

// objects sample
const person = {
  name: "Mark",
  age: 23,
  isEmployed: false,
  hobbies: ["coding", "gaming", "swimming"],
};
const jsonStringPerson = JSON.stringify(person);


// array of objects
const people = [
  {
    "name": "Mark",
    "age": 23,
    "isEmployed": false
  },
  {
    "name": "Raiza",
    "age": 22,
    "isEmployed": true
  }
  
]
const jsonStringPeople = JSON.stringify(people);



// console.log(jsonStringNames);
// console.log(jsonStringPerson);
// console.log(jsonStringPeople)


// ==== parse()
// array
const jsonNames = `["Mark", "Raiza", "Dazai", "Naksu"]`;
const jsonParseNames = JSON.parse(jsonNames);

console.log(jsonNames);
console.log(jsonParseNames);


// objects 
const jsonPerson = `{"name": "mark", "age": 23, "isEmployed": false}`;
const jsonParsePerson = JSON.parse(jsonPerson);
console.log(jsonPerson);
console.log(jsonParsePerson);


// array of objects
const jsonPeople = `[
    {
        "name": "mark", "age": 23, "isEmployed": false
    },
    {
       "name": "raiza", "age": 22, "isEmployed": true 
    }
]`;
const jsonParsePeople = JSON.parse(jsonPeople);
console.log(jsonPeople);
console.log(jsonParsePeople);
