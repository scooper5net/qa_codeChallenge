import calculator from "../calculator";

// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  { x: 5, y: 10, method: "add" },
  { x: 5, y: 10, method: "subtract" },
  { x: 5, y: 10, method: "multiply" },
  { x: 5, y: 10, method: "divide" },
  { x: -12, y: 10000, method: "add" },
  { x: -12, y: 10000, method: "subtract" },
  { x: -12, y: 10000, method: "multiply" },
  { x: -12, y: 10000, method: "divide" },
  { x: 42, y: 0, method: "add" },
  { x: 42, y: 0, method: "subtract" },
  { x: 42, y: 0, method: "multiply" },
  { x: 42, y: 0, method: "divide" },
  { x: 81, y: 227, method: "add" },
  { x: 81, y: 227, method: "subtract" },
  { x: 81, y: 227, method: "multiply" },
  { x: 81, y: 227, method: "divide" },
];

// Testing manually before writing code.
// console.log(calculator.add(7, 10));
// console.log(calculator.subtract(10, 2));
// console.log(calculator.multiply(5, 5));
// console.log(calculator.divide(5, 10));

describe("Calculator", () => {
  dataset.forEach((problem) => {
    test(`The ${problem.method} method works with ${problem.x} and ${problem.y}.`, () => {
      switch(problem.method) {
        case "add":
          expect(calculator.add(problem.x, problem.y)).toEqual(problem.x + problem.y);
          break;
        case "subtract":
          expect(calculator.subtract(problem.x, problem.y)).toEqual(problem.x - problem.y);
          break;
        case "multiply":
          expect(calculator.multiply(problem.x, problem.y)).toEqual(problem.x * problem.y);
          break;
        case "divide":
          expect(calculator.divide(problem.x, problem.y)).toEqual(problem.x / problem.y);
          break;
        default:
          console.log("Are you sure that was a math problem?")
      }
    })
  })
});


