"use client";
// React
import React, { useState } from "react";
// Bootstrap
import Form from "react-bootstrap/Form";
import { Trash3, CheckLg } from "react-bootstrap-icons";
// Styles
import "./TaskItem.css";
import { Task } from "@/app/interfaces";

function TaskItem(props: {
  task: Task;
  toggleComplete: (id: number) => void;
  editTask: (id: number, name: string) => void;
  deleteTask: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(props.task.name);

  const onToggleComplete = () => {
    props.toggleComplete(props.task.id);
  };

  const enableTaskNameEditing = () => {
    setIsEditing(true);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      return;
    }
    setIsEditing(false);
    updateTaskName();
  };

  const handleOnEditBlur = () => {
    setIsEditing(false);
    updateTaskName();
  };

  const updateTaskName = () => {
    props.editTask(props.task.id, taskName);
  };

  const onDeleteTask = () => {
    props.deleteTask(props.task.id);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Form.Check
        id="completed-checkbox-control"
        className="check-control"
        checked={props.task.completed}
        onChange={onToggleComplete}
      />
      {isEditing ? (
        <Form.Control
          id="edit-task-control"
          type="text"
          className="p-0 border-0 shadow-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => handleEditKeyDown(e)}
          onBlur={handleOnEditBlur}
          autoFocus
        />
      ) : (
        <div
          className={
            (props.task.completed ? "text-decoration-line-through" : "") +
            " w-100"
          }
          onClick={() => enableTaskNameEditing()}
        >
          {props.task.name}
        </div>
      )}
      {isEditing ? (
        <CheckLg className="action-icon" onClick={updateTaskName} />
      ) : (
        <Trash3 className="action-icon delete-icon" onClick={onDeleteTask} />
      )}
    </div>
  );
}

export default TaskItem;
