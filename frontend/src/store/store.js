import Vuex from 'vuex'
import {auth} from './auth.module';

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
        },
        modules: {
            auth
        }


    })
}
export default Store