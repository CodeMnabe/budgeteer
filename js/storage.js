export const saveBudgetToStore = function (budget) {
    window.localStorage.setItem('current_budget', JSON.stringify(budget));
}

export const saveIncomeListToStore = function (amount, source) {
    let listObj = {
        _amount: amount,
        _source: source
    }

    let incomeList = JSON.parse(window.localStorage.getItem('income_list')) || [];

    incomeList.push(listObj);
    window.localStorage.setItem('income_list', JSON.stringify(incomeList));
}

export const saveExpenseListToStore = function (amount, category) {
    let listObj = {
        _amount: amount,
        _category: category
    }

    let expenseList = JSON.parse(window.localStorage.getItem('expense_list')) || [];
    expenseList.push(listObj);

    window.localStorage.setItem('expense_list', JSON.stringify(expenseList));
}

export const getFromStore = function () {
    const getBudget = window.localStorage.getItem('current_budget');
    const getIncomeList = JSON.parse(window.localStorage.getItem('income_list'));
    const getExpenseList = JSON.parse(window.localStorage.getItem('expense_list'));

    return {
        _current_budget: getBudget,
        _income_list: getIncomeList,
        _expense_list: getExpenseList
    }
}