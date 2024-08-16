// Function to calculate and update the total percentages for each column
function calculatePercentages() {
    // Select all the rows in the table body
    const rows = document.querySelectorAll('#data-table tbody tr');

    // Initialize an array to store the total for each column (assuming 15 columns)
    const columnTotals = Array(15).fill(0);

    // Loop through each row
    rows.forEach(row => {
        // Select all checkboxes in the row
        const checkboxes = row.querySelectorAll('.option');

        // Loop through each checkbox and update the corresponding column total
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                columnTotals[index] += parseFloat(checkbox.getAttribute('data-percentage'));
            }
        });
    });

    // Update the "Total" row in the table with the calculated totals
    const totalRow = document.getElementById('total-row');
    const totalCells = totalRow.querySelectorAll('td');

    // Place totals under the correct columns
    columnTotals.forEach((total, index) => {
        totalCells[index + 1].textContent = total.toFixed(3); // Display totals with 3 decimal places
    });

    // Update the percentage bar and text based on the sum of all column totals
    const totalPercentage = columnTotals.reduce((sum, val) => sum + val, 0) * 100;
    const percentageText = document.getElementById('percentage-text');
    const percentageFill = document.getElementById('percentage-fill');
    percentageText.textContent = `${totalPercentage.toFixed(2)}%`;
    percentageFill.style.width = `${totalPercentage.toFixed(2)}%`;

    // Retrieve the total percentage from the first page
    const page1Total = parseFloat(localStorage.getItem('page1Total')) || 0;
    const overallTotal = page1Total + totalPercentage;

    // Update the overall total
    const overallPercentageText = document.getElementById('overall-percentage-text');
    const overallPercentageFill = document.getElementById('overall-percentage-fill');
    overallPercentageText.textContent = `${overallTotal.toFixed(2)}%`;
    overallPercentageFill.style.width = `${overallTotal.toFixed(2)}%`;
}

// Add event listeners to all checkboxes to trigger calculation immediately
document.querySelectorAll('.option').forEach(checkbox => {
    checkbox.addEventListener('change', calculatePercentages);
});

// Initial calculation to set the totals if any checkboxes are pre-checked
calculatePercentages();
