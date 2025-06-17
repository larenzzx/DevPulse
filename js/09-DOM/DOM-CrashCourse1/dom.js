// ==== examine the document object ===
// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);
// document.all[10].textContent = "Hello World";
// console.log(document.forms[0]);
// console.log(document.links);
// console.log(document.images);


// ==== selecting elements ===

// == getElementById ==
// const headerTitle = document.getElementById("headerTitle");
// - it disregard the style
// headerTitle.textContent = "Hello World";
// - it respects the style
// headerTitle.innerText = "Goodbye World";
// headerTitle.innerHTML = "<h3>Hello World</h3>";
// console.log(headerTitle);

// - always use camelCase for css properties when modifying styles
// headerTitle.style.color = "red";
// headerTitle.style.borderBottom = "3px solid black";

// == getElementsByClassName ==
// let items = document.getElementsByClassName("list-item");
// console.log(items);
// console.log(items[1]);
// items[1].textContent = "Hello World";
// items[1].style.fontWeight = "bold";
// items[1].style.backgroundColor = "yellow";

// - This will not work, as items is a collection, not a single element
// items.style.backgroundColor = "lightblue"; 

// for (let i = 0; i < items.length; i++) {
//     items[i].style.color = "red";
// }

// == getElementsByTagName ==
// let liItems = document.getElementsByTagName("li");
// console.log(liItems);
// console.log(liItems[0]);


// == querySelector ==
// - returns the first element that matches the selector
const header = document.querySelector("#main-header");
header.style.borderBottom = "3px solid red";
// - can use any CSS selector
const input = document.querySelector("input");
input.value = "Hello World";
const submitButton = document.querySelector("input[type='submit']");
submitButton.value = "Send";
const item = document.querySelector(".list-item");

// == querySelectorAll ==
// - returns a NodeList of all elements that match the selector
const items = document.querySelectorAll(".list-item");
items.forEach((item, index) => {
    item.textContent = `${index}: Hello World`;
    item.style.fontWeight = "bold";
});

const oddItems = document.querySelectorAll("li:nth-child(odd)");
oddItems.forEach(item => {
    item.style.backgroundColor = "lightgray";
});