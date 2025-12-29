import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Todo } from '@/utils/interfaces';
import { insertData } from '@/services/todo';
import { useTodo } from '@/store/store';

const AddTask = () => {
  const router = useRouter()

  const [task, setTask] = useState<string>('');
  const [priority, setPriority] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const addTodo = useTodo((state) => state.addTodo);

  const isDisabled = task.trim() === '';

  const onSave = async () => {
    if (isDisabled) return

    const newTask = {
      task: task,
      priority: priority,
      due_date: date,
    }

    const newData = await insertData(newTask);

    if (newData.data) {
      addTodo(newData.data[0]);
    }

    router.back();
  }

  const onCrossTap = () => {
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={onCrossTap}>
          <FontAwesome6 name='xmark' style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Task</Text>
      </View>

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

      <View style={styles.card}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={priority} onValueChange={setPriority}>
            <Picker.Item label="No priority" value={0} />
            <Picker.Item label="1st priority" value={1} />
            <Picker.Item label="2nd priority" value={2} />
          </Picker>
        </View>
      </View>

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

      <TouchableOpacity
        style={[styles.saveBtn, isDisabled && styles.disabledBtn]}
        disabled={isDisabled}
        onPress={onSave}
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

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },

  headerIcon: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
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