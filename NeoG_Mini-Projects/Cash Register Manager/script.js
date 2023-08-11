// Storing HTML elements in const
const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const checkButton = document.querySelector("#check-button");
const message = document.querySelector("#error-message");
const noOfNotes = document.querySelectorAll(".no-of-notes");
const Notes = document.querySelectorAll(".notes");
const refreshButton = document.querySelector("#refresh-btn");
const changeTable = document.querySelector("#change-table");

// Using Event-listener for the "Check" button
checkButton.addEventListener("click", function validateBillAndCashAmount() {
    hideMessage();
    const billValue = parseFloat(billAmount.value);
    const cashValue = parseFloat(cashGiven.value);

    // Checking if inputs are valid numbers
    if (isNaN(billValue) || isNaN(cashValue)) {
        showMessage("Input numbers only");
        // Hiding the change table
        changeTable.style.display = "none";
        return;
    }
    
    // Checking the bill and cash values
    if (billValue > 0) {
        if (billValue === cashValue) {
            showMessage("Thank you! Have a nice day.");
            // Hiding the change table
            changeTable.style.display = "none";
        } else if (cashValue >= billValue) {
            const amountToBeReturned = cashValue - billValue;
            calculateChange(amountToBeReturned);
            // Showing the change table
            changeTable.style.display = "table";
        } else {
            showMessage("Do you wanna wash plates?");
            // Hiding the change table
            changeTable.style.display = "none";
        }
    } else {
        showMessage("Invalid Bill Amount \n You wanna give tip?");
        // Hiding the change table
        changeTable.style.display = "none";
    }

    // Calling calculateChange even if cashValue is less than billValue
    calculateChange(cashValue - billValue);
});

// Function to hide the error message
function hideMessage() {
    message.style.display = "none";
}

// Function to show the error message
function showMessage(msg) {
    message.style.display = "block";
    message.innerText = msg;
    // Hiding the change table
    changeTable.style.display = "none";
}

// Available currency notes
const availableNotes = [2000, 500, 100, 20, 10, 5, 1];

// Function to calculate the change
function calculateChange(amountToBeReturned) {
    // Loop over all available notes
    for (let i = 0; i < availableNotes.length; i++) {
        // Calculating the number of notes needed
        const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);

        // Calculating the remaining amount
        amountToBeReturned = amountToBeReturned % availableNotes[i];

        // Ensuring numberOfNotes is never negative
        const sanitizedNotes = Math.max(numberOfNotes, 0);

        // Updating the no. of notes in the table for the current amount
        noOfNotes[i].innerText = sanitizedNotes;

        // Add background color for highlighting
        if (sanitizedNotes > 0) {
            noOfNotes[i].style.backgroundColor = "red";
            noOfNotes[i].style.color = "white";
            Notes[i].style.backgroundColor = "red";
            Notes[i].style.color = "white";
        } else {
           //Reseting-Style
            noOfNotes[i].style.backgroundColor = "white"; 
            noOfNotes[i].style.color = "black"; 
            Notes[i].style.backgroundColor = "white"; 
            Notes[i].style.color = "black"; 
        }
    }
}

// Using click event-listener to the refresh-button
refreshButton.addEventListener("click", function() {
    // Clearing the input fields
    billAmount.value = "";
    cashGiven.value = "";

    // Clearing the number of notes and highlight
    for (let i = 0; i < noOfNotes.length; i++) {
        noOfNotes[i].innerText = "";
        noOfNotes[i].style.backgroundColor = "white";
        noOfNotes[i].style.color = "black";
        Notes[i].style.backgroundColor = "white";
        Notes[i].style.color = "black";
    }

    // Hiding the message
    hideMessage();

    // Rotate-animation
    this.classList.toggle("rotate-icon");
    setTimeout(() => {
        this.classList.toggle("rotate-icon");
    }, 1000); // animation-duration in milliseconds
});
