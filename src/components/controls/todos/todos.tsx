import React, { useEffect } from 'react';

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionsTypes } from '../../../store/types/actionTypes';
import { bindActionCreators } from 'redux';
import {
  loadTodos, ShowCompleteTodos, ShowActiveTodos, deleteTodo, deleteCompletedTodos,
  toggleTodo, ShowAllTodos, addTodo, toggleAllTodos, ChangeErrorState
} from '../../../store/actions/todos';
import { connect } from 'react-redux';
import { TodoState } from '../../../Models/todoState.model';
import { TodoModel } from '../../../Models/todo.model';
import { TodoBody } from '../Todo-body/todo-body';
import { v4 as uuidv4 } from 'uuid';
import { TodoFooter } from '../todo-footer/todo.-footer';
import { SnackBar } from '../../UI/snackbar/snackBar';
import { TodoHeader } from '../todo-header/todo-header';

interface TodosComponentProps {
  todosState: TodoState;
  location: Location;
}

interface TodosComponentState {
}

type Props = TodosComponentProps & LinkDispatchProps & LinkStateProp;


const Todos = (props: Props) => {
  const ENTER_KEY = 13;

  // instead of ComponentDidMount life cycle hook
  useEffect(() => {
    props.loadTodos();
    getTodosList(props.location.hash); // eslint-disable-next-line
  }, []);

  const getTodosList = (location: string = '') => {
    switch (location) {
      case '#/active':
        props.showActivatedTodos();
        break;
      case '#/completed':
        props.showCompletedTodos();
        break;
      default:
        props.showAllTodos();
    }
  }

  const deleteTodo = (itemId: string) => {
    props.deleteTodo(itemId);
  }

  const toggleItemActivation = (itemId: string, isChecked: boolean) => {
    props.toggleTodo(itemId, isChecked)
  }

  const toggleAllItemsActivation = (isChecked: boolean) => {
    let itemIds: string[] = props.todosState.todos.map(t => t.id);
    props.toggleAllTodos(itemIds, isChecked)
  }

  const handleNewTodoKeyDown = (event: any) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    props.addTodo({ id: uuidv4(), title: event.target.value, isCompleted: false });
    event.target.value = "";
  }

  const onClearCompletedTodos = () => {
    let ids: string[] = props.todosState.todos.reduce((itemsId: string[], currentItem: TodoModel) => {
      if (currentItem.isCompleted)
        itemsId.push(currentItem.id);

      return itemsId;
    }, []);

    // another way
    //this.props.todosState.todos.filter(t => t.isCompleted).map(t => t.id)

    props.clearCompletedTodos(ids);
  }

  let todoItems: any;
  let clearCompletedTodosButton: any;
  let snackbar;
  let todosFooter;

  if (props.todosState.error) {
    snackbar = <SnackBar
      show={props.todosState.error}
      autoHideDuration={5000}
      severity="error"
      handleClose={() =>  props.changeErrorState(false)}
      message={props.todosState.errorMessage} />
  } else {
    snackbar = "";
  }

  if (props.todosState.todos.filter(t => t.isCompleted).length > 0) {
    clearCompletedTodosButton = (
      <button
        className="clear-completed"
        onClick={onClearCompletedTodos}>
        Clear completed
        </button>
    );
  }

  if (props.todosState.todos.length > 0) {
    todoItems = props.todosState.selectedTodos.map((item) => {
      return <TodoBody
        key={item.id}
        title={item.title}
        itemClass={item.isCompleted ? "completed" : ""}
        inputClass="toggle"
        isChecked={item.isCompleted}
        checked={(event: any) => toggleItemActivation(item.id, event.target.checked)}
        deleteItem={() => deleteTodo(item.id)} />
    });

    todosFooter = <TodoFooter
      activeTodosCounter={props.todosState.activeTodosCounter}
      showingNow={props.todosState.showingNow}
      clearCompletedTodosButton={clearCompletedTodosButton}
      clicked={(e: string) => getTodosList(e)} />
  }

  return (
    <>
      {snackbar}
      <section className="todoapp">
        <TodoHeader
          placeholder="What needs to be done?"
          handleNewTodoKeyDown={(e: any) => handleNewTodoKeyDown(e)}
          autoFocus={true} />

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={props.todosState.todos.filter(t => t.isCompleted).length === props.todosState.todos.length}
            onChange={(event) => toggleAllItemsActivation(event.target.checked)} />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todoItems}
          </ul>

        </section>

        {todosFooter}
      </section>
    </>
  );

}

interface LinkStateProp {
  todosState: TodoState
}

interface LinkDispatchProps {
  loadTodos: () => void;
  toggleTodo: (id: string, state: boolean) => void;
  toggleAllTodos: (ids: string[], state: boolean) => void;
  addTodo: (todo: TodoModel) => void;
  deleteTodo: (id: string) => void;
  clearCompletedTodos: (ids: string[]) => void;
  showAllTodos: () => void;
  showCompletedTodos: () => void;
  showActivatedTodos: () => void;
  changeErrorState: (error: boolean) => void;
}

//ownProps => props of my component
const mapStateToProps = (state: AppState, ownProps: TodosComponentState): LinkStateProp => ({
  todosState: state.todosState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActionsTypes>, ownProps: TodosComponentState): LinkDispatchProps => ({
  loadTodos: bindActionCreators(loadTodos, dispatch),
  toggleTodo: bindActionCreators(toggleTodo, dispatch),
  toggleAllTodos: bindActionCreators(toggleAllTodos, dispatch),
  addTodo: bindActionCreators(addTodo, dispatch),
  deleteTodo: bindActionCreators(deleteTodo, dispatch),
  clearCompletedTodos: bindActionCreators(deleteCompletedTodos, dispatch),
  showAllTodos: bindActionCreators(ShowAllTodos, dispatch),
  showCompletedTodos: bindActionCreators(ShowCompleteTodos, dispatch),
  showActivatedTodos: bindActionCreators(ShowActiveTodos, dispatch),
  changeErrorState: bindActionCreators(ChangeErrorState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
