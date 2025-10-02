"use client";
// React
import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import {
  addTask,
  editTask,
  deleteTask,
  toggleCompleteTask,
  setTasks,
} from "./store/tasksSlice";

// Components
import AddTaskControl from "./components/AddTaskControl/AddTaskControl";
import TaskList from "./components/TaskList/TaskList";
// Styles
import "./page.css";
// Interfaces
import { Task } from "./interfaces";
// Constants
import { STORAGE_KEY } from "./constants";

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = useState(false);

  const onAddTask = ({ name }: { name: string }) => {
    dispatch(
      addTask({
        id: Date.now(),
        name,
        completed: false,
      })
    );
  };

  const onToggleComplete = (id: number) => {
    dispatch(toggleCompleteTask({ id }));
  };

  const onEditTask = (id: number, name: string) => {
    dispatch(editTask({ id, name }));
  };

  const onDeleteTask = (id: number) => {
    dispatch(deleteTask({ id }));
  };

  const onTasksRearrange = (rearrangedTasks: Task[]) => {
    dispatch(setTasks(rearrangedTasks));
  };

  const getInitialTasks = (): Task[] => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  };

  useEffect(() => {
    const initialTasks = getInitialTasks();
    dispatch(setTasks(initialTasks));
    setIsMounted(true);
    console.log("loaded");
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      console.log("saved");
    }
  }, [tasks]);

  return (
    <main className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Today's Tasks</h1>
      <section className="d-flex flex-column p-2 gap-3 rounded-2">
        <AddTaskControl addNewTask={onAddTask} />
        {tasks && tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            toggleComplete={onToggleComplete}
            editTask={onEditTask}
            deleteTask={onDeleteTask}
            tasksRearrange={onTasksRearrange}
          />
        )}
      </section>
    </main>
  );
}
