// Basic class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method
  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  // Getter
  get info() {
    return `${this.name} (${this.age})`;
  }

  // Setter
  set newAge(age) {
    if (age > 0) {
      this.age = age;
    }
  }

  // Static method
  static compareAges(person1, person2) {
    return person1.age - person2.age;
  }
}

const john = new Person("John", 30);
const jane = new Person("Jane", 25);

console.log(john.introduce());
console.log(john.info); // using getter
john.newAge = 31; // using setter
console.log(john.age);

console.log(Person.compareAges(john, jane)); // using static method
