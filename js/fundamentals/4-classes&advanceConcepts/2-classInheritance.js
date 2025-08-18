class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  makeSound() {
    return `${this.name} makes a sound`;
  }

  describe() {
    return `${this.name} is a ${this.species}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Dog"); // Call parent constructor
    this.breed = breed;
  }

  // Override parent method
  makeSound() {
    return `${this.name} barks: Woof!`;
  }

  // New method specific to Dog
  fetch() {
    return `${this.name} fetches the ball!`;
  }

  // Use super to call parent method
  fullDescription() {
    return super.describe() + ` of breed ${this.breed}`;
  }
}

const buddy = new Dog("Buddy", "Golden Retriever");
console.log(buddy.makeSound()); // Overridden method
console.log(buddy.fetch()); // Dog-specific method
console.log(buddy.fullDescription()); // Using super
