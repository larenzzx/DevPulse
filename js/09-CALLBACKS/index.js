// callback = a function that is passed as an argument to another function

// used to handle asynchronous operations
// 1. reading a file
// 2. network requests
// 3. interacting with databases

// "hey, when you're done, call this next."

hello();
goodBye();

// function hello() {
//     console.log('hello');
// }

function hello() {
    setTimeout(() => {
        console.log('Hello');
    }, 3000);
}

function goodBye() {
    console.log('goodbye');
}
// when you see the console, the goodbye ang una ma output kesa sa hello. una natin na call ang hello function pero nauna parin ang goodbye. it means hindi na inaantay matapos ang first function, nag pproceed sya kaagad sa next function muna.

// but using callbacks, it will make sure to do the function first before proceeding to the next function


