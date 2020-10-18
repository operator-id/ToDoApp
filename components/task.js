import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {HomeScreen} from '../App';

export function TaskScreen({navigation, route}) {
  const isFocused = useIsFocused();
  let item = route.params.item;
  console.log('showing modify screen for item with id: ' + item.id);
  return (
    <View>
      <Text style={{color: isFocused ? 'green' : 'black'}}>SettingsScreen</Text>
      <TouchableOpacity>
        <View>
          <Text>{item.name}</Text>
          <Text style={styles.details}>{item.details}</Text>
          <Text style={styles.details}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          HomeScreen.handleDelete(item.id);
          navigation.goBack();
        }}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function Task({
  deletePressHandler,
  item,
  getIndex,
  setIndex,
  handleModify,
}) {
  const onDeletePress = () => {
    console.log('in task ' + item.id);
    deletePressHandler(item.id);
  };
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Edit task', {item})}>
        <View style={styles.taskGeneric}>
          <CheckBox
            value={item.done}
            onValueChange={(newValue) =>
              handleModify(item.id, item.name, item.details, newValue)
            }
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskGeneric: {
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b22f',
  },
});
