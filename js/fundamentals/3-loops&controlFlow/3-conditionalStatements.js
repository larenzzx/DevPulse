// if...else if...else
function gradeCalculator(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(gradeCalculator(85)); // B
console.log(gradeCalculator(92)); // A
console.log(gradeCalculator(55)); // F

// switch statement
function getDayType(day) {
  switch (day.toLowerCase()) {
    case "monday":
    case "tuesday":
    case "wednesday":
    case "thursday":
    case "friday":
      return "weekday";
    case "saturday":
    case "sunday":
      return "weekend";
    default:
      return "invalid day";
  }
}

console.log(getDayType("Monday")); // weekday
console.log(getDayType("Saturday")); // weekend

// Ternary operator
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // adult

// Multiple ternary operators
function getTemperatureDesc(temp) {
  return temp > 30 ? "hot" : temp > 20 ? "warm" : temp > 10 ? "cool" : "cold";
}

console.log(getTemperatureDesc(25)); // warm
console.log(getTemperatureDesc(35)); // hot
