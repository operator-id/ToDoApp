import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function Task({deletePressHandler, item}) {
  const [count, setCount] = useState(0);
  const onTaskPress = () => {
    setCount((prevCount) => prevCount + 1);
    console.log('in task ' + item.key);
    deletePressHandler(item.key);
  };

  return (
    <TouchableOpacity onPress={onTaskPress}>
      <View>
        <Text style={styles.item}>{item.text}</Text>
        <Text>Done:{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#21b',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
});
