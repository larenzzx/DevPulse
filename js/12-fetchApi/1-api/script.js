const ul = document.getElementById("userList");

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.forEach(user => {
            // console.log(user.name);
            const li = document.createElement("li");
            const p = document.createElement("p");
            const span = document.createElement("span");
            p.textContent = `Fullname: ${user.name}`;
            span.textContent = `Email: ${user.email}`;
            // li.textContent = user.name;
            li.append(p, span);
            li.classList.add("list");
            ul.appendChild(li);
        });
    })
    .catch(error => console.error(error));