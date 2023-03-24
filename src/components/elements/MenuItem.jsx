export default function MenuItem({ svg, item, qty = 0, isActive, index }) {
  return (
    <li
      key={index}
      data-index={index}
      className={`${
        isActive
          ? "bg-slate-100 drop-shadow-md"
          : "hover:bg-slate-100 hover:drop-shadow-xs"
      } py-[12px] pr-[8px] pl-[6px] duration-500 rounded-md flex gap-[8px] justify-between items-center`}
    >
      <img className="flex-none" src={svg} alt={item} />
      <p className="grow">{item}</p>
      {qty > 0 ? (
        <div
          className={`rounded-[6px] flex-none w-[20px] h-[20px]   ${
            isActive ? "bg-gray-800 font-bold text-slate-50" : "bg-slate-100"
          } flex justify-center items-center text-xs`}
        >
          <p>{qty}</p>
        </div>
      ) : (
        ""
      )}
    </li>
  )
}
