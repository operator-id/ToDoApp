import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function AddTask({submitHandler}) {
  const [taskText, setTaskText] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        setTaskText={(text) => setTaskText(text)}
        taskText={taskText}
      />
      <TouchableOpacity
        style={styles.item}
        onPress={console.log('Pressed submit with text' + taskText)}
        title="add todo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#21b',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
});
