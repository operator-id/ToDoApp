import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {styles as InputStyles} from './addTask';
import {
  styles as Generic,
  SendModifyRequestToApi,
  SendDeleteRequestToApi,
} from '../App';

export function TaskScreen({navigation, route}) {
  let item = route.params.item;

  console.log('showing modify screen for item with id: ' + item.id);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Generic.container}>
        <TextInput
          style={InputStyles.input}
          defaultValue={item.name}
          onChangeText={(text) => (item.name = text)}
        />
        <TextInput
          style={InputStyles.input}
          multiline={true}
          defaultValue={item.details}
          onChangeText={(text) => (item.details = text)}
        />
        <View styles={styles.taskGeneric}>
          <Button
            title="Save"
            style={styles.deleteButton}
            onPress={() => {
              SendModifyRequestToApi(item);
            }}
          />
          <Button
            title="Delete"
            style={styles.deleteButton}
            onPress={() => {
              SendDeleteRequestToApi(item.id);

              navigation.navigate('All tasks', {item});
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default function Task({item, submitHandler}) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Edit task', {item})}>
        <View style={styles.taskGeneric}>
          <CheckBox
            value={item.done}
            onValueChange={(newValue) => {
              item.done = newValue;
              submitHandler(item);
            }}
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskGeneric: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#21b',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  details: {
    marginTop: 2,
    backgroundColor: '#f1d7a5',
  },
  deleteButton: {
    justifyContent: 'center',
    backgroundColor: '#b22f',
  },
});
