// Select DOM elements
const expForm = document.getElementById('expForm');
const typeSelect = document.getElementById('type');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const transactionTable = document.getElementById('transactionTable');
const balanceDisplay = document.querySelector('.balance');

// Initialize transactions array and balance
let transactions = [];
let balance = 0;

// Update balance display
const updateBalance = () => {
    balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    balanceDisplay.textContent = balance.toFixed(2);
};

// Render transactions table
const renderTransactions = () => {
    transactionTable.innerHTML = ''; // Clear table
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>${transaction.name}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;
        transactionTable.appendChild(row);
    });
    attachDeleteHandlers();
};

// Attach delete handlers
const attachDeleteHandlers = () => {
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            transactions.splice(index, 1); // Remove transaction
            updateBalance();
            renderTransactions();
        });
    });
};

// Form submit handler
expForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (type === 'chooseOne' || name === '' || isNaN(amount) || amount <= 0) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Add transaction
    transactions.push({ type, name, amount });
    updateBalance();
    renderTransactions();

    // Clear form inputs
    expForm.reset();
});
