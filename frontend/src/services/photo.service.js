import axios from "axios";

const API_URL = 'http://localhost:8080/api/photo/';

axios.defaults.baseURL = API_URL;
axios.defaults.headers = {
    'Access-Control-Allow-Origin': "http://localhost:8080",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
}

function upload(formData) {
    return axios.post(API_URL + 'upload', formData, {
        headers: {"Content-Type": "multipart/form-data"}
    })
}


export { upload }