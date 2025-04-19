import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expense-output/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { useTheme } from '../context/ThemeContext';
import { GlobalStyles } from '../constants/style';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchExpenses } from "../util/http";
import LoadOverlayatStart from "../components/UI/LoadOverlayatStart";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);

    const expenseContext = useContext(ExpenseContext);
    const { theme } = useTheme();
    //const [fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            const expenses = await fetchExpenses();
            setIsFetching(false);
            //setFetchedExpenses(expenses);
            expenseContext.setExpenses(expenses);
        }
        getExpenses();
    }, []);

    if (isFetching) {
        return <LoadOverlayatStart />;
    }


    const colors = GlobalStyles[theme];

    const recentExpenses = expenseContext.expenses.filter((expense) => {
        const today = new Date();
        const date7days = getDateMinusDays(today, 7);
        return expense.date > date7days;
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ExpensesOutput
                expenses={recentExpenses}
                expensesPeriod="Last 7 Days"
                textColor={colors.textPrimary}
                fallbackText="No recent expenses!"
            />
        </SafeAreaView>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
