import { useDroppable } from "@dnd-kit/core"

import { useDispatch } from "react-redux"
import makeAddTodoButton from "../../features/todos/makeAddTodoButton"

export default function StatusColumn({ children, id, active }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  const dispatch = useDispatch()

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col grow p-2 border-[1px] relative ${
        isOver || active === id ? "bg-slate-100" : "bg-slate-200"
      }`}
    >
      <h2>{id.toUpperCase()}</h2>
      {makeAddTodoButton({
        btnClassName: "absolute right-2 hover:text-slate-50 duration-500",
        iconClassName: "",
        dispatch,
        payload: { status: id, sorting: "upper" },
      })}
      {/* <button
        onClick={() => dispatch({ type: "todos/todoAdded" })}
        className="absolute right-2 hover:text-slate-50 duration-500"
      >
        {makeAddTodoButton("")}
      </button> */}
      {children}
      {makeAddTodoButton({
        btnClassName:
          "p-5 w-full mt-2 bg-slate-100 h-4 relative rounded-md hover:shadow-lg  hover:scale-[1.01]  transition-all duration-500  active:shadow-none active:scale-100 active:duration-100",
        iconClassName:
          "absolute  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        dispatch,
        payload: { status: id, sorting: "lower" },
      })}
    </div>
  )
}
