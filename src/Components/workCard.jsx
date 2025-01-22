import { useEffect, useState } from "react";
import { CgLivePhoto } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import Tags from "./Tags";
import { IconContext } from "react-icons";
import ProjectConfig from "../constants/Projectconfig";
import { motion } from "motion/react";
function WorkCard({ data, setShowCustom, index }) {
  const [showDetails, setShowDetails] = useState(false);
  const languageUse = ProjectConfig[data.name + "Lang"].map((e) => {
    return <p className="text-xs text-blue-700">#{e}</p>;
  });
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: `${0.2 * index}` }}
      className={`relative overflow-hidden rounded-xl max-[1024px]:w-screen max-[1024px]:h-full group ${ProjectConfig[data.name + "Gridsize"]}`}
      onMouseEnter={() => {
        setShowCustom(data.name);
      }}
      onMouseLeave={() => {
        setShowCustom(null);
      }}
    >
      <div className="flex flex-col justify-evenly p-3 bg-black bg-opacity-70 absolute rounded-xl w-full h-full opacity-0 group-hover:opacity-100 transition-all z-10">
        <h2 className="text-lg">{data.full_name}</h2>
        <div className="flex flex-wrap gap-x-2">{languageUse}</div>

        <p className="text-xs opacity-50 h-1/2 overflow-y-scroll shadow-inner">{data.description}</p>
        <div className="flex justify-between">
          <div className="text-xs flex items-center justify-start gap-x-1">
            {data.homepage ? (
              <a className="roundBtn group/live flex justify-center items-center gap-x-1 overflow-hidden" href={data.homepage} target="blank">
                <IconContext.Provider value={{ className: "text-black socialIcons group-hover/live:motion-preset-spin group-hover/live:text-red-500 group-hover/live:w-6 group-hover/live:h-6 transition-all" }}>
                  <CgLivePhoto />
                </IconContext.Provider>
                <span className="group-hover/live:translate-x-[200%] group-hover/live:scale-0 group-hover/live:absolute font-bold transition-all">Live Demo</span>
              </a>
            ) : null}
            <a className="relative roundBtn group/git flex justify-center items-center gap-x-1 overflow-hidden" href={data.html_url} target="blank">
              <IconContext.Provider value={{ className: "text-black socialIcons group-hover/git:w-6 group-hover/git:h-6 group-hover/git:text-white transition-all" }}>
                <FaGithub />
              </IconContext.Provider>

              <span className="group-hover/git:translate-x-[200%] group-hover/git:scale-0 overflow-hidden group-hover/git:absolute font-bold transition-all">Github</span>
            </a>
          </div>
          <button></button>
        </div>
      </div>
      <div className={`w-full h-full bg-cover bg-no-repeat rounded-xl bg-center transition-all ${ProjectConfig[data.name]} bg-black bg-opacity-60 group-hover:bg-blend-darken group-hover:scale-150`}></div>
    </motion.li>
  );
}
export default WorkCard;
