import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export const persistor = persistStore(store);

// export default { store, persistor };
