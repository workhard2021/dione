import {createStore,combineReducers} from 'redux';
import reducerUser from './reducer-user';
import reducerPost from './reducer-post';
const store=createStore(combineReducers({reducerPost,reducerUser}))
export default store
