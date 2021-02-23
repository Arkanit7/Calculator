const prevOper = document.querySelector("[data-calc-previous]");
const curOper = document.querySelector("[data-calc-current]");
const numberBtns = document.querySelectorAll("[data-calc-number]");
const delBtn = document.querySelector("[data-calc-delete]");
const clearBtn = document.querySelector("[data-calc-clear]");
const operatorBtns = document.querySelectorAll("[data-calc-operator]");
const equalBtn = document.querySelector("[data-calc-equal]");
const percentBtn = document.querySelector("[data-calc-percent]");

class Calculator {
  constructor(prevOper, curOper) {
    this.prevOper = prevOper;
    this.curOper = curOper;
    this.virtualDisplay = "";
    this.virtualPrevios = "";
    this.operator = "";
    this.clear();
  }

  appendNumber(number) {
    if (number === "." && this.virtualDisplay.includes(".")) return;
    this.virtualDisplay = this.virtualDisplay.toString() + number.toString();
  }
  delNumber() {
    this.virtualDisplay = this.virtualDisplay.toString().slice(0, -1);
  }
  chooseOperator(operator) {
    if (this.virtualDisplay === "") return;
    if (this.virtualPrevios !== "") {
      this.compute();
    }
    this.operator = operator;
    this.virtualPrevios = this.virtualDisplay;
    this.virtualDisplay = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.virtualPrevios);
    const curr = parseFloat(this.virtualDisplay);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operator) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      case "%":
        computation = curr / 10;
        break;
      default:
        return;
    }
    this.virtualDisplay = computation;
    this.operator = undefined;
    this.virtualPrevios = "";
  }

  clear() {
    this.virtualDisplay = "";
    this.virtualPrevios = "";
    this.operator = "";
    this.updateDisplay();
  }
  prettyPrint(number) {
    return number;
  }
  updateDisplay() {
    this.curOper.innerText = this.prettyPrint(this.virtualDisplay);
    if (this.operator != null) {
      this.prevOper.innerText =
        this.prettyPrint(this.virtualPrevios) + this.operator;
    }
  }
}

const calc = new Calculator(prevDisplayNode, curDisplayNode);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let number = btn.dataset.calcNumber;
    device.appendNumber(number);
    device.updateDisplay();
  });
});

delBtn.addEventListener("click", () => {
  device.delNumber();
  device.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  device.clear();
  device.updateDisplay();
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let operator = btn.dataset.calcOperator;
    device.compute();
    device.chooseOperator(operator);
    device.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  device.compute();
  device.updateDisplay();
});

percentBtn.addEventListener("click", () => {
  convertPercents();
});
