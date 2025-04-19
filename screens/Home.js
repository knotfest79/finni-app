import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { GlobalStyles } from '../constants/style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';




function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, { flex: 1 }]}>
            <View style={styles.topSection}>
                <Image source={require('../assets/finni.png')} style={styles.logoImage} />
                <Text style={styles.welcome}>Welcome to</Text>
                <Text style={styles.brand}>Finni</Text>
                <Text style={styles.subtitle}>Build for people not Accountant</Text>
                <Text style={styles.getStarted}>Let’s Get Started…</Text>

                <Pressable style={styles.button} onPress={() => console.log('Google pressed')}>
                    <View style={styles.buttonContent}>
                        <AntDesign name="google" size={20} color={GlobalStyles.colors.textPrimary} />
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Ionicons name="mail-outline" size={20} color={GlobalStyles.colors.textPrimary} />
                    <Text style={styles.buttonText}>Continue with Email</Text>
                </Pressable>
            </View>

            <Text style={styles.loginNote}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Login
                </Text>
            </Text>
        </SafeAreaView>
    );

}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
        padding: 24,
        justifyContent: 'center',
        justifyContent: 'space-between'

    },
    logoImage: {
        width: 90,
        height: 90,
        marginBottom: 12,
        resizeMode: 'contain',



    },
    welcome: {
        fontSize: 16,
        marginTop: 8,
        color: GlobalStyles.colors.textPrimary,
        alignSelf: 'flex-start',


    },
    brand: {
        fontSize: 26,
        fontWeight: 'bold',
        color: GlobalStyles.colors.textPrimary,
        marginBottom: 6,


    },
    subtitle: {
        fontSize: 14,
        color: GlobalStyles.colors.textSecondary,
        marginBottom: 30,

    },
    getStarted: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20,
        color: GlobalStyles.colors.textPrimary,

    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.textPrimary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
        maxWidth: 300,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        color: GlobalStyles.colors.textPrimary,
        fontWeight: '500',
    },
    loginNote: {
        marginTop: 30,
        fontSize: 14,
        color: GlobalStyles.colors.textPrimary,
        textAlign: 'center',
    },
    link: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    topSection: {
        alignItems: 'flex-start',
        marginLeft: 8,
    },

});
