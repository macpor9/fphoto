import axios from 'axios';

const API_URL = 'http://localhost:8080/api/photo/';

axios.defaults.baseURL = API_URL;

class PhotoService{
    // upload(data){
    //     return axios.post(API_URL+'upload',{
    //         data
    //     })
    // }

    upload(formData) {
        const url = `${API_URL}` + 'upload';
        return axios.post(url, formData)
            .then(x => x.data)
            .then(x => x.map(img => Object.assign({},
                img, { url: `${API_URL}/images/${img.id}` })));
    }

}

export default new PhotoService();