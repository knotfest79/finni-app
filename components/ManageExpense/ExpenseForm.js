import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import { getFormattedDate, normalizeDateInput } from "../../util/date";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Platform } from "react-native";
import Button from "../UI/Button";
import { SafeAreaView } from "react-native-safe-area-context";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

    const [inputValues, setInputValues] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        const normalized =
            inputIdentifier === 'date' ? normalizeDateInput(enteredValue) : enteredValue;

        setInputValues((curr) => {
            return {
                ...curr,
                [inputIdentifier]: { value: normalized, isValid: true },
            };
        });
    }



    function SubmitHandler() {
        const amount = inputValues.amount.value;
        const rawdate = inputValues.date.value;
        const description = inputValues.description.value;


        const date = rawdate;

        if (!amount || !date || !description) {
            setInputValues((curr) => ({
                amount: { value: curr.amount.value, isValid: amountIsValid },
                description: { value: curr.description.value, isValid: descriptionIsValid },
                date: { value: curr.date.value, isValid: dateIsValid && !isNaN(parsedDate.getTime()) },
            }));

            return;
        }

        const amountIsValid = !isNaN(amount) && parseFloat(amount) > 0;
        const descriptionIsValid = description.trim().length > 0;
        const dateIsValid = /^\d{2}-\d{2}-\d{4}$/.test(date);

        const [day, month, year] = date.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}`);

        if (!amountIsValid || !descriptionIsValid || !dateIsValid || isNaN(parsedDate.getTime())) {
            setInputValues((curr) => ({
                amount: { value: curr.amount.value, isValid: amountIsValid },
                description: { value: curr.description.value, isValid: descriptionIsValid },
                date: { value: curr.date.value, isValid: dateIsValid && !isNaN(parsedDate.getTime()) },
            }));
            return;
        }

        const expenseData = {
            amount: parseFloat(amount),
            date: parsedDate,
            description: description.trim(),
        };

        onSubmit(expenseData);
    }

    function handleDateFieldPress() {
        setShowDatePicker((prev) => !prev);
    }

    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleDateChange(event, selectedDate) {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            const formatted = getFormattedDate(selectedDate); // returns DD-MM-YYYY
            setInputValues((curr) => ({
                ...curr,
                date: { value: formatted, isValid: true },
            }));
            console.log('Selected Date:', formatted);
        }
    }







    return (
        <SafeAreaView style={styles.form}>
            <Text style={styles.textContainer}>Your Expense Summary 💰</Text>

            <View style={styles.inputRowContainer}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    isInvalid={!inputValues.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        placeholder: "Enter Amount",
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    isInvalid={!inputValues.date.isValid}
                    textInputConfig={{
                        placeholder: "DD-MM-YYYY",
                        value: inputValues.date.value,
                        editable: true,
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                    }}
                    onPress={handleDateFieldPress}
                />




            </View>

            <Input
                label="Description"
                isInvalid={!inputValues.description.isValid}
                textInputConfig={{
                    multiline: true,
                    numberOfLines: 4,
                    placeholder: "Enter description",
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputValues.description.value,
                }}
            />

            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={SubmitHandler}>{submitButtonLabel}</Button>


            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={
                        typeof inputValues.date?.value === 'string' && inputValues.date.value.includes('-')
                            ? new Date(inputValues.date.value.split('-').reverse().join('-'))
                            : new Date()
                    }

                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} // ✅ fixed here
                    onChange={handleDateChange}
                />
            )}

        </SafeAreaView>
    );
}

export default ExpenseForm;


const styles = StyleSheet.create({
    form: {
        marginTop: 20,
        paddingBottom: 120,
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