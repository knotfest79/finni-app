import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../util/date";

import { useNavigation } from "@react-navigation/native";


function ExpenseItem({ id, description, amount, date }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>
                        {typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : '0.00'}
                    </Text>


                </View>
            </View>
        </Pressable>
    );
}


export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.mediumGray,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,

    },
    textBase: {
        color: GlobalStyles.colors.textPrimary,
    },

    description: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: 'bold',
    },

    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,

    },

    amount: {
        color: GlobalStyles.colors.textPrimary,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    }
})