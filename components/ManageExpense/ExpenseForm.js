import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";

import Button from "../UI/Button";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curr) => {
            return {
                ...curr,
                [inputIdentifier]: enteredValue
            };
        });
    }

    function SubmitHandler() {
        const { amount, date, description } = inputValues;

        //  Check empty values
        if (!amount || !date || !description) {
            alert('Please fill in all fields');
            return;
        }

        // Parse DD-MM-YYYY
        const [day, month, year] = date.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}`);

        if (isNaN(parsedDate.getTime())) {
            alert('Invalid date. Please use format: DD-MM-YYYY');
            return;
        }

        const expenseData = {
            amount: parseFloat(amount),
            date: parsedDate,
            description: description,
        };

        onSubmit(expenseData);
    }



    return (
        <View style={styles.form}>
            <Text style={styles.textContainer}>Your Expense Summary 💰</Text>

            <View style={styles.inputRowContainer}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        placeholder: "Enter Amount",
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    textInputConfig={{
                        placeholder: "DD-MM-YYYY",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date,
                    }}
                />
            </View>

            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    numberOfLines: 4,
                    placeholder: "Enter description",
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValues.description,
                }}
            />

            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={SubmitHandler}>{submitButtonLabel}</Button>

            </View>
        </View>
    );
}

export default ExpenseForm;


const styles = StyleSheet.create({
    form: {
        marginTop: 20,
    },
    inputRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    textContainer: {
        color: GlobalStyles.colors.primary500,
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',

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
})