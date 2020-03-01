import { TodoModel } from "./todo.model";

export interface TodoState {
    activeTodosCounter: number;
    todos: Array<TodoModel>;
    selectedTodos: Array<TodoModel>;
    showingNow: string;
    error: boolean;
    errorMessage: string
}