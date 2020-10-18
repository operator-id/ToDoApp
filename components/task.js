import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

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

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          item.id === getIndex() ? setIndex(null) : setIndex(item.id)
        }>
        <View style={styles.taskGeneric}>
          <CheckBox
            value={item.done}
            onValueChange={(newValue) =>
              handleModify(item.id, item.name, item.details, newValue)
            }
          />
          <Text>{item.name}</Text>
        </View>
        {getIndex() === item.id && (
          <View>
            <TouchableOpacity>
              <View>
                <Text style={styles.details}>{item.details}</Text>
                <Text style={styles.details}>{item.date}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeletePress()}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
