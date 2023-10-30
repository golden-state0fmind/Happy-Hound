import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer'; // Import your individual reducers

const rootReducer = combineReducers({
    service: serviceReducer, // Add more reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;