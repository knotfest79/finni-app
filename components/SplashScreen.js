// components/SplashScreen.js
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/style';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
            <Text style={styles.text}>Loading Finni...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.background,
    },
    text: {
        marginTop: 10,
        color: GlobalStyles.colors.textPrimary,
        fontSize: 16,
    },
});
