import { useDroppable } from "@dnd-kit/core"

export default function StatusColumn({ type, children, id }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col grow p-2 border-[1px] ${
        isOver ? "bg-slate-100" : ""
      }`}
    >
      <h2>{type.toUpperCase()}</h2>
      {children}
    </div>
  )
}
