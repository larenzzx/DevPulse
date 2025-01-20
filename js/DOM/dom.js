/* === selecting an element ====*/

// single element
// console.log(document.getElementById('my-form'));
// console.log(document.querySelector('h1')); this get target any element, class, id

// multiple element
// console.log(document.querySelectorAll('.items'));

// const items = document.querySelectorAll('.item');
// items.forEach((item) => console.log(item));


/* ==== Manipulating the dom ==== */
// const ul = document.querySelector('.items');
// ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'Hello';
// ul.children[1].textContent = 'Hi';
// ul.lastElementChild.innerHTML = '<h1>Hehehe</h1>';


/* Events */
// click, mouseover, mouseout, submit
// const btn = document.querySelector('.btn');

// btn.addEventListener('click', (e) => {
//     e.preventDefault(); // so it will not automatically load after submitting the form / removes default
//     // console.log('click');
//     document.querySelector('#my-form').style.background = '#ccc';
//     document.querySelector('body').classList.add('bg-dark');
//     document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
// });


const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// myForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (nameInput.value === '' || emailInput.value === '') {
//         msg.classList.add('error');
//         msg.innerHTML = 'Please complete the fields';

//         setTimeout(() => msg.remove(), 3000);
//     }    
// });

// other method
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please complete the fields';

        setTimeout(() => msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));

        userList.appendChild(li);

        // clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}
