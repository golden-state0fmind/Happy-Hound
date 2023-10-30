import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Import your root reducer
import storage from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    // Add middleware, devtools, etc. as needed
    middleware: [thunk]
});

const persistor = persistStore(store)

export { store, persistor };
