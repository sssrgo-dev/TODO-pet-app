import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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
import TodoItem from "../../features/todos/TodoItem"
import DndDroppableStatusColumns from "../../features/todos/DndColums"
import DroppableStatusColumn from "./StatusColumn"

import { filter, includes, map, sort, __ } from "ramda"

const statusColumnsNamesList = ["queue", "development", "done"]
const mapOverStatusColumnsNameList = map(__, statusColumnsNamesList)
const statusColumnsNamesListIncludes = includes(__, statusColumnsNamesList)

export default function WorkSpace() {
  const { todos, sortedByUser } = useSelector(allTodosInState)

  const dispatch = useDispatch()

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
      <div className={`bg-gray-100 pt-[80px] px-[40px] pb-[43px] relative`}>
        {!!opennedTodoId ? (
          <TodoItemModal
            todo={todos[opennedTodoId]}
            onCloseModalClick={onCloseModalClick}
          />
        ) : null}
        <div
          className={`flex gap-[36px] transition-all duration-300 ease-in-out ${
            !!opennedTodoId ? "blur" : ""
          }`}
        >
          <DndContext
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {/* <div className="flex gap-[36px]"> */}
            {mapOverStatusColumnsNameList((status) => {
              const todosOfStatus = filter(
                (todo) => todo.status == status,
                todos
              )

              const todosIdsSortedByUserOfStatus = filter(
                (id) => Object.keys(todosOfStatus).includes(id + ""),
                sortedByUser
              )

              return (
                <DroppableStatusColumn
                  key={status}
                  id={status}
                  active={todos[draggedId]?.status}
                >
                  <SortableContext
                    items={todosIdsSortedByUserOfStatus}
                    strategy={rectSortingStrategy}
                  >
                    <TodoList
                      todos={todosOfStatus}
                      todoIds={todosIdsSortedByUserOfStatus}
                      onCardClick={onCardClick}
                      draggedId={draggedId}
                    />
                  </SortableContext>
                </DroppableStatusColumn>
              )
            })}
            {/* </div> */}
            <DragOverlay wrapperElement="ul">
              {draggedId ? <TodoItem todo={todos[draggedId]} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  )

  function handleDragStart(event) {
    const { active } = event
    setDraggedId(active.id)
  }

  function handleDragOver(event) {
    const {
      active,
      over,
      delta: { y },
    } = event

    const [activeId, overId] = [active?.id, over?.id]

    if (!activeId || !overId || activeId === overId) return

    // console.log("overId", overId)
    // console.log("activeId", activeId)

    dispatch({
      type: "todos/todosMoved",
      payload: { activeId, overId, y },
    })
  }

  function handleDragEnd() {
    setDraggedId(null)
  }
}
