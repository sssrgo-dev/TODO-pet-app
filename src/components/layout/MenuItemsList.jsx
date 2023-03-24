import MenuItem from "../elements/MenuItem";

export default function MenuItemsList({ children }) {
  const active = 0; // it should be determined by app logic
  return (
    <ul className="grow flex flex-col p-[24px]">
      {children.map(({ svg, item, qty }, i) => (
        <MenuItem
          key={i}
          svg={svg}
          item={item}
          qty={qty}
          isActive={i === active}
          index={i}
        />
      ))}
    </ul>
  );
}
