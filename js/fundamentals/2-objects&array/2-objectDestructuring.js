const user = {
  id: 1,
  username: "johndoe",
  profile: {
    firstName: "John",
    lastName: "Doe",
    address: {
      city: "Boston",
      country: "USA",
    },
  },
};

// Basic destructuring
const { username, id } = user;
console.log(username, id);

// Renaming variables
const { username: name, id: userId } = user;
console.log(name, userId);

// Nested destructuring
const {
  profile: {
    firstName,
    address: { city },
  },
} = user;
console.log(firstName, city);

// Default values
const { age = 25, email = "no-email" } = user;
console.log(age, email);
