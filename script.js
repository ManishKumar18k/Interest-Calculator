
// Get all calculator elements
const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");

// Result elements
const interestResult = document.getElementById("interestResult");
const principalResult = document.getElementById("principalResult");
const daysResult = document.getElementById("daysResult");
const interestDetail = document.getElementById("interestDetail");
const totalResult = document.getElementById("totalResult");

// Format number into Indian currency
function formatMoney(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Calculate date difference using UTC
function calculateDays(start, end) {

    const startParts = start.split("-").map(Number);
    const endParts = end.split("-").map(Number);

    const startTime = Date.UTC(
        startParts[0],
        startParts[1] - 1,
        startParts[2]
    );

    const endTime = Date.UTC(
        endParts[0],
        endParts[1] - 1,
        endParts[2]
    );

    const difference = endTime - startTime;

    return Math.round(difference / (1000 * 60 * 60 * 24));
}

// Calculate interest
calculateBtn.addEventListener("click", function () {

    // Read inputs
    const principal = Number(principalInput.value);
    const rate = Number(rateInput.value);

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    // Clear previous error
    errorMessage.textContent = "";

    // Check principal
    if (principalInput.value === "" || principal <= 0) {
        errorMessage.textContent = "Please enter a valid principal amount.";
        principalInput.focus();
        return;
    }

    // Check rate
    if (rateInput.value === "" || rate < 0) {
        errorMessage.textContent = "Please enter a valid monthly interest rate.";
        rateInput.focus();
        return;
    }

    // Check dates
    if (startDate === "" || endDate === "") {
        errorMessage.textContent = "Please select both start and end dates.";
        return;
    }

    // Check date order
    if (endDate < startDate) {
        errorMessage.textContent = "End date must be after the start date.";
        endDateInput.focus();
        return;
    }

    // Calculate total days
    const days = calculateDays(startDate, endDate);

    // Calculate simple interest
    // Monthly rate is per ₹100
    // 30 days = one month
    const interest = (principal * rate * days) / 3000;

    // Calculate total amount
    const total = principal + interest;

    // Show results
    interestResult.textContent = formatMoney(interest);
    principalResult.textContent = formatMoney(principal);
    daysResult.textContent = days + (days === 1 ? " Day" : " Days");
    interestDetail.textContent = formatMoney(interest);
    totalResult.textContent = formatMoney(total);

    // Scroll to result on mobile
    if (window.innerWidth <= 600) {
        document.getElementById("resultCard").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

});


// Reset calculator
resetBtn.addEventListener("click", function () {

    principalInput.value = "";
    rateInput.value = "";
    startDateInput.value = "";
    endDateInput.value = "";

    errorMessage.textContent = "";

    interestResult.textContent = "₹0.00";
    principalResult.textContent = "₹0.00";
    daysResult.textContent = "0 Days";
    interestDetail.textContent = "₹0.00";
    totalResult.textContent = "₹0.00";

});


// Enter key calculation
document.querySelectorAll(".calculator-form input").forEach(function (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            calculateBtn.click();
        }

    });

});


// Automatically update footer year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
