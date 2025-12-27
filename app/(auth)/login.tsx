import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { signInWithEmail } from '@/services/auth';

interface UserCredentials {
    email: string,
    password: string
}

const Login = () => {
    const [credentials, setCredentials] = useState<UserCredentials>({
        email: '',
        password: ''
    });
    const isDisabled = credentials.email == '' || credentials.password == '';
    const onBtnPress = async () => {
        if (credentials.email != '' || credentials.password != '') {
            await signInWithEmail(credentials.email, credentials.password);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <FontAwesome name='calendar-check-o' style={styles.icon} />
            <Text style={styles.heading}>Sign in to continue</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.textLabel}>Email</Text>
                <TextInput
                    keyboardType='email-address'
                    placeholder='Enter your email address'
                    autoComplete='off'
                    style={styles.input}
                    value={credentials.email}
                    onChangeText={text => setCredentials(prev => ({ ...prev, email: text }))}
                />
                <Text style={styles.textLabel}>Password</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Enter your password'
                    autoComplete='off'
                    style={styles.input}
                    value={credentials.password}
                    onChangeText={text => setCredentials(prev => ({ ...prev, password: text }))}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.btn, isDisabled && styles.disabledBtn]} onPress={onBtnPress} disabled={isDisabled}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text>Don't have an account? <Link href={'/(auth)/register'} style={styles.signupText}>Sign up</Link></Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#f8f9fa"
    },
    icon: {
        fontSize: 40,
        color: "#212529"
    },
    heading: {
        fontSize: 20,
        fontWeight: 600,
        color: "#495057",
        textAlign: "center"
    },
    inputContainer: {
        width: "100%",
        gap: 5
    },
    textLabel: {
        fontWeight: 500,
        color: "#212529"
    },
    input: {
        borderColor: "#212529",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        width: "100%"
    },
    btn: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "black",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "#ffffff",
        fontWeight: 500,
        fontSize: 20
    },
    disabledBtn: {
        backgroundColor: "#dee2e6"
    },
    forgotText: {
        fontSize: 15,
        fontWeight: 500,
        color: "#343a40"
    },
    signupText: {
        color: '#212529',
        fontWeight: 600,
        textDecorationLine: 'underline'
    }
});

export default Login;