// fetching a json
// response.json() also return a Promise

fetch("person.json")
    .then(response => response.json())
    // u can also stringify the value
    // .then(value => JSON.stringify(value))
    .then(value => console.log(value));

// built in forEach to iterate the array of objects
fetch("people.json")
    .then(response => response.json())
    .then(values => values.forEach(value => console.log(value)))
    // .then(values => values.forEach(value => console.log(value.name)))
    // .then(values => values.forEach(value => console.log(value.isEmployed)))
