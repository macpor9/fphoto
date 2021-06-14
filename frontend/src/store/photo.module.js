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
            console.log(state.userFilesList)
            return state.userFilesList;
        }
    }
};