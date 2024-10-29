// Generate unique referral link
const userId = 'USER_ID'; // Replace with dynamic user ID logic
const referralLink = `https://yourapp.com/referral?userId=${userId}`;
document.getElementById('referral-input').value = referralLink;

// Function to open sharing options
function shareReferralLink() {
    if (navigator.share) {
        navigator.share({
            title: 'Join me and earn rewards!',
            text: 'Check out this awesome app!',
            url: referralLink,
        })
        .then(() => console.log('Share successful'))
        .catch((error) => console.log('Sharing failed', error));
    } else {
        alert("Sharing is not supported in this browser.");
    }
}

// Function to copy referral link to clipboard
function copyReferralLink() {
    const referralInput = document.getElementById('referral-input');
    referralInput.select(); // Select the input field
    document.execCommand('copy'); // Copy the text inside the input field
    alert("Referral link copied to clipboard!"); // Notify the user
}

// Event listeners for buttons
document.getElementById('share-btn').addEventListener('click', shareReferralLink);
document.getElementById('copy-btn').addEventListener('click', copyReferralLink);
// Function to update the friend count and enable the claim button
function updateFriendCount(count) {
    document.getElementById("friend-count").innerText = `${count} Friends`;

    // Enable the claim button if there is at least one friend
    if (count > 0) {
        document.getElementById("claim-btn").disabled = false;
    }
}

// Call this function on page load to get the current friend count from the backend
document.addEventListener('DOMContentLoaded', function () {
    const currentPoints = parseInt(localStorage.getItem("points"), 10);
    const friendCount = parseInt(localStorage.getItem("friendCount"), 10) || 0;

    updateFriendCount(friendCount); // Initial friend count update
});

// Function to claim rewards
document.getElementById("claim-btn").addEventListener("click", function () {
    const currentPoints = parseInt(localStorage.getItem("points"), 10);
    const newPoints = currentPoints + 250; // Add reward points

    // Update localStorage
    localStorage.setItem("points", newPoints);

    // Update balance on all pages
    document.querySelectorAll('.points-display').forEach(function(el) {
        el.textContent = newPoints;  // Update displayed points
    });

    // Update friend count
    const updatedFriendCount = parseInt(localStorage.getItem("friendCount"), 10) - 1; // Reduce by 1 for claiming
    localStorage.setItem("friendCount", updatedFriendCount);

    updateFriendCount(updatedFriendCount); // Update displayed friend count

    // Optionally, send the reward claim to the backend
    fetch('/claim-reward', {
        method: 'POST',
        body: JSON.stringify({ userId: "USER_ID" }), // Replace with actual user ID
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
