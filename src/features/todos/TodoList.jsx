import TodoItem from "./TodoItem"

export default function TodoList({ todos, onCardClick }) {
  return (
    <ul className="flex flex-col gap-2 mt-5">
      {Object.keys(todos).map((todoKey, i) => (
        <TodoItem key={i} todo={todos[todoKey]} onCardClick={onCardClick} />
      ))}
    </ul>
  )
}
