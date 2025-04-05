import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";


function ManageExpense({ route, navigation }) {

    const expensesContext = useContext(ExpenseContext);

    const expenseIdEdit = route.params?.expenseId;

    const isEditing = !!expenseIdEdit;

    const selectedExpense = expensesContext.expenses.find(expense => expense.id === expenseIdEdit);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesContext.deleteExpense(expenseIdEdit);
        navigation.goBack();


    }

    function cancelHandler() {
        navigation.goBack();
    }
    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesContext.updateExpense(
                expenseIdEdit,
                expenseData,
            );
        } else {
            if (expensesContext.expenses.length === 0) {
                expensesContext.resetExpenses();
            }
            expensesContext.addExpense(expenseData);
        }
        navigation.goBack();
    }


    return <View style={styles.container}>

        <ExpenseForm submitButtonLabel={
            isEditing ? 'Update' : 'Add'}
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
        />

        <View style={styles.containerDeletion}>
            {isEditing && <IconButton icon="trash" color={GlobalStyles.colors.error} size={36}
                onPress={deleteExpenseHandler} />}
        </View>
    </View>
}


export default ManageExpense;

const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.white,
    },


    containerDeletion: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary300,
        alignItems: 'center',

    }
})