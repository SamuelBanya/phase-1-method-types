class Square {
  constructor(sideLength) {
    this.sideLength = sideLength;
  }

  area() {
    return this.sideLength * this.sideLength;
  }

  areaMessage() {
    return `The area of this square is ${this.area()}`;
  }
}

class CommonMath {
  static triple(number) {
    return number * number * number;
  }

  static findHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
  }
}

class SquareGet {
  constructor(sideLength) {
    this.sideLength = sideLength;
  }

  // By using a 'get' keyword, we can later access the function call as a property (pseudo-property):
  get area() {
    return this.sideLength * this.sideLength;
  }
}

class SquareRevision {
  constructor(sideLength) {
    this.sideLength = sideLength;
    // NOTE:
    // Though this works to place the calculation into the 'Constructor' function
    // of a class, this creates more CPU usage since the calculation is called upon
    // the loading of the class instance itself
    // We could have instead put the same idea into a 'get' based method for later use:
    // ALSO: If 'sideLength' is ever changed, the actual value for the 'area' will later be
    // inaccurate
    this.area = sideLength * sideLength;
  }
}

class SquareSet {
  constructor(sideLength) {
    this.sideLength = sideLength;
  }

  get area() {
    return this.sideLength * this.sideLength;
  }

  set area(newArea) {
    if (newArea > 0)  {
      // This allows us to reverse the calculation to determine the original
      // 'sideLength' from the provided 'newArea' amount and updates it
      // accordingly:
      this.sideLength = Math.sqrt(newArea);
    } else {
      console.warn("Area cannot be less than 0");
    }
  }
}

class SquarePrivate {
  // This utilizes the '#' pound sign so that 'sideLength' is never able to be changed:
#sideLength;
  constructor(sideLength) {
    if (sideLength > 0) {
      this.#sideLength = sideLength;
    } else {
      throw new Error("A square's side length must be a positive value");
    }
  }

  get sideLength() {
    this.#sideLength;
  }

  set sideLength(sideLength) {
    if (sideLength > 0) {
      this.#sideLength = sideLength;
    } else {
      throw new Error("A square's side length must be a positive value");
    }
  }
}

class Student {
#firstName;
#lastName;

  constructor(firstName, lastName) {
    this.#firstName = this.sanitize(firstName);
    this.#lastName = this.sanitize(lastName);
  }

  get firstName() {
    return this.capitalize(this.#firstName);
  }

  // NOTE:
  // Since we are using the 'set' keyword, we are allowed to modify the private field '#firstName':
  set firstName(firstName) {
    this.#firstName = this.sanitize(firstName);
  }

  capitalize(string) {
    // Capitalizes first letter:
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sanitize(string) {
    // Removes any non-alphanumeric characters except dash and single quotes (apostrophes)
    return string.replace(/[^A-Za-z0-9-]+/g, "");
  }
}

const square = new Square(5);
console.log(square.area());
console.log(square.areaMessage());

// This is an example of calling a static method since we don't need to actually create an instance of it
// to use the function:
const num = CommonMath.triple(3);
const c = CommonMath.findHypotenuse(3, 4);

console.log(`num: ${num}`);
console.log(`c: ${c}`);

const squareGet = new SquareGet(5);
console.log(`squareGet.sideLength: ${squareGet.sideLength}`);
// We don't have to use .area() but can actually just use '.area' since we used 'get' keyword for the
// method itself, so we can access it like a 'pseudo property' in this context:
console.log(`squareGet.area: ${squareGet.area}`);

const squareRevision = new SquareRevision(2);
console.log(`squareRevision.sideLength: ${squareRevision.sideLength}`);
console.log(`squareRevision.area: ${squareRevision.area}`);

squareRevision.sideLength = 10;

console.log(`squareRevision.sideLength (AFTER changes to 'sideLength'): ${squareRevision.sideLength}`);
console.log(`squareRevision.area (AFTER changes to 'sideLength'): ${squareRevision.area}`);

const squareSet = new SquareSet(5);
console.log(`squareSet.sideLength: ${squareSet.sideLength}`);
console.log(`squareSet.area: ${squareSet.area}`);

squareSet.area = 64;

console.log(`squareSet.sideLength (AFTER revising .area to 64): ${squareSet.sideLength}`);
console.log(`squareSet.area (AFTER revising .area to 64): ${squareSet.area}`);

squareSet.area = 0;

console.log(`squareSet.sideLength (AFTER revising .area to 0): ${squareSet.sideLength}`);
console.log(`squareSet.area (AFTER revising .area to 0): ${squareSet.area}`);

let student = new Student("Carr@ol-Ann", ")Freel*ing");

console.log("student:");
console.log(student);

student.firstName = "Hea@)@(!$)ther";
console.log(`student.firstName (AFTER assigning Hea@)@(!$)ther): ${student.firstName}`);
