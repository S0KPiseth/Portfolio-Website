import { useRef } from "react";

function TechIcons({ Icon, name }) {
  const hoverRef = useRef(null);
  return (
    <div
      className="flex items-center gap-x-2 text-white font-normal text-base cursor-pointer"
      ref={hoverRef}
      onMouseEnter={() => {
        hoverRef.current.classList.add("motion-preset-seesaw");
      }}
      onMouseLeave={() => {
        console.log("hi");
        hoverRef.current.classList.remove("motion-preset-seesaw");
      }}
    >
      {Icon}
      <p>{name}</p>
    </div>
  );
}
export default TechIcons;
