import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

import { GlobalStyles } from '../../constants/style';
import { auth } from "../../Firebase/FirebaseConfig"

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful ✅');




        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.desc}>Login now to track all your expenses and income at a place!</Text>

            <TextInput
                placeholder="Ex: abc@example.com"
                style={styles.input}
                placeholderTextColor={GlobalStyles.colors.textMuted}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Your Password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor={GlobalStyles.colors.textMuted}
                onChangeText={setPassword}
            />

            <Text style={styles.link}>Forgot Password?</Text>

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Text style={styles.or}>or</Text>

            <Pressable style={styles.outlineButton}>
                <Text style={styles.outlineText}>Continue with Google</Text>
            </Pressable>

            <Text style={styles.bottomText}>
                Don’t have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Register</Text>
            </Text>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: GlobalStyles.colors.textPrimary,
    },
    desc: {
        marginBottom: 20,
        color: GlobalStyles.colors.textSecondary,
    },
    input: {
        backgroundColor: GlobalStyles.colors.card,
        padding: 14,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.lightGray,
    },
    link: {
        color: GlobalStyles.colors.primary500,
        marginBottom: 20,
        fontWeight: '600',
    },
    button: {
        backgroundColor: GlobalStyles.colors.primary500,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: GlobalStyles.colors.white,
        fontWeight: '600',
    },
    or: {
        textAlign: 'center',
        marginVertical: 8,
        color: GlobalStyles.colors.textSecondary,
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: GlobalStyles.colors.textPrimary,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    outlineText: {
        color: GlobalStyles.colors.textPrimary,
        fontWeight: '500',
    },
    bottomText: {
        textAlign: 'center',
        marginTop: 30,
        color: GlobalStyles.colors.textPrimary,
    },
});
