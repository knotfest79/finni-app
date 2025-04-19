import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GlobalStyles } from '../constants/style';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../Firebase/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { ExpenseContext } from '../store/expense-context';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
function Settings() {
    const { theme, toggleTheme } = useTheme();
    const colors = GlobalStyles[theme];

    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    const iconName = isDark ? 'sunny-outline' : 'moon-outline';
    const { resetExpenses } = useContext(ExpenseContext);

    async function handleLogout() {
        try {
            await signOut(auth);       // 🔐 Firebase logout
            resetExpenses();           // 🔄 Reset dummy data
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }


    return (


        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>


            <Text style={[styles.header, { color: colors.textPrimary }]}>Settings</Text>

            <View style={styles.item}>
                <Ionicons name={iconName} size={20} color={colors.textSecondary} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>{label}</Text>
                <Switch value={isDark} onValueChange={toggleTheme} />
            </View>

            <View style={styles.item}>
                <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>Version 1.0.0</Text>
            </View>
            <Pressable
                style={[styles.logoutButton, { borderColor: colors.textPrimary }]}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={20} color={colors.textPrimary} />
                <Text style={[styles.logoutText, { color: colors.textPrimary }]}>Logout</Text>
            </Pressable>

        </SafeAreaView >
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 12,
    },

    logoutText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },

});
