import axios from 'axios'

const api = axios.create({baseURL:"https://cars-adm-api.herokuapp.com/api"});

export default api