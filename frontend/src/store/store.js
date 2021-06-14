import Vuex from 'vuex'
import {auth} from './auth.module';
import {photo} from "@/store/photo.module";
import {editor} from "@/store/app.module";

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
            auth,
            photo,
            editor
        }
    })
}
export default Store