export const editor = {
    namespaced: true,
    state:()=>({
        imageEditor: null
    }),
    getters: {
        getImageEditor(state){
            return state.imageEditor
        }
    },
    mutations: {
        setImageEditor(state, value){
            state.imageEditor = value
        },
        undo(state){
            state.imageEditor.undo()
        },
        redo(state){
            state.imageEditor.redo()
        }
    },
    actions: {}

}
