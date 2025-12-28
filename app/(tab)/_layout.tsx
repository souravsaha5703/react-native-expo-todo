import { Stack, Tabs } from 'expo-router'

function TabRoot() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            {/* Bottom Tabs */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Modal */}
            <Stack.Screen
                name="(modals)/addTask"
                options={{
                    presentation: 'modal',
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    gestureEnabled: true,
                }}
            />

        </Stack>
    )
}

export default TabRoot