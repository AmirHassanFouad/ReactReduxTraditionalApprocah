import { TodoModel } from "../../Models/todo.model";
import * as actions from "./actions";

export interface LoadTodosAction {
    type: typeof actions.SET_TODOS;
    todos: Array<TodoModel>;
}

export interface ShowAllTodosAction {
    type: typeof actions.SHOW_ALL_TODOS;
}

export interface ShowCompleteTodosAction {
    type: typeof actions.SHOW_COMPLETE_TODOS;
}

export interface ShowActiveTodosAction {
    type: typeof actions.SHOW_ACTIVE_TODOS;
}

export interface AddTodoAction {
    type: typeof actions.ADD_TODO;
    todo: TodoModel;
}

export interface DeleteTodoAction {
    type: typeof actions.DELETE_TODO;
    id: string;
}

export interface ToggleTodoAction {
    type: typeof actions.TOGGLE_TODO;
    id: string;
    state: boolean;
}

export interface ToggleAllTodosAction {
    type: typeof actions.TOGGLE_ALL_TODOS;
    state: boolean;
}


export interface ClearCompletedTodosAction {
    type: typeof actions.CLEAR_COMPLETED_TODOS;
}

export interface ErrorAction {
    type: typeof actions.ERROR;
    error: boolean;
    errorMessage: string;
}

export type TodosActionTypes =
    | LoadTodosAction
    | ShowAllTodosAction
    | ShowCompleteTodosAction
    | ShowActiveTodosAction
    | AddTodoAction
    | DeleteTodoAction
    | ToggleTodoAction
    | ToggleAllTodosAction
    | ClearCompletedTodosAction
    | ErrorAction


export type AppActionsTypes = TodosActionTypes;