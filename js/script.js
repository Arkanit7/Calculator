const prevDisplayNode = document.querySelector("[data-calc-previous]");
const curDisplayNode = document.querySelector("[data-calc-current]");
const numberBtns = document.querySelectorAll("[data-calc-number]");
const delBtn = document.querySelector("[data-calc-delete]");
const clearBtn = document.querySelector("[data-calc-clear]");
const operatorBtns = document.querySelectorAll("[data-calc-operator]");
const equalBtn = document.querySelector("[data-calc-equal]");
const percentBtn = document.querySelector("[data-calc-percent]");

class Calculator {
  constructor(prevDisplayNode, curDisplayNode) {
    this.prevDisplayNode = prevDisplayNode;
    this.curDisplayNode = curDisplayNode;
    this.prevVirtualDisplay = "";
    this.curVirtualDisplay = "";
    this.clear();
    this.updateDisplay();
  }
  clear() {
    this.prevVirtualDisplay = "";
    this.curVirtualDisplay = "";
    this.operator = null;
  }
  appendNumber(num) {
    if (num === "." && this.curVirtualDisplay.includes(".")) return;
    this.curVirtualDisplay = this.curVirtualDisplay.toString() + num.toString();
  }
  delNumber() {
    if (this.curVirtualDisplay)
      this.curVirtualDisplay = this.curVirtualDisplay.slice(0, -1);
  }
  chooseOperator(operator) {
    if (!this.prevVirtualDisplay && !this.curVirtualDisplay) {
      if (operator === "-") this.curVirtualDisplay = "-";
    } else if (!this.prevVirtualDisplay && this.curVirtualDisplay !== "-") {
      this.operator = operator;
      this.prevVirtualDisplay = this.curVirtualDisplay;
      this.curVirtualDisplay = "";
    } else {
      this.operator = operator;
      this.compute();
    }
  }
  compute() {
    if (this.operator && this.prevVirtualDisplay && this.curVirtualDisplay) {
      let cur = this.curVirtualDisplay;
      cur = parseFloat(cur);
      let prev = this.prevVirtualDisplay;
      prev = parseFloat(prev);
      let result;
      if (isNaN(cur) || isNaN(prev)) return;
      switch (this.operator) {
        case "+":
          result = prev + cur;
          break;
        case "-":
          result = prev - cur;
          break;
        case "*":
          result = prev * cur;
          break;
        case "/":
          result = prev / cur;
          break;
        default:
          break;
      }
      this.curVirtualDisplay = result.toString();
      this.prevVirtualDisplay = "";
      this.operator = null;
    }
  }
  convertPercents() {
    if (this.curVirtualDisplay) {
      this.curVirtualDisplay = parseFloat(this.curVirtualDisplay) / 100;
      this.curVirtualDisplay = this.curVirtualDisplay.toString();
    }
  }
  prettyPrint(string) {
    let digitsArray = string.split(".");
    let firstDigits = parseInt(digitsArray[0]);
    if (firstDigits) {
      digitsArray[0] = firstDigits.toLocaleString("en");
      string = digitsArray.join(".");
    }
    return string;
  }
  updateDisplay() {
    this.curDisplayNode.innerText = this.prettyPrint(this.curVirtualDisplay);
    if (this.operator)
      this.prevDisplayNode.innerText =
        this.prettyPrint(this.prevVirtualDisplay) + this.operator;
    else
      this.prevDisplayNode.innerText = this.prettyPrint(
        this.prevVirtualDisplay
      );
  }
}

const device = new Calculator(prevDisplayNode, curDisplayNode);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.dataset.calcNumber;
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
  device.convertPercents();
  device.updateDisplay();
});
