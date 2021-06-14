import PhotoService from "../services/photo.service";

export const photo = {
    namespaced: true,
    state: {
        popupState: false,
        userFilesList: [],
        actualPhoto: null,
        photoId: null
    },
    mutations: {
        setPopupVisibility(state,visable) {
            state.popupState = visable;
        },
        addFileToList(state, file){
            state.userFilesList.push(file);
        },
        setFileList(state,fileList){
            state.userFilesList = fileList;
        },
        setActualPhoto(state, photo){
            state.actualPhoto = photo
        },
        setPhotoId(state, id){
            state.photoId = id
        }



    },
    getters: {
        popupState: state => {
            return state.popupState;
        },
        userFilesList: state => {
            return state.userFilesList;
        },
        actualPhoto: state => {
          return state.actualPhoto;
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