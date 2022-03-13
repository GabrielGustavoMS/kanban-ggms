import { React, useState, useEffect } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    return [];
  });
  useEffect(() => {
    setTasks(JSON.parse(window.localStorage.getItem("react-kanban-tasks")));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("react-kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Essa função será passada por parâmetro props para o componente
  //Esse componente por sua vez terá uma função que chamará a 1ª
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      //Note que ... é um operador de desestruturação
      //Ele irá 'arrancar' todos os elementos do array existingTasks
      //E colocará como elementos serapados em um novo array
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title={`Pendente`}
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          taskState={"Pendente"}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title={`Fazendo`}
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          taskState={"Fazendo"}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title={`Completa`}
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          taskState={"Completa"}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
