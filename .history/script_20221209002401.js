class Caculator {
  constructor(operandCurrentElment, operandPrevoiusElment) {
    this.operandCurrentElment = operandCurrentElment;
    this.operandPrevoiusElment = operandPrevoiusElment;
    this.clear();
  }

  clear() {
    this.operandCurrent = "";
    this.operandPrevoius = "23232";
    this.operation = undefined;
  }

  delete() {
    this.operandCurrent = this.operandCurrent.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.operandCurrent.includes(".")) return;
    this.operandCurrent += number;
  }

  chooseOperator(operation) {
    if (this.operandCurrent === "") return;
    if (this.operandPrevoius !== " ") {
      this.compute();
    }
    this.operation = operation;
    this.operandPrevoius = this.operandCurrent;
    this.operandCurrent = "";
  }
  compute() {
    let compuation;
    const prev = parseFloat(this.operandPrevoius);
    const current = parseFloat(this.operandCurrent);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        compuation = prev + current;
        break;
      case "-":
        compuation = prev - current;
        break;
      case "*":
        compuation = prev * current;
        break;
      case "/":
        compuation = prev / current;
        break;
      default:
        return;
    }
    this.operandCurrent = compuation;
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.operandCurrentElment.innerText = this.getDisplayNumber(
      this.operandCurrent
    );
    if (this.operation != null) {
      this.operandPrevoiusElment.innerText = `${this.getDisplayNumber(
        this.operandPrevoius
      )} ${this.operation}`;
    } else {
      this.operandPrevoiusElment.innerText = "";
    }
  }
}
const btnNumber = document.querySelectorAll("[data-number]");
const btnOperation = document.querySelectorAll("[data-operation]");
const btnEqual = document.querySelector("[data-equal]");
const btnClear = document.querySelector("[data-clear]");
const btnDelete = document.querySelector("[data-delete]");
const operandPrevoiusElment = document.querySelector("[data-prevoius]");
const operandCurrentElment = document.querySelector("[data-current]");
console.log(btnEqual);

const calculator = new Caculator(operandCurrentElment, operandPrevoiusElment);

btnNumber.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

btnOperation.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

btnClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

btnEqual.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

btnDelete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
