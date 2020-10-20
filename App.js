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
  Button,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './components/header';
import Task from './components/task';
import AddTask from './components/addTask';
import {TaskScreen} from './components/task';
import {AddTaskScreen} from './components/addTask';

const Stack = createStackNavigator();
const host =  'http://172.104.202.219:8080/api/v1/';

export const SendDeleteRequestToApi = async (id) => {
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
  export const SendPostRequestToApi = async (nameValue, detailsValue) => {
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
            date: GetTime(),
          }),
        });
      } catch (error) {
        console.error();
      }
    };
  export const SendModifyRequestToApi = async (
item
    ) => {
      try {
        await fetch(host + 'item/' + item.id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: item.name,
            details: item.details,
            done: item.done,
          }),
        });

        console.log('attempt to modify task with id ' + item.id + ' ...');
      } catch (error) {
        console.error();
      }
    };
  const GetTime = () => {
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

export function HomeScreen({navigation}){
  // id, name, details, date, done

  const [todos, setTodos] = useState([]);
  const fetchTasks = async () =>{
          try  {
        let response = await fetch(host + 'items');
        let json = await response.json();
        console.log('fetching tasks...');
        setTodos(json);
      } catch (error) {
        console.error(error);
      }}
  useEffect(() => {
      fetchTasks();
  }, []);

  // const submitHandler = (item) => {
  //     setTodos(prevTodos => {
  //       return [
  //         { },
  //         ...prevTodos
  //       ];
  //     });
  //   }
  //   }


    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Button
              onPress={() => navigation.navigate('Add task')}
              title="New task"
            />
            <View style={styles.list}></View>
            <FlatList
              data={todos}
              keyExtractor={({id}, index) => id.toString()}
              renderItem={({item}) => <Task item={item} />}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="All tasks" component={HomeScreen} />
        <Stack.Screen name="Edit task" component={TaskScreen} />
        <Stack.Screen name="Add task" component={AddTaskScreen} />
      </Stack.Navigator>
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
