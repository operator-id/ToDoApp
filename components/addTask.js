import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default function AddTask({submitHandler}) {
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

  const addTaskPressed = () => {
    submitHandler(taskName, taskDetails);
    Keyboard.dismiss();
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new task ..."
        onChangeText={(text) => setTaskName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="task details"
        onChangeText={(text) => setTaskDetails(text)}
      />
      <View>
        <Button
          style={styles.item}
          onPress={() => addTaskPressed()}
          title="Add task"
        />
      </View>
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
    zIndex: 1,
    padding: 16,
    marginTop: 16,
    borderColor: '#21b',
    borderWidth: 1,
    borderRadius: 1,
  },
});
