import { useContext } from "react";
import ExpensesOutput from "../components/Expense-output/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { useTheme } from '../context/ThemeContext';
import { GlobalStyles } from '../constants/style';
import { View, StyleSheet } from "react-native";

function AllExpenses() {
    const expensesContext = useContext(ExpenseContext);
    const { theme } = useTheme();
    const colors = GlobalStyles[theme];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ExpensesOutput
                expenses={expensesContext.expenses}
                expensesPeriod="Total"
                textColor={colors.textPrimary}
                fallbackText="No expenses added yet!"
            />
        </View>
    );
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
});
