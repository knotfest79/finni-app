import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Input({ label, style, textInputConfig = {}, onPress, isInvalid }) {
    const { value, onChangeText, editable = true, ...restConfig } = textInputConfig;

    const inputStyles = [styles.textInput];

    if (textInputConfig?.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    if (isInvalid) {
        inputStyles.push(styles.invalidInput);
    }

    const inputElement = (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={inputStyles}
                value={value}
                onChangeText={onChangeText}
                editable={editable && !onPress} // disable typing when using picker
                pointerEvents={onPress ? "none" : "auto"}
                {...restConfig}
            />
            {isInvalid && (
                <Text style={styles.errorText}>Please enter a valid {label.toLowerCase()}</Text>
            )}
        </>
    );

    return onPress ? (
        <Pressable onPress={onPress} style={[styles.inputContainer, style]}>
            {inputElement}
        </Pressable>
    ) : (
        <View style={[styles.inputContainer, style]}>{inputElement}</View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary700,
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: GlobalStyles.colors.offWhite,
        color: GlobalStyles.colors.darkGray,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidInput: {
        borderWidth: 1,
        borderColor: GlobalStyles.colors.error500,
        backgroundColor: GlobalStyles.colors.error100,
    },
    errorText: {
        color: GlobalStyles.colors.error,
        marginTop: 4,
        fontSize: 12,
    },
});
