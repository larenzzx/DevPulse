// Async/Await - Async - makes a function return a promise
//             - Await - makes an async function wait for a promise

// Allows you to write asynchronous code in a synchronous manner.
// Async doesn't have resolve or reject parameters. Everything after Await is placed in an event queue.

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

async function doChores() {
    try {
        const walkDogResult = await walkDog();
        console.log(walkDogResult);

        const cleanKitchenResult = await cleanKitchen();
        console.log(cleanKitchenResult);

        const takeoutTrashResult = await takeoutTrash();
        console.log(takeoutTrashResult);

        console.log("You finish all the task");
    } catch (error) {
        console.error(error);
    }
}
doChores();