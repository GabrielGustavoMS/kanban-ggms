import React from "react";
import "./style.css";
import plusIcon from "../../img/plusicon.svg";
import Proptypes from "prop-types";

import TaskItem from "../TaskItem/Taskitem";

export default function TaskList({
  title,
  onAddTask,
  tasks,
  onTaskUpdate,
  taskState,
  onDeleteTask
}) {
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };
  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {tasks.map((task) => {
          return (
            //a prop key é necessária para que o
            //react renderize os elementos com o map
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
        {tasks.length === 0 && <div className={"empty-list"}>Lista Vazia</div>}
      </div>
      <button onClick={addTask} className={"btn"}>
        <img
          src={plusIcon}
          alt={"Adicionar Tarefa"}
          className={"filter-white"}
        />
        Adicionar Tarefa
      </button>
    </div>
  );
}

TaskList.propTypes = {
  title: Proptypes.string.isRequired,
  onAddTask: Proptypes.func.isRequired,
  tasks: Proptypes.array.isRequired
};
