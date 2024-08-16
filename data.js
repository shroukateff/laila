// Function to calculate and update the total percentages for each column
function calculatePercentages() {
    // Select all the rows in the table body
    const rows = document.querySelectorAll('#data-table tbody tr');

    // Initialize arrays to store the total for each column for each phase
    const columnTotals = Array(5).fill(null).map(() => Array(15).fill(0)); // 5 phases, each with 15 columns
    const phasesTotal = Array(15).fill(0);

    // Loop through each row
    rows.forEach(row => {
        // Select all checkboxes in the row
        const checkboxes = row.querySelectorAll('.option');

        // Loop through each checkbox and update the corresponding column totals
        checkboxes.forEach((checkbox, index) => {
            const percentage = parseFloat(checkbox.getAttribute('data-percentage'));
            if (checkbox.checked) {
                // Determine phase number from class
                for (let i = 1; i <= 5; i++) {
                    if (row.classList.contains(`phase${i}`)) {
                        columnTotals[i - 1][index] += percentage;
                        break;
                    }
                }
            }
        });
    });

    // Update the "Total" rows in the table with the calculated totals
    for (let i = 0; i < 5; i++) {
        const totalRow = document.getElementById(`total-row${i + 1}`);
        const totalCells = totalRow.querySelectorAll('td');
        columnTotals[i].forEach((total, index) => {
            totalCells[index + 1].textContent = total.toFixed(3); // Display totals with 3 decimal places
        });
    }

    // Calculate and update "Phases Total" row
    const phasesTotalRow = document.getElementById('phases-total-row');
    const phasesTotalCells = phasesTotalRow.querySelectorAll('td');
    columnTotals[0].forEach((_, index) => {
        phasesTotal[index] = columnTotals.reduce((sum, totals) => sum + totals[index], 0);
        phasesTotalCells[index + 1].textContent = phasesTotal[index].toFixed(3); // Display totals with 3 decimal places
    });

    // Update the percentage bar and text based on the sum of all column totals for all phases
    const totalPercentage = columnTotals.flat().reduce((sum, val) => sum + val, 0) ;
    const percentageText = document.getElementById('percentage-text');
    const percentageFill = document.getElementById('percentage-fill');
    percentageText.textContent = `${totalPercentage.toFixed(3)}%`;
    percentageFill.style.width = `${totalPercentage.toFixed(3)}%`;

    // Save the total percentage to localStorage
    localStorage.setItem('page1Total', totalPercentage.toFixed(3));
}

// Navigate to the next page on button click
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    // Trigger calculation and store the result before navigating
    calculatePercentages();
    window.location.href = 'design.html'; // Navigate to the second page
});

// Add event listeners to all checkboxes to trigger calculation immediately
document.querySelectorAll('.option').forEach(checkbox => {
    checkbox.addEventListener('change', calculatePercentages);
});

// Initial calculation to set the totals if any checkboxes are pre-checked
calculatePercentages();
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function highlightImage(bulletNumber) {
    const images = document.querySelectorAll('.image-container img');
    images.forEach(image => image.classList.remove('active'));
    const selectedImage = document.getElementById(`image${bulletNumber}`);
    selectedImage.classList.add('active');
}

// Close the sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menu = document.querySelector('.menu');
    if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});
document.getElementById('select-all-button').addEventListener('click', () => {
    // Get all checkboxes in the table
    const checkboxes = document.querySelectorAll('#data-table tbody .option');

    // Loop through each checkbox and check it
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        // Trigger the change event for each checkbox to update totals
        checkbox.dispatchEvent(new Event('change'));
    });
});
