import { IconContext } from "react-icons";
import { RiTailwindCssFill } from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import TechIcons from "./TechIcons";
import * as FaIcons from "react-icons/fa6";
import { useRef } from "react";
import { SiSqlite } from "react-icons/si";

function Slider({ ariaHidden }) {
  const stopSlider = () => {
    const sliders = document.querySelectorAll(".animate-infinite-scroll");
    sliders.forEach((e) => {
      const running = e.style.animationPlayState === "running";
      e.style.animationPlayState = running ? "paused" : "running";
    });
  };

  return (
    <ul className="flex gap-x-2 animate-infinite-scroll relative" style={{ animationPlayState: "running" }} aria-hidden={ariaHidden ? "true" : "false"} onMouseEnter={stopSlider} onMouseLeave={stopSlider}>
      <IconContext.Provider value={{ color: "white", className: "w-8 h-8" }}>
        <li>
          <TechIcons Icon={<IoIcons.IoLogoJavascript />} name={"javascript"} />
        </li>
        <li>
          <TechIcons Icon={<FaIcons.FaJava />} name={"Java"} />
        </li>
        <li>
          <TechIcons Icon={<FaIcons.FaPython />} name={"Python"} />
        </li>
        <li>
          <TechIcons Icon={<SiSqlite />} name={"SQLite"} />
        </li>
        <li>
          <TechIcons Icon={<FaIcons.FaHtml5 />} name={"Html"} />
        </li>
        <li>
          <TechIcons Icon={<IoIcons.IoLogoCss3 />} name={"CSS"} />
        </li>
        <li>
          <TechIcons Icon={<FaIcons.FaReact />} name={"React"} />
        </li>
        <li>
          <TechIcons Icon={<RiTailwindCssFill />} name={"Tailwind"} />
        </li>
        <li>
          <TechIcons Icon={<FaIcons.FaFlutter />} name={"Flutter"} />
        </li>
      </IconContext.Provider>
    </ul>
  );
}
export default Slider;
