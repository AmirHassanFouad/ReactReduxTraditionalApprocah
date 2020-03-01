import React from 'react';
import { SHOW_COMPLETE_TODOS, SHOW_ACTIVE_TODOS, SHOW_ALL_TODOS } from '../../../store/types/actions';

export const TodoFooter = (props: any) => {
    return (
        <>
            <footer className="footer">
                <span className="todo-count"><strong>{props.activeTodosCounter}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a href="#/" onClick={e => props.clicked()}
                            className={props.showingNow === SHOW_ALL_TODOS ? "selected" : ""}>All</a>
                    </li>
                    <li>
                        <a href="#/active" onClick={e => props.clicked('#/active')}
                            className={props.showingNow === SHOW_ACTIVE_TODOS ? "selected" : ""}>Active</a>
                    </li>
                    <li>
                        <a href="#/completed" onClick={e =>  props.clicked('#/completed')}
                            className={props.showingNow === SHOW_COMPLETE_TODOS ? "selected" : ""}>Completed</a>
                    </li>
                </ul>

                {props.clearCompletedTodosButton}
            </footer>
        </>
    )
}