import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import * as NavigationBar from 'expo-navigation-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Welcome = () => {

    useEffect(() => {
        if (Platform.OS === 'android') {
            // Set the navigation bar style
            NavigationBar.setStyle('light');
        }
        AsyncStorage.getItem('hasSeenWelcome').then(seen => {
            if (seen) router.replace('/(auth)/login')
        })
    }, []);

    const onBtnPress = async () => {
        await AsyncStorage.setItem('has_seen_welcome', 'true')
        router.push('/(auth)/login');
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("@/assets/images/welcome.png")}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <StatusBar style="dark" translucent />

                <LinearGradient
                    colors={[
                        "#8e94f2",
                        "transparent",
                        "transparent",
                    ]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 140,
                    }}
                />

                <View style={styles.container}>

                    <View style={styles.card}>
                        <LinearGradient
                            colors={[
                                "rgba(255,255,255,0)",
                                "#f8f9fa",
                                "#fffffc",
                            ]}
                            locations={[0, 0.4, 1]}
                            style={StyleSheet.absoluteFill}
                        />
                        <Text style={styles.heading}>
                            TodoTasks
                        </Text>

                        <Text style={styles.description}>
                            Manage your tasks easily with TodoTasks
                        </Text>

                        <TouchableOpacity style={styles.btn} onPress={onBtnPress}>
                            <Text style={styles.btnText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    card: {
        backgroundColor: 'transparent',
        height: 300,
        width: "100%",
        overflow: "hidden",
        borderTopRightRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 20,
        gap: 5
    },
    heading: {
        fontSize: 30,
        fontWeight: 600,
        color: "#212529",
        textAlign: "center"
    },
    description: {
        fontSize: 20,
        fontWeight: 400,
        color: "#6c757d",
        textAlign: "center"
    },
    btn: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "black",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    btnText: {
        color: "#ffffff",
        fontWeight: 500,
        fontSize: 20
    }
});

export default Welcome;