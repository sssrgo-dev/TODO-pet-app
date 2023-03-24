import { useState } from "react"

export default function ProjectPicker({ children }) {
  const [openedStatus, setOpennedStatus] = useState(false)
  const [current, setCurrent] = useState(0)
  //   console.log(current);

  return (
    <div className="relative pt-[24px] pb-[48px]">
      <ul
        className={`flex flex-col absolute z-10 w-full  ${
          openedStatus ? "bg-slate-200" : ""
        }`}
      >
        {children.map(({ item }, i) => (
          <li
            data-index={i}
            key={i}
            onClick={
              current === i
                ? () => setOpennedStatus(!openedStatus)
                : (e) => {
                    setCurrent(+e.target.dataset.index)
                    setOpennedStatus(!openedStatus)
                  }
            }
            className={`flex flex-none gap-[8px] px-[24px] py-[24px] items-center duration-500 relative  ${
              current === i
                ? "bg-slate-300 hover:bg-slate-200"
                : `order-2  hover:bg-slate-100 hover:drop-shadow-xs ${
                    openedStatus ? "" : "hidden"
                  }`
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-gray-800"></div>
            <p>{item}</p>
            {current === i ? (
              <img
                className="absolute right-[32px] w-[12px] h-[7.2px]"
                src="/src/assets/dropdownarrow.svg"
                alt="dropdowon"
              />
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
