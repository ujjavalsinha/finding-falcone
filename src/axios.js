import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://findfalcone.herokuapp.com/',
    headers: {'Accept': 'application/json'}
  });

export default instance;