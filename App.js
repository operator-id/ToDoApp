import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from './components/header';
import Task from './components/task';
import AddTask from './components/addTask';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'drink coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play doto', key: '3'},
    {text: 'drink coffee', key: '4'},
    {text: 'create an app', key: '5'},
    {text: 'play doto', key: '6'},
    {text: 'drink coffee', key: '7'},
    {text: 'create an app', key: '8'},
    {text: 'play doto', key: '9'},
  ]);
  const [pressed, isPressed] = useState(false);

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{text, key: Math.random().toString()}, ...prevTodos];
      });
    } else {
      console.log('text too short !');
    }
  };
  function deletePressHandler(key) {
    setTodos((prevTodos) => {
      isPressed(!pressed);
      return prevTodos.filter((todo) => todo.key !== key);
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {/* add todo form */}
          <AddTask submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <Task deletePressHandler={deletePressHandler} item={item} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#a7e0c9',
  },

  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  button: {
    zIndex: 1,
    backgroundColor: '#dddd22',
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  countContainer: {
    alignItems: 'center',
    padding: 40,
  },
  wrapperCustom: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    padding: 6,
  },
});
