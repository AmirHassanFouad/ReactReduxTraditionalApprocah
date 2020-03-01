import * as actions from '../types/actions';
import axios from 'axios';
import { TodoModel } from '../../Models/todo.model';
import { TodosActionTypes } from '../types/actionTypes';
import { Dispatch } from 'redux';


const url = 'http://localhost:3000/todos';

export const loadTodos = () => {
    return (dispatch: Dispatch<TodosActionTypes>) => {
        axios.get(url)
            .then(response => {
                dispatch(SetTodos(response.data));
            }).catch(error => {
                dispatch(ChangeErrorState(true, 'Something went wrong while retrieving todos list'))
            });
    }
};

export const addTodo = (todo: TodoModel) => {
    return (dispatch: Dispatch<TodosActionTypes>) => {
        axios.post(url, todo)
            .then(response => {
                dispatch(AddTodo(todo));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while adding "${todo.title}" todo item`));
            });
    }
};

export const deleteTodo = (id: string) => {
    return (dispatch: Dispatch<TodosActionTypes>) => {
        axios.delete(`${url}/${id}`)
            .then(response => {
                dispatch(DeleteTodo(id));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while delete todo item with id ${id}`));
            });
    }
};

export function deleteCompletedTodos(ids: string[]) {
    return (dispatch: Dispatch<TodosActionTypes>) => {
        for (let id of ids) {
            axios.delete(`${url}/${id}`)
                .then(response => {
                    dispatch(DeleteTodo(id));
                }).catch(error => {
                    dispatch(ChangeErrorState(true, `Something went wrong while delete todo item with id ${id}`));
                });
        }
    }
};

export const toggleTodo = (id: string, state: boolean) => {
    return async (dispatch: Dispatch<TodosActionTypes>) => {
        await axios.patch(`${url}/${id}`, { isCompleted: state })
            .then(response => {
                dispatch(ToggleTodo(id, state));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while changing the state of todo item with id ${id} to ${state ? "Completed" : "Active"}`));
            });
    }
};

export const toggleAllTodos = (ids: string[], state: boolean) => {
    return async (dispatch: Dispatch<TodosActionTypes>) => {
        await Promise.all(ids.map(id =>
            axios.patch(`${url}/${id}`, { isCompleted: state })
        )).then(response => {
            dispatch(ToggleAllTodos(state));
        }).catch(error => {
            dispatch(ChangeErrorState(true, `Something went wrong while changing the state of todo items to ${state ? "Completed" : "Active"}`));
        });
    }
};

export const SetTodos = (todos: Array<TodoModel>): TodosActionTypes => {
    return {
        type: actions.SET_TODOS,
        todos: todos
    };
};

export const AddTodo = (todoItem: TodoModel): TodosActionTypes => {
    return {
        type: actions.ADD_TODO,
        todo: todoItem
    }
};

export const DeleteTodo = (selectedId: string): TodosActionTypes => {
    return {
        type: actions.DELETE_TODO,
        id: selectedId
    }
};

export const ShowAllTodos = (): TodosActionTypes => {
    return {
        type: actions.SHOW_ALL_TODOS
    }
};

export const ShowCompleteTodos = (): TodosActionTypes => {
    return {
        type: actions.SHOW_COMPLETE_TODOS
    }
};

export const ShowActiveTodos = (): TodosActionTypes => {
    return {
        type: actions.SHOW_ACTIVE_TODOS
    }
};

export const ToggleTodo = (selectedId: string, state: boolean): TodosActionTypes => {
    return {
        type: actions.TOGGLE_TODO,
        id: selectedId,
        state: state
    }
};

export const ToggleAllTodos = (state: boolean): TodosActionTypes => {
    return {
        type: actions.TOGGLE_ALL_TODOS,
        state: state
    }
};

export const clearCompletedTodos = (): TodosActionTypes => {
    return {
        type: actions.CLEAR_COMPLETED_TODOS,
    }
};

export const ChangeErrorState = (error: boolean, message: string = ''): TodosActionTypes => {
    return {
        type: actions.ERROR,
        error: error,
        errorMessage: message
    }
};