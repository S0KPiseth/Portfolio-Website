import ProjectConfig from "../constants/Projectconfig";
import { FaArrowUp } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { BsJustify } from "react-icons/bs";
import { motion } from "motion/react";

// let translateClass = null;
// if (translate === 0) {
//   translateClass = "-translate-x-1/4";
// } else {
//   translateClass = "translate-x-1/4";
// }
function ProjectCardMobile({ data, translate }) {
  let translateClass = null;
  const languageUse = ProjectConfig[data.name + "Lang"].map((e, index) => {
    return (
      <p key={`${e}-${index}`} className="text-xs text-blue-700">
        #{e}
      </p>
    );
  });
  if (translate === 0) {
    translateClass = "-24%";
  } else {
    translateClass = "24%";
  }
  return (
    <>
      <motion.div initial={{ translateX: `${translate === 0 ? "-100%" : "100%"}`, opacity: 0, filter: "blur(10px)" }} whileInView={{ translateX: translateClass, opacity: 1, filter: "blur(0px)" }} className={`w-full rounded-3xl aspect-video mx-auto ${ProjectConfig[data.name]} bg-contain bg-center`}></motion.div>
      <motion.div initial={{ opacity: 0, y: 75 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={!(translate === 0) ? "text-left p-3" : "text-right p-3"}>
        <h1 className="font-norma">{data.full_name}</h1>
        <div className={`${translate === 0 ? "flex justify-end" : "flex justify-start"}`}>{languageUse}</div>
        <p className="text-base opacity-75">{data.description || "No Description Provided"}</p>
        <br />
        <div className={`flex text-xl tracking-widest uppercase ${translate === 0 ? "justify-end" : "justify-start"}`}>
          {data.homepage ? (
            <a href={data.homepage} target="blank" className="">
              Demo
            </a>
          ) : null}
          <a href={data.html_url} target="blank" className="group ml-2 flex items-center gap-x-1 border-white border-b-2">
            Github
            <span>
              <IconContext.Provider value={{ className: "rotate-45 transition-all" }}>
                <FaArrowUp />
              </IconContext.Provider>
            </span>
          </a>
        </div>
        <br />
      </motion.div>
    </>
  );
}
export default ProjectCardMobile;
