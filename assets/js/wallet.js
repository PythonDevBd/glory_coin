document.addEventListener("DOMContentLoaded", function () {
    // Initializing elements
    const balanceElement = document.getElementById('balances');
    const availableTonElement = document.getElementById('available-ton');
    const walletConnectBtn = document.getElementById('wallet-connect-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const tabs = document.querySelectorAll('.tab');
    
   
        let coins = 0; // Initialize balance variable

        function updateBalance(points) {
            coins += points; // Add points to balance
            document.getElementById('balance').textContent = `Current Balance: G:${coins}`; // Update balance display
        }

    

    // Dynamic balance and TON values
    let gValue = 302000;
    let tonBalance = 0;

    // Function to update display values
    function updateDisplay() {
        balanceElement.textContent = gValue;
        availableTonElement.textContent = `Available: ${tonBalance} TON`;
    }

    // Wallet connect function
    walletConnectBtn.addEventListener('click', function () {
        // Simulating a wallet connection (you'll replace this with real wallet integration)
        const userConfirmed = confirm("Connect your TON wallet?");
        if (userConfirmed) {
            tonBalance += 0.13; // Simulate adding TON after connection
            alert("Wallet connected! 0.13 TON added.");
            updateDisplay();
        }
    });

    // Withdraw function
    withdrawBtn.addEventListener('click', function () {
        const withdrawAmount = parseFloat(document.getElementById('withdraw-amount').value);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            alert("Enter a valid amount.");
            return;
        }
        if (withdrawAmount > tonBalance) {
            alert("Insufficient TON balance.");
            return;
        }

        tonBalance -= withdrawAmount;
        alert(`Withdrew ${withdrawAmount} TON. Withdrawal is pending.`);
        updateDisplay();
    });

    // Tab functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelector('.tab.active').classList.remove('active');
            this.classList.add('active');
            // Add logic to display relevant content based on tab
        });
    });

    // Initialize the display
    updateDisplay();
});



document.addEventListener("DOMContentLoaded", function() {
    const connectWalletBtn = document.getElementById("connectWalletBtn");
    const walletModal = document.getElementById("walletModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const openTelegramWalletBtn = document.getElementById("openTelegramWallet");

    // Open the wallet modal
    connectWalletBtn.addEventListener("click", () => {
        walletModal.style.display = "flex";
    });

    // Close the wallet modal
    closeModalBtn.addEventListener("click", () => {
        walletModal.style.display = "none";
    });

    // Function to fetch wallet balance from the backend
    async function fetchWalletBalance(walletAddress) {
        try {
            const response = await fetch(`/api/ton/getBalance/${walletAddress}`);
            if (!response.ok) throw new Error("Failed to fetch balance");

            const { balance } = await response.json();
            return balance; // Balance in TON
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
            alert("Failed to fetch wallet balance.");
            throw error;
        }
    }

    // Function to handle wallet connection via Telegram
    async function connectWallet() {
        try {
            const dummyWalletAddress = "user_id_12345"; // Replace with actual address if available

            // Fetch balance
            const balance = await fetchWalletBalance(dummyWalletAddress);

            // Check balance and show in UI or handle error if below requirement
            if (balance >= 0.13) {
                alert(`Wallet connected successfully! Balance: ${balance} TON`);
                // Update the wallet button text with wallet address if desired
                connectWalletBtn.textContent = `Wallet Connected: ${dummyWalletAddress}`;
                walletModal.style.display = "none"; // Close modal after connection
            } else {
                alert("Insufficient balance for verification. You need at least 0.13 TON.");
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    }

    // Connect to wallet on clicking "Open Wallet in Telegram"
    openTelegramWalletBtn.addEventListener("click", connectWallet);
});
