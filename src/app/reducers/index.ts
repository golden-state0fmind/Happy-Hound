import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import selectSitter from './sitterReducer';
import userReducer from './userReducer';
import dogReducer from './dogReducer';
import dogListReducer from './dogListReducer';
import dogSitterListReducer from './dogSitterListReducer';

const rootReducer = combineReducers({
    service: serviceReducer, // Add more reducers as needed
    dogsitter: selectSitter,
    user: userReducer,
    dog: dogReducer,
    dogList: dogListReducer,
    dogSitterList: dogSitterListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;