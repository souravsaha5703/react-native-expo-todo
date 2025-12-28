import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TodoList from '@/components/todolist';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const Home = () => {
    const router = useRouter();
    const handleAddTask = () => {
        router.push('/(tab)/(modals)/addTask');
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor='#212529' />
            <View style={styles.header}>
                <FontAwesome name='tasks' style={styles.headerIcon} />
                <Text style={styles.headerText}>Today</Text>
                <TouchableOpacity onPress={handleAddTask}>
                    <FontAwesome name='calendar-plus-o' style={styles.headerIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <TodoList task='help parents' priority='1st' />
                <TodoList task='programming' priority='2nd' />
                <TodoList task='morning walk' />
                <TodoList task='playing games' priority='1st' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "#212529",
        width: "100%",
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    headerIcon: {
        color: '#f8f9fa',
        fontSize: 30,
    },
    headerText: {
        color: '#f8f9fa',
        fontWeight: 800,
        fontSize: 30,
        textAlign: "center"
    },
    listContainer: {
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10
    }
});

export default Home