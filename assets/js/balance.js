// balance.js

// Function to update the balance
function updateBalance(pointsToAdd) {
    // Get current balance from localStorage
    let currentBalance = parseInt(localStorage.getItem("points"), 10) || 0;

    // Update the balance
    currentBalance += pointsToAdd;
    localStorage.setItem("points", currentBalance);

    // Dispatch a custom event to notify other pages
    const balanceUpdateEvent = new CustomEvent('balanceUpdated', { detail: currentBalance });
    window.dispatchEvent(balanceUpdateEvent);
}

// Function to update the displayed balance
function displayBalance() {
    const currentBalance = parseInt(localStorage.getItem("points"), 10) || 0;
    document.querySelectorAll('.points-display').forEach(function(el) {
        el.textContent = currentBalance; // Update the points display
    });
}

// Event listener for balance updates
window.addEventListener('balanceUpdated', function(e) {
    const newBalance = e.detail; // Get new balance from event
    displayBalance(); // Update display on this page
});

// On page load, display the current balance
document.addEventListener('DOMContentLoaded', displayBalance);
