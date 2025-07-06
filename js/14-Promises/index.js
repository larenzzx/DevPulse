// Promise = An object that manages asynchronous operations. (such as querying a database, fetching a file, gathering resources are considered as asynchronous operations)
//           Wrap a Promise Object around (asynchronous code)
//           "I promise to return a value"
//           PENDING -> RESOLVED or REJECTED
//           new Promise((resovle, reject) => {asynchronous code})

// DO THESE CHORES IN ORDER

// 1. WALK THE DOG
// 2. CLEAN THE KITCHEN
// 3. TAKE OUT THE TRASH

// === sample of normal way or not using Promises
// function walkDog(callback) {
//     setTimeout(() => {
//         console.log('You walk the dog');
//         callback();
//     }, 3000);
// }

// function cleanKitchen(callback) {
//     setTimeout(() => {
//         console.log('You clean the kitchen');
//         callback();
//     }, 2500);
// }

// function takeoutTrash(callback) {
//     setTimeout(() => {
//         console.log('You take out the trash');
//         callback();
//     }, 3000);
// }

// walkDog(() => {
//     cleanKitchen(() => {
//         takeoutTrash(() => console.log('finished all the chores!'));
//     });
// });

function walkDog() {
  return new Promise((resolve, rejected) => {
    const dogWalked = true;

    setTimeout(() => {
      if (dogWalked) {
        resolve("You walk the dog");
      } else {
        rejected("You didn't walk the dog");
      }
    }, 3000);
  });
}

function cleanKitchen() {
  return new Promise((resolve, rejected) => {
    const kitchenCleaned = true;

    setTimeout(() => {
      if (kitchenCleaned) {
        resolve("You clean the kitchen");
      } else {
        rejected("You didn't clean the kitchen");
      }
    }, 2500);
  });
}

function takeoutTrash() {
  return new Promise((resolve, rejected) => {
    const trashTakeout = true;
    setTimeout(() => {
      if (trashTakeout) {
        resolve("You take out the trash");
      } else {
        rejected("You didn't take out the trash");
      }
    }, 500);
  });
}

walkDog()
  .then((value) => {
    console.log(value);
    return cleanKitchen();
  })
  .then((value) => {
    console.log(value);
    return takeoutTrash();
  })
  .then((value) => {
    console.log(value);
    return console.log("You finished all the task");
  })
  .catch((error) => console.error(error));
