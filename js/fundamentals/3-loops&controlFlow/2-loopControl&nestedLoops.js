// break and continue
console.log("=== break and continue ===");
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 8) break; // stop at 8
  console.log(i);
}

// Nested loops
console.log("=== nested loops ===");
for (let row = 1; row <= 3; row++) {
  let rowStr = "";
  for (let col = 1; col <= 3; col++) {
    rowStr += `(${row},${col}) `;
  }
  console.log(rowStr);
}

// Label and break/continue with labels
console.log("=== labeled loops ===");
outer: for (let i = 1; i <= 3; i++) {
  inner: for (let j = 1; j <= 3; j++) {
    if (i === 2 && j === 2) {
      console.log(`Breaking outer loop at (${i},${j})`);
      break outer;
    }
    console.log(`(${i},${j})`);
  }
}
