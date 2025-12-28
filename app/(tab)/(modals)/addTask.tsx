import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const AddTask = () => {
  const router = useRouter()

  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('none')
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const isDisabled = task.trim() === '';

  const onSave = () => {
    if (isDisabled) return

    const newTask = {
      task,
      priority,
      date,
    }

    console.log(newTask) // replace with DB insert

    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Add Task</Text>

      {/* Task */}
      <View style={styles.card}>
        <Text style={styles.label}>Task</Text>
        <TextInput
          placeholder="What do you need to do?"
          placeholderTextColor="#adb5bd"
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />
      </View>

      {/* Priority */}
      <View style={styles.card}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={priority} onValueChange={setPriority}>
            <Picker.Item label="No priority" value="none" />
            <Picker.Item label="1st" value="1st" />
            <Picker.Item label="2nd" value="2nd" />
          </Picker>
        </View>
      </View>

      {/* Date */}
      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selectedDate) => {
            setShowPicker(false)
            if (selectedDate) setDate(selectedDate)
          }}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveBtn, isDisabled && styles.disabledBtn]}
        disabled={isDisabled}
        onPress={() => router.back()}
      >
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6c757d',
    marginBottom: 6,
  },

  input: {
    fontSize: 16,
    color: '#212529',
    paddingVertical: 6,
  },

  pickerWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  dateButton: {
    paddingVertical: 12,
  },

  dateText: {
    fontSize: 16,
    color: '#212529',
  },

  saveBtn: {
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: '#212529',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  disabledBtn: {
    backgroundColor: '#adb5bd',
  },

  saveText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
})

export default AddTask