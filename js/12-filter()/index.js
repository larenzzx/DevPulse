// .filter() = creates a new array by fitlering out elements

let numbers = [1, 2, 3, 4, 5, 6, 7];
let evenNum = numbers.filter(isEven);
let oddNum = numbers.filter(isOdd);

console.log(evenNum);
console.log(oddNum);

function isEven(element) {
    return element % 2 === 0;
}

function isOdd(element) {
    return element % 2 !== 0;
}


// ==== filter below 18 or adult

const ages = [16, 17, 18, 19, 20, 22, 23];

const adults = ages.filter(isAdult);
console.log(adults);

const childrens = ages.filter(isChildren);
console.log(childrens);

function isAdult(element) {
    return element >= 18;
}

function isChildren(element) {
    return element < 18;
}



// filter out words that has above six letters

const words = ['banana', 'orange', 'apple', 'pineapple', 'coconut'];

const shortWords = words.filter(getShortWords);
console.log(shortWords);

const longWords = words.filter(getLongWords);
console.log(longWords);

function getShortWords(element) {
    return element.length <= 6;
}

function getLongWords(element) {
    return element.length > 6;
}