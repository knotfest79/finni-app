import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/style";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    let content = (
        <View style={styles.emptyContainer}>
            <Text style={styles.emoji}>😕 No content updated</Text>
            <Text style={styles.informationText}>{fallbackText}</Text>
        </View>
    );

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.offWhite,
    },
    emptyContainer: {
        marginTop: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    informationText: {
        color: GlobalStyles.colors.mediumGray,
        fontSize: 16,
        textAlign: 'center',
    },
});
