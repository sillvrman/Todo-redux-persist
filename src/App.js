import React from "react";
import "./App.css";
import { store, persistor } from "./redux/index";
import { PersistGate } from "redux-persist/integration/react";
import TodoList from "./ReduxTodo/TodoList";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TodoList />
      </PersistGate>
    </Provider>
  );
}

export default App;
