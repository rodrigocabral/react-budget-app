import React, { useContext, useState } from "react";

const BudgetsContext = React.createContext();

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudget] = useState([]);
    const [expenses, setExpense] = useState([]);

    function getBudgetExpenses() {

    }

    function addExpense() {

    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,

        }}>
            { children }
        </BudgetsContext.Provider>
    );
};