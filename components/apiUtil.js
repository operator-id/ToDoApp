/* eslint-disable prettier/prettier */
import {Component} from 'react';


export default class Api extends Component {
  constructor(props) {
    super(props);

}

static host = 'http://172.104.202.219:8080/api/v1/';

static getTasksFromApi = () => {
  return fetch(this.host + 'items')
    .then((response) => response.json())
    .then((json) => {
        console.log('Fetching tasks...');
      return json;
    })

    .catch((error) => {
      console.error(error);
    });
};
}

