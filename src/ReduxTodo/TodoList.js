import React, { Component } from "react";
import TodoListItem from "./TodoListItem";
import { AddButton, Input, FilterButton } from "../assets/style/style";
import { connect } from "react-redux";
import {
  addTodo,
  setFilter,
  editTodo,
  removeTodo,
  toggleTodo,
  undo
} from "../redux/actionCreators/todoActions";
import { getFilteredTodos, getHistory } from "../redux/selectors/todoSelectors";

class TodoList extends Component {
  state = {
    inputValue: "",
    filter: "All"
  };

  setFilter = filterName => {
    this.props.setFilter(filterName);
  };

  getTodos = () => {};

  handleAddTodoPress = () => {
    if (this.state.inputValue) {
      this.props.addTodo(this.state.inputValue);
      this.setState({
        inputValue: ""
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <header className="todo px-5">
          <h2 className="alert">Todo list</h2>

          <ul className="todo-list">
            {this.props.todos.map((todo, index) => (
              <TodoListItem
                {...todo}
                key={todo.id}
                // onToggle={() => this.toggle(todo.id)}
                onToggle={() => this.props.toggleTodo(todo.id)}
                // onDelete={() => this.delete(todo.id)}
                onDelete={() => this.props.deleteTodo(todo.id)}
                // onEdit={newName => this.edit(newName, todo.id)}
                onEdit={name => this.props.editTodo(todo.id, name)}
              />
            ))}
          </ul>
          <div className="input-group mb-3 col d-flex">
            <Input
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              type="text"
              className="col py-2"
            />
            <div className="input-group-append"></div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <AddButton onClick={this.handleAddTodoPress}>Add Todo</AddButton>
              <AddButton
                disabled={!this.props.isUndoable}
                onClick={this.props.undo}
              >
                Undo
              </AddButton>
            </div>
            <div className="d-flex">
              <FilterButton
                onClick={() => this.setFilter("All")}
                className="next"
              >
                All
              </FilterButton>
              <FilterButton
                onClick={() => this.setFilter("Dones")}
                className="next"
              >
                Dones
              </FilterButton>
              <FilterButton
                onClick={() => this.setFilter("Un-Dones")}
                className="next"
              >
                Un-Dones
              </FilterButton>
            </div>
          </div>
          {/* </div> */}
        </header>
      </div>
    );
  }
}

let mapStateToProps = state => {
  console.log(getHistory(state));
  console.log(!!getHistory(state).length);
  return {
    todos: getFilteredTodos(state),
    isUndoable: !!getHistory(state).length
  };
};

let mapDispatchToProps = dispatch => {
  return {
    toggleTodo: todoId => dispatch(toggleTodo(todoId)),
    deleteTodo: todoId => dispatch(removeTodo(todoId)),
    editTodo: (todoId, name) => dispatch(editTodo(todoId, name)),
    addTodo: name => dispatch(addTodo(name)),
    setFilter: filterName => dispatch(setFilter(filterName)),
    undo: () => dispatch(undo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
