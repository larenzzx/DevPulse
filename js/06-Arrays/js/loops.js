/*
        loops - major parts of the loops are (loop variable, loop condition, increment step)

        While vs For loop (what to use)

        Standard loop -> use for loop

        Non-standard loop -> use while loop

        A non-standard loop means it doesn't have a loop variable that we need to increase every time, and doesn't have increment step.
        */

//  while loop
let i = 1;

// if the condition here is true, the code will run. when it turns into false, it will stop the loop
while (i <= 5) {
  console.log(i);
  i++;
}

// for loop
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// example of non-standard loop
// generating a random numbers until one that's at least 0.5
let randomNumber = 0;
while (randomNumber < 0.8) {
  randomNumber = Math.random();
}
console.log(randomNumber);
