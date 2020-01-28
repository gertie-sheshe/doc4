import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import documentReducer from './documents/documents.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  documents: documentReducer,
});

export default rootReducer;
