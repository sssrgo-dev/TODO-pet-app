import { useState } from "react"
import { useSelector } from "react-redux"

import {
  DndContext,
  DragOverlay,
  closestCenter,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  arraySwap,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"

import { allTodosInState } from "../../features/todos/todosSlice"
import TodoList from "../../features/todos/TodoList"
import TodoItemModal from "../../features/todos/TodoItemModal"
import DndStatusColumns from "../../features/todos/DndColums"
import StatusColumn from "./StatusColumn"

import { filter } from "ramda"

export default function WorkSpace() {
  const todos = useSelector(allTodosInState)

  const [opennedTodoId, setOpennedTodoId] = useState(null)
  const [draggedId, setDraggedId] = useState(null)

  const onCardClick = (todoId) => {
    setOpennedTodoId(todoId)
  }

  const onCloseModalClick = () => {
    setOpennedTodoId(null)
  }

  return (
    <>
      {!!opennedTodoId ? (
        <TodoItemModal
          todo={todos[opennedTodoId]}
          onCloseModalClick={onCloseModalClick}
        />
      ) : null}

      <div
        className={`bg-gray-100 transition-all duration-300 ease-in-out pt-[80px] px-[40px] pb-[43px] relative ${
          !!opennedTodoId ? "blur" : ""
        }`}
      >
        <div className="flex gap-[36px]">
          <DndContext
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            // onDragOver={handleDragOver}
          >
            <div className="flex gap-[36px]">
              {["queue", "development", "done"].map((status, i) => {
                return (
                  <StatusColumn key={i} type={status}>
                    {/* <SortableContext
                      items={filter((todo) => todo.status == status, todos)}
                    > */}
                    <TodoList
                      todos={filter((todo) => todo.status == status, todos)}
                      onCardClick={onCardClick}
                    />
                    {/* </SortableContext> */}
                  </StatusColumn>
                )
              })}
            </div>
          </DndContext>
          <DragOverlay wrapperElement="li">
            {draggedId ? <Item value={`Item id: ${draggedId}`} /> : null}
          </DragOverlay>
        </div>
      </div>
    </>
  )

  function handleDragStart(event) {
    const { active } = event
    console.log(event)
    setActiveId(active.id)
  }
}
