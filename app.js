const resultField = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
const historyPopup = document.getElementById("history-popup");
const historyList = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            resultField.value = "";
        } else if (value === "DEL") {
            resultField.value = resultField.value.slice(0, -1);
        } else if (value === "=") {
            calculateResult();
        } else if (!value) {
            openHistory();
        } else {
            resultField.value += value;
        }
    });
});

function calculateResult() {
    try {
        const expression = resultField.value;
        const result = new Function(`return ${expression}`)();
        resultField.value = result;
        addToHistory(`${expression} = ${result}`);
    } catch (error) {
        resultField.value = "Error";
    }
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
}

function openHistory() {
    historyList.innerHTML = "";

    history.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = entry;
        
        listItem.onclick = () => {
            resultField.value = entry.split(" = ")[0];
            closeHistory();
        };

        historyList.appendChild(listItem);
    });

    historyPopup.style.display = "flex";
}

function closeHistory() {
    historyPopup.style.display = "none";
}