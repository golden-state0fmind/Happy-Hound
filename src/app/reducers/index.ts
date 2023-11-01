import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import selectSitter from './sitterReducer'

const rootReducer = combineReducers({
    service: serviceReducer, // Add more reducers as needed
    dogsitter: selectSitter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;