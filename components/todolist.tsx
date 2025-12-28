import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface TodoListProps {
    task: string
    priority?: string,
}

const TodoList = ({ task, priority }: TodoListProps) => {
    
    return (
        <View style={[styles.listContainer, priority == '1st' && styles.highPriority, priority == '2nd' && styles.mediumPriority]}>
            <View style={styles.main}>
                <FontAwesome name='square-o' style={styles.updateIcon} />
                <Text style={styles.todo}>{task}</Text>
            </View>
            <FontAwesome name='trash' style={styles.deleteIcon} />
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
        paddingVertical: 5
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