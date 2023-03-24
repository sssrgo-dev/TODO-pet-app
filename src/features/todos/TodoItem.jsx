import { useState } from "react"
import { useDispatch } from "react-redux"

import FieldsWrapper from "../../components/layout/FieldsWrapper"

export default function TodoItem({ todo, onCardClick }) {
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

  const [editable, setEditable] = useState(false)
  const dispatch = useDispatch()

  const updateTodo = (e) => {
    console.log(e.target.value)
    dispatch({
      type: "todos/todoUpdated",
      payload: { name: e.target.value, id },
    })
  }

  const editTextField = (
    <input
      type="text"
      autoFocus
      value={name}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          e.preventDefault()
          setEditable(false)
        }
      }}
      onChange={updateTodo}
    />
  )

  return (
    <li
      onClick={() => onCardClick(id)}
      className="border-solid border-[1px] rounded-md p-5  hover:shadow-lg transition-shadow duration-500 ease-in-out bg-stone-100"
    >
      <form action="" className="flex flex-col gap-2">
        <div className="text-xs text-slate-300">created: {createdTime}</div>
        <FieldsWrapper>
          <div># {id}</div>
          {editable ? (
            editTextField
          ) : (
            <h3 className="font-semibold" onClick={() => setEditable(true)}>
              {name}
            </h3>
          )}
        </FieldsWrapper>

        <FieldsWrapper>
          <label className="text-slate-500 text-xs" htmlFor="startTime">
            start:
          </label>
          <input
            className="text-slate-500 text-xs"
            type="date"
            name="startTime"
            value={startTime ? startTime : ""}
            onChange={updateTodo}
          />
          <label className="text-slate-500 text-xs" htmlFor="finishTime">
            finish:
          </label>
          <input
            className="text-slate-500 text-xs"
            type="date"
            name="finishTime"
            value={finishTime ? finishTime : ""}
            onChange={updateTodo}
          />
        </FieldsWrapper>
        <div>in Work: {}</div>
        <div>priority: {priority}</div>
        <hr />
        <FieldsWrapper>
          <div>files: {files}</div>
          <div>subtasks: {subtasks}</div>
          <div>comments: {comments}</div>
        </FieldsWrapper>
      </form>
    </li>
  )
}
