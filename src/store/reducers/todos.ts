import { TodoState } from "../../Models/todoState.model";
import * as actions from '../types/actions';
import { TodosActionTypes } from "../types/actionTypes";
import { TodoModel } from "../../Models/todo.model";

const todosReducerIntialState: TodoState = {
    activeTodosCounter: 0,
    todos: [],
    selectedTodos: [],
    showingNow: actions.SHOW_ALL_TODOS,
    error: false,
    errorMessage: ''
};

const todosReducer = (state: TodoState = todosReducerIntialState, action: TodosActionTypes): TodoState => {
    let todoList: TodoModel[];
    let itemIndex: number;
    switch (action.type) {
        case actions.SET_TODOS:
            return {
                ...state,
                activeTodosCounter: getSelectedTodos(action.todos, actions.SHOW_ACTIVE_TODOS).length,
                todos: action.todos,
                selectedTodos: action.todos,
                showingNow: actions.SHOW_ALL_TODOS,
                error: false,
                errorMessage: ''
            };

        case actions.ADD_TODO:
            todoList = state.todos.concat(action.todo);
            return {
                ...state,
                todos: todoList,
                selectedTodos: todoList,
                showingNow: actions.SHOW_ALL_TODOS,
                activeTodosCounter: getSelectedTodos(todoList, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.SHOW_ALL_TODOS:
            return {
                ...state,
                selectedTodos: state.todos,
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(state.todos, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.SHOW_ACTIVE_TODOS:
            todoList = getSelectedTodos(state.todos, action.type);
            return {
                ...state,
                selectedTodos: todoList,
                showingNow: action.type,
                activeTodosCounter: todoList.length,
                error: false,
                errorMessage: ''
            };

        case actions.SHOW_COMPLETE_TODOS:
            return {
                ...state,
                selectedTodos: getSelectedTodos(state.todos, action.type),
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(state.todos, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.TOGGLE_TODO:
            itemIndex = state.todos.findIndex(t => t.id === action.id);
            todoList = replaceAt(state.todos, itemIndex, { ...state.todos[itemIndex], isCompleted: action.state });
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                activeTodosCounter: getSelectedTodos(todoList, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.TOGGLE_ALL_TODOS:
            todoList = state.todos.map((todo, index) => {
                return {
                    ...todo,
                    isCompleted: action.state,
                    error: false,
                    errorMessage: ''
                }
            });
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                activeTodosCounter: getSelectedTodos(todoList, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.DELETE_TODO:
            todoList = state.todos.filter(t => t.id !== action.id);
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(todoList, actions.SHOW_ACTIVE_TODOS).length,
                error: false,
                errorMessage: ''
            };

        case actions.CLEAR_COMPLETED_TODOS:
            todoList = state.todos.filter(t => !t.isCompleted);
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                showingNow: action.type,
                error: false,
                errorMessage: ''
            };

        case actions.ERROR:
            return {
                ...state,
                error: action.error,
                errorMessage: action.errorMessage
            }

        default:
            return state;
    }
};

export { todosReducer };

const replaceAt = (array: TodoModel[], index: number, value: TodoModel) => {
    const newArray = array.slice(0);
    newArray[index] = value;
    return newArray;
}

const getSelectedTodos = (todos: TodoModel[], showingNow: string) => {
    switch (showingNow) {
        case actions.SHOW_COMPLETE_TODOS:
            return todos.filter(t => t.isCompleted);

        case actions.SHOW_ACTIVE_TODOS:
            return todos.filter(t => !t.isCompleted);

        default:
            return todos;
    }
}