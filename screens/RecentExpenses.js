import { useContext } from "react";
import ExpensesOutput from "../components/Expense-output/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { useTheme } from '../context/ThemeContext';
import { GlobalStyles } from '../constants/style';
import { View, StyleSheet } from "react-native";

function RecentExpenses() {
    const expenseContext = useContext(ExpenseContext);
    const { theme } = useTheme();
    const colors = GlobalStyles[theme];

    const recentExpenses = expenseContext.expenses.filter((expense) => {
        const today = new Date();
        const date7days = getDateMinusDays(today, 7);
        return expense.date > date7days;
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ExpensesOutput
                expenses={recentExpenses}
                expensesPeriod="Last 7 Days"
                textColor={colors.textPrimary}
                fallbackText="No recent expenses!"
            />
        </View>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
});
