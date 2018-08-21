import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a7e2c.firebaseio.com/'
});

export default instance