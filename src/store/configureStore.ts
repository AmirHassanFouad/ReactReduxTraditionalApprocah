import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { todosReducer } from './reducers/todos';
import { AppActionsTypes } from './types/actionTypes';

export const rootReducer = combineReducers({
    todosState: todosReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActionsTypes>))