import { memo, useContext, useState } from "react"
import { useDispatch } from "react-redux"

import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPaperclip,
  faPenToSquare,
  faGripVertical,
  faDiagramPredecessor,
  faComments,
  faTrash,
  faSpinner,
  faLandMineOn,
  faCalendarPlus,
  faFlagCheckered,
  faPencil,
} from "@fortawesome/free-solid-svg-icons"

import FieldsWrapper from "../../components/layout/FieldsWrapper"
import ActivateEditTodoContext from "./TodoActivateEditContext"

export default function TodoItem({ todo, onCardClick, draggedId }) {
  const {
    name,
    id,
    createdTime,
    startTime,
    finishTime,
    priority,
    files,
    subtasks,
    comments,
  } = todo

  const { editingElId, setEditingElementId } = useContext(
    ActivateEditTodoContext
  )
  // console.log(editingElId, setEditingElementId)

  // const [editable, setEditable] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  const dispatch = useDispatch()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      transition: {
        duration: 350, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const updateTodo = (e) => {
    dispatch({
      type: "todos/todoUpdated",
      payload: { name: e.target.value, id },
    })
  }

  const handleMouseEnter = (e) => {
    setHoveredId(id)
  }
  const handleMouseLeave = (e) => {
    setHoveredId(null)
  }

  const editTextField = (id) => {
    return (
      <input
        className="border-0 rounded-md"
        id={id}
        type="text"
        autoFocus
        value={name}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault()
            updateTodo(e)
            setEditingElementId(null)
          }
        }}
        onChange={(e) => {
          updateTodo(e)
        }}
      />
    )
  }

  return (
    <li
      id={id}
      ref={setNodeRef}
      style={style}
      className={`border-solid border-[1px] relative rounded-md  z-10 hover:shadow-lg transition-shadow duration-500 ease-in-out bg-stone-100 ${
        draggedId === id ? "opacity-50" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoveredId ? (
        <div className="flex gap-2 absolute right-2 top-1 animate-slow-appear text-slate-400">
          <button className="" onClick={() => onCardClick(id)}>
            <FontAwesomeIcon
              className="hover:text-gray-700 duration-500 ease-in-out"
              icon={faPenToSquare}
            />
          </button>
          <button
            {...attributes}
            {...listeners}
            onClick={() => onCardClick(id)}
          >
            <FontAwesomeIcon
              className="hover:scale-110 duration-500 ease-in-out"
              icon={faGripVertical}
            />
          </button>
          <button className="hover:scale-110 duration-500 ease-in-out">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() =>
                dispatch({ type: "todos/todoDeleted", payload: { id } })
              }
            />
          </button>
        </div>
      ) : (
        ""
      )}

      <form action="" className="flex flex-col gap-2 p-5">
        <div className="text-xs text-slate-300">created: {createdTime}</div>
        <FieldsWrapper>
          <div># {id}</div>
          {editingElId === `${id}_name` ? (
            editTextField(`${id}_name`)
          ) : (
            <h3
              id={`${id}_name`}
              className="font-semibold"
              onClick={() => setEditingElementId(`${id}_name`)}
            >
              {name.length ? name : <FontAwesomeIcon icon={faPencil} />}
            </h3>
          )}
        </FieldsWrapper>

        <FieldsWrapper>
          <label className="text-slate-500 text-xs" htmlFor="startTime">
            <FontAwesomeIcon icon={faCalendarPlus} />
          </label>
          <input
            className="text-slate-500 text-xs"
            type="date"
            name="startTime"
            value={startTime ? startTime : ""}
            onChange={updateTodo}
          />
          <label className="text-slate-500 text-xs" htmlFor="finishTime">
            <FontAwesomeIcon icon={faFlagCheckered} />
          </label>
          <input
            className="text-slate-500 text-xs"
            type="date"
            name="finishTime"
            value={finishTime ? finishTime : ""}
            onChange={updateTodo}
          />
        </FieldsWrapper>
        <FieldsWrapper>
          <FontAwesomeIcon icon={faSpinner} />
          <FontAwesomeIcon icon={faLandMineOn} />
        </FieldsWrapper>
        <hr />
        <FieldsWrapper>
          <FontAwesomeIcon icon={faPaperclip} />
          <FontAwesomeIcon icon={faDiagramPredecessor} />
          <FontAwesomeIcon icon={faComments} />
        </FieldsWrapper>
      </form>
    </li>
  )
}
