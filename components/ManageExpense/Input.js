import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Input({ label, style, textInputConfig }) {
    const inputStyles = [styles.textInput];

    if (textInputConfig?.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
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

});
