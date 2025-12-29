import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#212529' }}>
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
                }} />
            <Tabs.Screen
                name='allTodos'
                options={{
                    headerShown: false,
                    title: "All Todos",
                    tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="clipboard-list" color={color} />
                }} />
            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    "title": "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
                }} />
        </Tabs>
    )
}

export default TabLayout