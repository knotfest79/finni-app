import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
// import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadOverlayatStart from "../components/UI/LoadOverlayatStart";



function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesContext = useContext(ExpenseContext);

    const expenseIdEdit = route.params?.expenseId;

    const isEditing = !!expenseIdEdit;

    const selectedExpense = expensesContext.expenses.find(expense => expense.id === expenseIdEdit);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        await deleteExpense(expenseIdEdit);

        expensesContext.deleteExpense(expenseIdEdit);
        navigation.goBack();


    }

    function cancelHandler() {
        navigation.goBack();
    }


    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        if (isEditing) {
            expensesContext.updateExpense(
                expenseIdEdit,
                expenseData,
            );
            await updateExpense(expenseIdEdit, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            if (expensesContext.expenses.length === 0) {
                // expensesContext.resetExpenses();
            }
            expensesContext.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack();
    }

    if (isSubmitting) {
        return <LoadOverlayatStart />
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