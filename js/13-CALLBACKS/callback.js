// callback = a function that is passed as an argument to another function

// used to handle asynchronous operations
// 1. reading a file
// 2. network requests
// 3. interacting with databases

// "hey, when you're done, call this next."

hello(leave);

// to use the callbacks, just put any parameter inside the function the invoke the parameter or call it.
// then when calling the function put the function name of the next function u want on the parameter of the first function.

function hello(callback) {
  setTimeout(() => {
    console.log("hello");
    callback();
  }, 2000);
}
// as we can see it will wait the hello function to be executed first before executing the next function

function goodBye() {
  console.log("goodbye");
}

function leave() {
  console.log("leave");
}



// next example
sum(displayResult, 1, 2);
sum(displayPage, 40, 1);

function sum(callback, x, y) {
    let result = x + y;
    callback(result);
}

function displayResult(result) {
    console.log(result);
}


function displayPage(result) {
    document.getElementById('myCallback').textContent = result;
}
