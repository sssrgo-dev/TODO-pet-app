import { useState } from "react";

export default function ProjectPickerItem({ item, isCurrent }) {
  const [openedStatus, setOpennedStatus] = useState(false);

  return (
    <li
      onClick={isCurrent ? () => setOpennedStatus(!openedStatus) : null}
      className="flex-none flex gap-[8px] p-[24px] items-center relative hover:bg-slate-100 hover:drop-shadow-xs"
    >
      <div className="w-6 h-6 rounded-md bg-gray-800 "></div>
      <p>{item}</p>
      {isCurrent ? (
        <img
          className="absolute right-[32px] w-[12px] h-[7.2px]"
          src="/src/assets/dropdownarrow.svg"
          alt="dropdowon"
        />
      ) : (
        ""
      )}
    </li>
  );
}
