"use client";
// Bootstrap
import ListGroup from "react-bootstrap/ListGroup";
// Dnd KIt
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// Components
import TaskItem from "./components/TaskItem/TaskItem";
// Interfaces
import { Task } from "@/app/interfaces";

function TaskList(props: {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  editTask: (id: number, name: string) => void;
  deleteTask: (id: number) => void;
  tasksRearrange: (tasks: Task[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100, // User must press and hold for this amount of miliseconds
        tolerance: 5, // User can move their finger 5px before the delay is canceled
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <ListGroup>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={props.tasks}
          strategy={verticalListSortingStrategy}
        >
          {props.tasks.map((t) => {
            return (
              <SortableItem key={t.id} id={t.id}>
                <ListGroup.Item>
                  <TaskItem
                    task={t}
                    toggleComplete={props.toggleComplete}
                    editTask={props.editTask}
                    deleteTask={props.deleteTask}
                  />
                </ListGroup.Item>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </ListGroup>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = props.tasks.findIndex((t) => t.id === active.id);
      const newIndex = props.tasks.findIndex((t) => t.id === over.id);
      props.tasksRearrange(arrayMove(props.tasks, oldIndex, newIndex));
    }
  }
}

// Component for sorting
function SortableItem(props: { id: number; children: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

export default TaskList;
