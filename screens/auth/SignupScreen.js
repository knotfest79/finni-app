import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { updateProfile } from "firebase/auth"; // at the top of SignupScreen.js

import { GlobalStyles } from '../../constants/style';
import { auth } from "../../Firebase/FirebaseConfig"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // ✅ Update Firebase user profile with display name
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            console.log("User registered and name saved ✅");

        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.desc}>Create an account to access all the features of Finni!</Text>

            <TextInput
                placeholder="Ex: abc@example.com"
                style={styles.input}
                placeholderTextColor={GlobalStyles.colors.textMuted}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Your name"
                style={styles.input}
                placeholderTextColor={GlobalStyles.colors.textMuted}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor={GlobalStyles.colors.textMuted}
                onChangeText={setPassword}
            />

            <Pressable style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            <Text style={styles.bottomText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
        </View>
    );
}

export default SignupScreen;

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
