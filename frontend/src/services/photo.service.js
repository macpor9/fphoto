// import axios from '@/config/axios.config';
// import axios from "axios";
import Vue from "vue";
import axios from "axios";
import {upload} from "@/services/fake";



const API_URL = 'http://localhost:8080/api/photo/';

// axios.defaults.baseURL = API_URL;
// axios.defaults.headers = {
//     'Access-Control-Allow-Origin': "http://localhost:8080",
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//     'Access-Control-Allow-Headers': 'Content-Type'
// }

class PhotoService{


    upload(formData) {
        return Vue.axios.post(API_URL + 'upload', formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }
    getUserFiles(){
        return Vue.axios
            .get(API_URL + "userPhotos")
    }
    getImageFromUrl(url){
        return axios.get(url,{responseType: "blob"})
    }
    updatePhoto(formData, id) {
        console.log(formData)
        return Vue.axios.put(API_URL + 'upload/'+id, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }


}

export default new PhotoService();