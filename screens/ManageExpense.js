import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";


function ManageExpense({ route, navigation }) {

    const expensesContext = useContext(ExpenseContext);
    const expenseIdEdit = route.params?.expenseId;

    const isEditing = !!expenseIdEdit;

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
    function confirmHandler() {
        if (isEditing) {
            expensesContext.updateExpense(
                expenseIdEdit,
                {
                    description: 'Test!!',
                    amount: 19.99,
                    date: new Date('2025-03-24')
                    ,
                }
            );
        } else {
            if (expensesContext.expenses.length === 0) {
                expensesContext.resetExpenses();
            }
            expensesContext.addExpense({
                description: 'Test',
                amount: 99.99,
                date: new Date('2025-03-28'),
            });
        }
        navigation.goBack();
    }


    return <View style={styles.container}>
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    containerDeletion: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary300,
        alignItems: 'center',

    }
})