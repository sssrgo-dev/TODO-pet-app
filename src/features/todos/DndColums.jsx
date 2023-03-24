import {
  arrayMove,
  arraySwap,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { filter } from "ramda"

import StatusColumn from "../../components/layout/StatusColumn"
import TodoList from "./TodoList"

export default function DndColumns({ onCardClick, todos }) {
  return (
    <div className="flex gap-[36px]">
      {["queue", "development", "done"].map((status, i) => {
        return (
          <StatusColumn key={i} type={status}>
            <TodoList
              todos={filter((todo) => todo.status == status, todos)}
              onCardClick={onCardClick}
            />
          </StatusColumn>
        )
      })}
    </div>
  )
}
