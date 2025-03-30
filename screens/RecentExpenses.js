import { useContext } from "react";
import ExpensesOutput from "../components/Expense-output/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";


function RecentExpenses() {

    const expenseContext = useContext(ExpenseContext);

    const recentExpenses = expenseContext.expenses.filter((expense) => {
        const today = new Date();
        const date7days = getDateMinusDays(today, 7);
        return expense.date > date7days;
    });
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Day" />
}

export default RecentExpenses;