import { deleteData, updateData } from '@/services/todo';
import { useTodo } from '@/store/todoStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TodoListProps {
    id: string
    task: string
    priority: number
    completed: boolean
}

const TodoList = ({ id, task, priority, completed }: TodoListProps) => {
    const updateTodo = useTodo((state) => state.updateTodo);
    const deleteTodo = useTodo((state) => state.deleteTodo);

    const handleUpdateTask = async (todoId: string) => {
        const updatedData = await updateData(todoId);

        if (updatedData.data) {
            updateTodo(todoId);
        }
    }

    const handleDeleteTask = async (todoId: string) => {
        await deleteData(todoId);

        deleteTodo(todoId)
    }

    return (
        <View style={[styles.listContainer, priority == 1 && styles.highPriority, priority == 2 && styles.mediumPriority]}>
            <View style={styles.main}>
                {completed ? (
                    <FontAwesome6 name='square-check' style={styles.updateIcon} />
                ) : (
                    <FontAwesome name='square-o' style={styles.updateIcon} onPress={() => handleUpdateTask(id)} />
                )}
                <Text style={styles.todo}>{task}</Text>
            </View>
            <FontAwesome name='trash' style={styles.deleteIcon} onPress={() => handleDeleteTask(id)} />
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#e9ecef",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 10
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    updateIcon: {
        fontSize: 20,
        color: '#212529'
    },
    deleteIcon: {
        fontSize: 20,
        color: '#d62828'
    },
    todo: {
        fontSize: 15,
        color: "#212529",
        fontWeight: 600
    },
    highPriority: {
        backgroundColor: "#fcbf49"
    },
    mediumPriority: {
        backgroundColor: "#eae2b7"
    }
});

export default TodoList