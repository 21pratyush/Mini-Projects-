const calculateButton = document.getElementById("calculate");


function calculateBMI() {
    const height = parseFloat(document.getElementById("height").value) / 100; // Converting to meters
    const weight = parseFloat(document.getElementById("weight").value);
    
    if (height <= 0 || weight <= 0) {
        document.getElementById("result").innerHTML = "Invalid inputs. Please enter valid height and weight.";
        return;
    }
    
    const bmi = weight / (height * height);
    const result = document.getElementById("result");

    if (!isNaN(bmi)) {
        let interpretation = "";

        if (bmi < 18.5) {
            interpretation = "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            interpretation = "Normal weight";
        } else if (bmi >= 25 && bmi < 30) {
            interpretation = "Overweight";
        } else {
            interpretation = "Obese";
        }

        result.innerHTML = `Your BMI is ${bmi.toFixed(2)}. You are ${interpretation}.`;
    } else {
        result.innerHTML = "Please enter valid height and weight.";
    }
}


calculateButton.addEventListener("click", calculateBMI);
