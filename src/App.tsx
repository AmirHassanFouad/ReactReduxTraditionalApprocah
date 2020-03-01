import './App.css';
import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Todos from './components/controls/todos/todos';


function App() {
  return (
    <>
      <h2 className="header-title">React Assingment Traditional Redux</h2>
      <main className="Content">
        <Switch>
          <Route path="/todos" component={Todos} />
          <Route path="/" component={Todos} />
        </Switch>
      </main>
    </>
  );
}

export default App;
