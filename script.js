
function calculateInterest() {

    let amount = Number(document.getElementById("principal").value);
    let rate = Number(document.getElementById("rate").value);

    let start = new Date(document.getElementById("startDate").value);
    let end = new Date(document.getElementById("endDate").value);

    if (amount <= 0 || rate < 0 || isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert("Please enter valid details!");
        return;
    }

    let days = (end - start) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
        alert("End date must be after start date!");
        return;
    }

    let interest = (amount * rate * days) / 3000;
    let total = amount + interest;

    document.getElementById("result").innerText =
        "Total Days: " + days +
        "\nInterest: ₹" + interest.toFixed(2) +
        "\nTotal Amount: ₹" + total.toFixed(2);
}
