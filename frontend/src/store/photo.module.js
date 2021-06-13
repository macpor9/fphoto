import PhotoService from "../services/photo.service";


export const photo = {
    namespaced: true,
    state: {
        popupState: false
    },
    mutations: {
        setPopupVisibility(state,visable) {
            state.popupState = visable;
        },

    },
    getters: {
        popupState: state => {
            return state.popupState;
        }
    },
    actions: {
        uploadImage( event){
            let data = new FormData();
            data.append('name','my-picture');
            data.append('file',event.target.files[0]);
            console.log(data.get(name));
            return PhotoService.upload(data.get(name))
        }
    }
};