"use client";
// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Interfaces
import { Task, TasksState } from "../interfaces";

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
    },
    toggleCompleteTask: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: number }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, editTask, toggleCompleteTask, deleteTask, setTasks } =
  tasksSlice.actions;

// Export the reducer function
export default tasksSlice.reducer;
