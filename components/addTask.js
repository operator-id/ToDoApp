import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {SendPostRequestToApi, styles as Generic} from '../App';
export function AddTaskScreen({navigation}) {
  const [name, setName] = useState('');

  const [details, setDetails] = useState('');
  const [warning, setWarning] = useState('');

  const checkInputsIfCorrect = (taskName) => {
    return taskName.length > 0;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Generic.container}>
        <TextInput
          style={styles.input}
          placeholder="Task name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Some details..."
          onChangeText={(text) => setDetails(text)}
        />
        <View styles={styles.taskGeneric}>
          <Button
            title="Add"
            style={styles.deleteButton}
            onPress={() => {
              if (checkInputsIfCorrect(name)) {
                SendPostRequestToApi(name, details);
                navigation.goBack();
              } else {
                setWarning('Please fill in task name');
              }
            }}
          />
          <Text>{warning}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
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
    borderRadius: 1,
  },
});
