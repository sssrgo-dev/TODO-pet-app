import { map } from "ramda"
import TodoItem from "./TodoItem"

export default function TodoList({ todos, onCardClick, todoIds, draggedId }) {
  return (
    <ul className="flex flex-col gap-2 mt-2">
      {map(
        (todoId) => (
          <TodoItem
            draggedId={draggedId}
            key={todoId}
            todo={todos[todoId]}
            onCardClick={onCardClick}
          />
        ),
        todoIds
      )}
    </ul>
  )
}
