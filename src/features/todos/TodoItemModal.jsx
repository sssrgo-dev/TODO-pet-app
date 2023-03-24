import { useState } from "react"
import { useDispatch } from "react-redux"

import TimeInput from "./TimeInput"
import FieldsWrapper from "../../components/layout/FieldsWrapper"

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

  const updateTodo = (e, type) => {
    dispatch({
      type: "todos/todoUpdated",
      payload: { ...todo, [type]: e.target.value },
    })
  }

  const finishFieldOfTypeEditByEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault()
      // update in storage
      setEditable(allEditableFieldsStatusFalse)
    }
  }

  const EditInputFieldOfType = ({ type, value }) => (
    <input
      type="text"
      autoFocus
      defaultValue={value}
      onKeyDown={(e) => finishFieldOfTypeEditByEnter(e)}
      onChange={(e) => {
        updateTodo(e, type)
      }}
    />
  )

  const EditDescription = ({ value }) => {
    console.log("edit")
    return (
      <textarea
        autoFocus
        value={value}
        onKeyDown={(e) => finishFieldOfTypeEditByEnter(e)}
        onChange={(e) => updateTodo(e, "description")}
      />
    )
  }

  return (
    <form
      action=""
      className="fixed flex  z-10 flex-col gap-2 border-solid border-[1px] rounded-md p-5  shadow-lg transition-all ease-in-out duration-1000 bg-stone-100"
    >
      <div className="text-xs text-slate-300">created: {createdTime}</div>
      <FieldsWrapper>
        <div># {id}</div>
        {editableFieldsStatus.name ? (
          <EditInputFieldOfType type={"name"} value={name} />
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
        <EditDescription value={description} />
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
        close x
      </button>
    </form>
  )
}
