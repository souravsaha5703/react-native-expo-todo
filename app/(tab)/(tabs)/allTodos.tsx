import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TodoList from '@/components/todolist';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { fetchData } from '@/services/todo';
import { useTodo } from '@/store/store';

const AllTodos = () => {
    const router = useRouter();
    const todos = useTodo((state) => state.todos);
    const addAllTodo = useTodo((state) => state.addAllTodo);

    useEffect(() => {
        const fetchTodos = async () => {
            const responseData = await fetchData();
            if (responseData.data) {
                addAllTodo(responseData.data);
            }
        }

        fetchTodos();
    }, []);

    const handleAddTask = () => {
        router.push('/(tab)/(modals)/addTask');
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' backgroundColor='#212529' />
            <View style={styles.header}>
                <FontAwesome name='tasks' style={styles.headerIcon} />
                <Text style={styles.headerText}>All Todos</Text>
                <TouchableOpacity onPress={handleAddTask}>
                    <FontAwesome name='calendar-plus-o' style={styles.headerIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={todos}
                    renderItem={({ item }) => <TodoList id={item.id} task={item.task} priority={item.priority} completed={item.completed} />}
                />
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

export default AllTodos