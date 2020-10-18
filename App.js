/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './components/header';
import Task from './components/task';
import AddTask from './components/addTask';

const Stack = createStackNavigator();

export default function App() {
  // id, name, details, date, done
  let host = '';
  const isConnected = true;
  if (isConnected) {
    host = 'http://172.104.202.219:8080/api/v1/';
  } else {
    host = 'http://10.0.2.2:8080/api/v1/';
  }

  const [todos, setTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const setIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };
  const getIndex = () => {
    return currentIndex;
  };

  useEffect(() => {
    getTasksFromApi();
  }, []);

  const getTasksFromApi = async () => {
    try {
      let response = await fetch(host + 'items');
      let json = await response.json();
      setTodos(json);
    } catch (error) {
      console.error(error);
    }
  };

  const sendPostRequestToApi = async (nameValue, detailsValue) => {
    try {
      await fetch(host + 'item', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          details: detailsValue,
          date: checkTime(),
        }),
      });
    } catch (error) {
      console.error();
    }
  };
  const sendModifyRequestToApi = async (
    id,
    taskName,
    taskDetails,
    taskDone,
  ) => {
    try {
      await fetch(host + 'item/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: taskName,
          details: taskDetails,
          done: taskDone,
        }),
      });

      console.log('attempt to modify task with id ' + id + ' ...');
      console.log(
        'new values: ' + taskName + ' ' + taskDetails + ' ' + taskDone,
      );
    } catch (error) {
      console.error();
    }
  };
  const sendDeleteRequestToApi = async (id) => {
    try {
      await fetch(host + 'item/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('attempt to delete task with id ' + id + ' ...');
    } catch (error) {
      console.error();
    }
  };

  const submitHandler = (taskName, taskDetails) => {
    if (taskName.length > 3) {
      sendPostRequestToApi(taskName, taskDetails);

      getTasksFromApi();
    } else {
      console.log('text too short !');
    }
  };
  function deletePressHandler(key) {
    sendDeleteRequestToApi(key);
    getTasksFromApi();
  }
  const handleModify = (id, name, description, done) => {
    sendModifyRequestToApi(id, name, description, done);
    getTasksFromApi();
  };

  const checkTime = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    return (
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    );
  };

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTask submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                data={todos}
                keyExtractor={({id}, index) => id.toString()}
                renderItem={({item}) => (
                  <Task
                    deletePressHandler={deletePressHandler}
                    item={item}
                    getIndex={getIndex}
                    setIndex={setIndex}
                    handleModify={handleModify}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
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
