import { React, useState } from "react";
import PropTypes from "prop-types";

import "./task-item.css";

export default function Taskitem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };
  const onBlur = (event) => {
    setIsEditing(false);
    if (editableTitle.length === 0) {
      onDeleteTask(id);
    }
  };

  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  const deleteThisTask = (event) => {
    onDeleteTask(id);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
        />
      </div>
    );
  }

  return (
    <div className={"task-item"}>
      <button onClick={deleteThisTask} className={"btn-delete"}>
        x
      </button>
      <div
        onClick={(e) => {
          setIsEditing(true);
        }}
        className={"lblTask"}
      >
        {editableTitle}
      </div>
      <select onChange={onTaskStateChange} value={taskState}>
        <option value="Pendente">Pendente</option>
        <option value="Fazendo">Fazendo</option>
        <option value="Completa">Completa</option>
      </select>
    </div>
  );
}

Taskitem.protoTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
