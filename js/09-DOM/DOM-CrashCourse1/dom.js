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
// // - returns the first element that matches the selector
// const header = document.querySelector("#main-header");
// header.style.borderBottom = "3px solid red";
// // - can use any CSS selector
// const input = document.querySelector("input");
// input.value = "Hello World";
// const submitButton = document.querySelector("input[type='submit']");
// submitButton.value = "Send";
// const item = document.querySelector(".list-item");

// == querySelectorAll ==
// - returns a NodeList of all elements that match the selector
// const items = document.querySelectorAll(".list-item");
// items.forEach((item, index) => {
//     item.textContent = `${index}: Hello World`;
//     item.style.fontWeight = "bold";
// });

// const oddItems = document.querySelectorAll("li:nth-child(odd)");
// oddItems.forEach(item => {
//     item.style.backgroundColor = "lightgray";
// });

// == traversing the DOM ===
// const itemList = document.querySelector("#items");
// - parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.backgroundColor = "red";

// - parentElement
// console.log(itemList.parentElement);

// - childNodes
// console.log(itemList.childNodes);

// - children
// console.log(itemList.children[1]);

// - firstChild
// console.log(itemList.firstChild);

// - firstElementChild
// console.log(itemList.firstElementChild);

// - lastChild
// console.log(itemList.lastChild);

// - lastElementChild
// console.log(itemList.lastElementChild);

// - nextSibling
// console.log(itemList.nextSibling);

// - nextElementSibling
// console.log(itemList.nextElementSibling);

// - previousSibling
// console.log(itemList.previousSibling);

// - previousElementSibling
// console.log(itemList.previousElementSibling);

// - createElement
// const newDiv = document.createElement("div");
// newDiv.className = "hello";
// newDiv.id = "hello1";
// newDiv.setAttribute("title", "Hello Div");
// newDiv.textContent = "Hello World";

// - appendChild
// const container = document.querySelector("header .container");
// container.appendChild(newDiv);
// console.log(newDiv);

// - insertBefore
// const h1 = document.querySelector("header h1");
// newDiv.style.fontSize = "30px";
// container.insertBefore(newDiv, h1);


// sample code to change the background color of a card when a button is clicked
// const click = document.querySelector(".click");

// click.addEventListener("click", () => {
//     const card = document.getElementById("main");
//     card.style.backgroundColor = "lightblue";
// })