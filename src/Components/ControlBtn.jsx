import { FaArrowUp } from "react-icons/fa6";
import { IconContext } from "react-icons";
function ControlBtn() {
  return (
    <div className="fixed bottom-0 right-0 p-5 z-10">
      <a href="#home" className="group circleBtn flex items-center justify-center hover:w-40 transition-all">
        <span className="absolute text-nowrap opacity-0 group-hover:relative group-hover:opacity-100 transition-all left-2">Back to top</span>
        <IconContext.Provider value={{ className: "w-1/3 h-1/3 rotate-45 group-hover:rotate-0 transition-all" }}>
          <FaArrowUp />
        </IconContext.Provider>
      </a>
    </div>
  );
}
export default ControlBtn;
