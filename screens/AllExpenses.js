
import { useContext } from "react";
import ExpensesOutput from "../components/Expense-output/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

function AllExpenses() {
    const expensesContext = useContext(ExpenseContext)
    return <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod="Total" />;
}

export default AllExpenses;

