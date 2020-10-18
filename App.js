import React, {useState, useEffect} from 'react';
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
  // id, name, details, date, done
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:9876/api/v1/items')
      .then((response) => response.json())
      .then((json) => setTodos(json))
      .catch((error) => console.error(error));
      console.log(todos);
  }, []);

  const getTasksFromApiAsync = async () => {
    try {
      let response = await fetch('http://10.0.2.2:9876/api/v1/items');
      let json = await response.json();
      console.log(json);
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

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
              keyExtractor={({id}, index) => id}
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
