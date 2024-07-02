import {
    saveBudgetToStore,
    saveIncomeListToStore,
    saveExpenseListToStore,
    getFromStore,
} from "./storage.js";

document.addEventListener("DOMContentLoaded", (event) => {
    let currentBalance = 0;

    const updateBalance = (newBalance) => {
        parseFloat(newBalance);
        currentBalance += newBalance;

        document.getElementById("balance").innerText = `$${currentBalance.toFixed(
            2
        )}`;
        saveBudgetToStore(parseFloat(currentBalance));
    };

    const addIncome = () => {
        const incomeAmount = document.getElementById("incomeAmount").value;
        const incomeSource = document.querySelector('input[name="source"]').value;
        if (incomeAmount) {
            const parsedIncome = parseFloat(incomeAmount);
            updateBalance(parsedIncome);
            addIncomeList(parsedIncome, incomeSource, false);
            addTransactionToTable(incomeSource, "INCOME", parsedIncome);
            document.getElementById("incomeAmount").value = "";
            document.querySelector('input[name="source"]').value = "";
        }
    };

    const addIncomeList = (amount, source, ifStorage) => {
        const incomeList = document.querySelector(".list-income");
        const newIncomeItem = document.createElement("li");
        newIncomeItem.textContent = `+  $${amount.toFixed(2)} ${source}`;
        incomeList.appendChild(newIncomeItem);
        if (ifStorage) {
            return;
        } else {
            saveIncomeListToStore(amount, source);
        }
    };

    const addExpense = () => {
        const expenseAmount = document.getElementById("expenseAmount").value;
        const expenseCategory = document.querySelector(
            'input[name="category"]'
        ).value;
        if (expenseAmount) {
            const parsedExpense = parseFloat(expenseAmount);
            updateBalance(-parsedExpense);
            addExpenseList(parsedExpense, expenseCategory, false);
            addTransactionToTable(expenseCategory, "EXPENSE", parsedExpense);
            document.getElementById("expenseAmount").value = "";
            document.querySelector('input[name="category"]').value = "";
        }
    };

    const addExpenseList = (amount, source, ifStorage) => {
        const expenseList = document.querySelector(".list-expense");
        const newExpenseItem = document.createElement("li");
        newExpenseItem.textContent = `- $${amount.toFixed(2)} ${source}`;
        expenseList.appendChild(newExpenseItem);
        if (ifStorage) {
            return;
        } else {
            saveExpenseListToStore(amount, source);
        }
    };

    const addTransactionToTable = (source, type, amount) => {
        const transactionTable = document.getElementById("table");

        if (!transactionTable) {
            console.log("Transaction table not found!");
            return;
        }

        const newTransactionRow = document.createElement("tr");

        const sourceCell = document.createElement("td");
        sourceCell.textContent = source;
        newTransactionRow.appendChild(sourceCell);

        const typeCell = document.createElement("td");
        typeCell.textContent = type;
        newTransactionRow.appendChild(typeCell);

        const amountCell = document.createElement("td");
        if (type === "INCOME") {
            amountCell.textContent = "+ $" + amount;
        } else {
            amountCell.textContent = "- $" + amount;
        }
        newTransactionRow.appendChild(amountCell);

        transactionTable.appendChild(newTransactionRow);
    };

    if ("current_budget" in window.localStorage) {
        console.log("This is happening");
        let objs = getFromStore();

        let storageBudget = parseFloat(objs._current_budget);
        updateBalance(storageBudget);

        if (objs._income_list) {
            for (let i = 0; i < objs._income_list.length; i++) {
                addIncomeList(
                    objs._income_list[i]._amount,
                    objs._income_list[i]._source,
                    true
                );

                addTransactionToTable(
                    objs._income_list[i]._source,
                    "INCOME",
                    objs._income_list[i]._amount
                );
            }
        }
        if (objs._expense_list) {
            for (let i = 0; i < objs._expense_list.length; i++) {
                addExpenseList(
                    objs._expense_list[i]._amount,
                    objs._expense_list[i]._category,
                    true
                );

                addTransactionToTable(
                    objs._expense_list[i]._category,
                    "EXPENSE",
                    objs._expense_list[i]._amount
                );
            }
        }
    } else {
        console.log("No local storage found");
        let initialBalance = 1000;
        updateBalance(parseFloat(initialBalance));
        addIncomeList(parseFloat(initialBalance), "Salary", false);
        addTransactionToTable("Salary", "INCOME", parseFloat(initialBalance));
    }

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    }

    window.addIncome = addIncome;
    window.addExpense = addExpense;
    window.addIncomeList = addIncomeList;
    window.addExpenseList = addExpenseList;
    window.toggleDarkMode = toggleDarkMode;
});
