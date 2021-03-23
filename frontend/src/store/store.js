import Vuex from 'vuex'

const Store = () => {
    return new Vuex.Store({
        state: {
            menuType: null
        },
        mutations: {
            setMenuType(state,type){
                state.menuType=type;
            }
        },
        getters: {
            menuType: state => {
                return state.menuType
            }
        }

    })
}
export default Store