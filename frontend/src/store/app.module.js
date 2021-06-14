export const editor = {
    namespaced: true,
    state:()=>({
        imageEditor: null
    }),
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
