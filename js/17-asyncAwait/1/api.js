async function user() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const userName = await res.json();
    console.log(userName.name);
}

user();


// async function fetchData() {
//     const userPromise = await fetch("https://jsonplaceholder.typicode.com/users/1")
//     const userPromise2 = await fetch("https://jsonplaceholder.typicode.com/users/2")

//     const [userRes, userRes2] = await Promise.all([userPromise, userPromise2]);

//     const user = await userRes.json();
//     const user2 = await userRes2.json();
//     console.log(user, user2);
// }

// fetchData();
