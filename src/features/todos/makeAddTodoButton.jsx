import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function makeAddTodoButton({
  iconClassName,
  btnClassName,
  dispatch,
  payload,
}) {
  return (
    <button
      onClick={() => dispatch({ type: "todos/todoAdded", payload })}
      className={btnClassName}
    >
      <FontAwesomeIcon className={iconClassName} icon={faPlus} />
    </button>
  )
}
