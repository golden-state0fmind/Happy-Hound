import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import selectSitter from './sitterReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    service: serviceReducer, // Add more reducers as needed
    dogsitter: selectSitter,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;