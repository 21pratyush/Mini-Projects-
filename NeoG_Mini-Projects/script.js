// selecting all the elements
const form = document.getElementById("stock-form");
const initialPriceInput = document.getElementById("initial-price");
const stocksQuantityInput = document.getElementById("stocks-quantity");
const currentPriceInput = document.getElementById("current-price");
const submitBtn = document.getElementById("submit-btn");
const outputBox = document.getElementById("output-box");
const refreshBtn = document.querySelector("#refresh-btn");

//taking inputs and storing it in the const
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const initial = parseFloat(initialPriceInput.value);
    const quantity = parseInt(stocksQuantityInput.value);
    const current = parseFloat(currentPriceInput.value);
    
    //checking for null or irrelevant inputs
    if (isNaN(initial) || isNaN(quantity) || isNaN(current)) {
        displayMessage("Please enter valid numbers.", "orange", "white");
        return;
    }
    
    // calling function for caluclations
    calculateProfitAndLoss(initial, quantity, current);
});

// Calulation for the Profit and Loss
function calculateProfitAndLoss(initial, quantity, current) {
    const costPrice = initial * quantity;
    const marketValue = current * quantity;
    const profitLoss = marketValue - costPrice;
    const profitLossPercentage = (profitLoss / Math.abs(profitLoss)) * (Math.abs(profitLoss) / costPrice) * 100;

    if (profitLoss > 0) {
        displayMessage(`Profit: $${profitLoss.toFixed(2)} (${profitLossPercentage.toFixed(2)}%)`, "green", "white");
    } else if (profitLoss < 0) {
        displayMessage(`Loss: $${Math.abs(profitLoss).toFixed(2)} (${Math.abs(profitLossPercentage.toFixed(2))}%)`, "red", "white");
    } else {
        displayMessage("No profit or loss.", "#f0f0f0", "black");
    }
}

//Displaying the msg for the result of -> | Profit | Loss | No Profit or Loss |
function displayMessage(message, backgroundColor, fontColor) {
    outputBox.textContent = message;
    outputBox.style.backgroundColor = backgroundColor;
    outputBox.style.color = fontColor;
}

//Refresh btn-feat.
refreshBtn.addEventListener("click", function () {
    initialPriceInput.value = "";
    stocksQuantityInput.value = "";
    currentPriceInput.value = "";
    outputBox.textContent = "";
    outputBox.style.backgroundColor = "#f0f0f0"; 
    
    //Rotate-animation
    this.classList.toggle("rotate-icon");
    setTimeout(() => {
        this.classList.toggle("rotate-icon");
    }, 1000); // animation-duration in milliseconds

});
