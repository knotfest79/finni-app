import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GlobalStyles } from '../constants/style';
import { Ionicons } from '@expo/vector-icons';

function Settings() {
    const { theme, toggleTheme } = useTheme();
    const colors = GlobalStyles[theme];

    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    const iconName = isDark ? 'sunny-outline' : 'moon-outline';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
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
        </View>
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
});
