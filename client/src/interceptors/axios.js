import axios from 'axios'

axios.defaults.baseURL = process.env.URL ||'http://localhost:8081'