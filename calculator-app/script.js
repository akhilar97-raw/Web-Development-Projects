let display = document.getElementById("display");

function append(value) {
    display.value += value;
}


function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}


function clearDisplay() {
    display.value = "";
}


document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        append(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        clearDisplay();
    }
});