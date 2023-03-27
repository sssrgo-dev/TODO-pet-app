import { useState } from "react"
import { useDispatch } from "react-redux"

import FieldsWrapper from "../../components/layout/FieldsWrapper"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function todoFormReducer(state, action) {
  switch (action.type) {
    case "header": {
      return { ...state, name: action.payload }
    }
    case "description": {
      return { ...state, description: action.payload }
    }
    case "startTime": {
      return { ...state, startTime: action.payload }
    }
    case "finishTime": {
    }
    default:
      return { ...state }
  }
}

export default function TodoItemModal({ todo, onCloseModalClick }) {
  const {
    name,
    id,
    createdTime,
    startTime,
    finishTime,
    description,
    priority,
    files,
    subtasks,
    comments,
  } = todo

  const allEditableFieldsStatusFalse = { name: false } // to prohibit edit any of input

  const [editableFieldsStatus, setEditable] = useState({
    name: false,
    description: false,
  })

  const dispatch = useDispatch()

  const updateTodo = (e) => {
    dispatch({
      type: "todos/todoUpdated",
      payload: { name: e.target.value, id },
    })
  }

  const finishFieldOfTypeEditByEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault()
      // update in storage
      setEditable(allEditableFieldsStatusFalse)
    }
  }

  const editInputFieldOfType = (
    <input
      type="text"
      autoFocus
      defaultValue={name}
      onKeyDown={(e) => finishFieldOfTypeEditByEnter(e)}
      onChange={updateTodo}
    />
  )

  const editDescription = (
    <textarea
      autoFocus
      value={description}
      onKeyDown={(e) => finishFieldOfTypeEditByEnter(e)}
      onChange={(e) => updateTodo(e, "description")}
    />
  )

  return (
    <form
      action=""
      className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex w-[80vw] z-10 flex-col gap-2 border-solid border-[1px] rounded-md p-5  shadow-lg transition-all ease-in-out duration-1000 bg-stone-100"
    >
      <div className="text-xs text-slate-300">created: {createdTime}</div>
      <FieldsWrapper>
        <div># {id}</div>
        {editableFieldsStatus.name ? (
          editInputFieldOfType
        ) : (
          <h3
            className="font-semibold"
            onClick={() =>
              setEditable({ ...allEditableFieldsStatusFalse, name: true })
            }
          >
            {name}
          </h3>
        )}
      </FieldsWrapper>

      <FieldsWrapper>
        <div className="text-xs text-slate-500">in Work: {}</div>
        <div className="text-xs text-slate-500">set priority: {priority}</div>
      </FieldsWrapper>
      {editableFieldsStatus.description ? (
        editDescription
      ) : (
        <div
          onClick={() =>
            setEditable({
              ...allEditableFieldsStatusFalse,
              description: true,
            })
          }
        >
          {description}
        </div>
      )}

      <div>files: {files ? files.length : 0}</div>
      <label htmlFor="attachFile">Add file</label>
      <input type="file" name="attachFile" />
      <FieldsWrapper>
        <div>subtasks btn: {subtasks ? subtasks.length : 0}</div>
        <div>comments: {comments ? comments.length : 0}</div>
      </FieldsWrapper>
      <button
        className="rounded-md border"
        onClick={(e) => {
          e.preventDefault()
          onCloseModalClick()
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </form>
  )
}
