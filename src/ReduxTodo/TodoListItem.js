import React from "react";
import styles from "./TodoList.module.css";
import classNames from "classnames";
import { ListItem, Input, EditButton } from "../assets/style/style";

class TodoListItem extends React.Component {
  state = {
    editing: false,
    inputValue: ""
  };

  handleEditPressed = () => {
    this.setState({
      inputValue: this.props.name,
      editing: true
    });
  };

  handleSave = () => {
    this.props.onEdit(this.state.inputValue);
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleCancel = () => {
    this.setState({
      editing: false,
      inputValue: ""
    });
  };

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  render() {
    return (
      <li className="px-3">
        {this.state.editing ? (
          <>
            <Input value={this.state.inputValue} onChange={this.handleChange} />
            <EditButton onClick={this.handleSave}>Save</EditButton>
            <EditButton onClick={this.handleCancel}>Cancel</EditButton>
          </>
        ) : (
          <>
            <span
              className="mr-5 list-group-item border-none d-flex justify-content-between align-items-center"
              style={{
                textDecoration: this.props.done ? "line-through" : "none"
              }}
            >
              {this.props.name}
            </span>
            <ListItem
              onClick={this.props.onToggle}
              className={classNames(styles.button, styles.itemButton)}
            >
              {this.props.done ? "Un-Done" : "Done"}
            </ListItem>
            <ListItem
              onClick={this.handleEditPressed}
              className={classNames(styles.button, styles.itemButton)}
            >
              Edit
            </ListItem>
            <ListItem
              onClick={this.props.onDelete}
              className={classNames(styles.button, styles.itemButton)}
            >
              Delete
            </ListItem>
          </>
        )}
      </li>
    );
  }
}

export default TodoListItem;
