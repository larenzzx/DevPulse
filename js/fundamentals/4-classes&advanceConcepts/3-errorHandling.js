// Basic try-catch
function divideNumbers(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return a / b;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  } finally {
    console.log("Division operation completed");
  }
}

console.log(divideNumbers(10, 2));
console.log(divideNumbers(10, 0));

// Custom error types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUser(user) {
  try {
    if (!user.name) {
      throw new ValidationError("Name is required");
    }
    if (!user.email) {
      throw new ValidationError("Email is required");
    }
    if (user.age < 0) {
      throw new ValidationError("Age cannot be negative");
    }
    return "User is valid";
  } catch (error) {
    if (error instanceof ValidationError) {
      return `Validation Error: ${error.message}`;
    }
    return `Unexpected Error: ${error.message}`;
  }
}

console.log(validateUser({ name: "John", email: "john@email.com", age: 25 }));
console.log(validateUser({ name: "", email: "john@email.com", age: 25 }));
