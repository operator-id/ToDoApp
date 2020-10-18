/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Borodin TO-DO V 0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingTop: 10,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  small: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
  },
});
