import Clock from "./Components/Clock";
import NavBar from "./Components/NavBar";
import TabNav from "./Components/Tabnav";
import * as FaIcons from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useEffect, useRef, useState } from "react";
import Slider from "./Components/Slider";
import WorkCard from "./Components/workCard";
import Social from "./Components/Social";
import { BsQrCode } from "react-icons/bs";
import { PROJECTS } from "./constants/projects";
import ControlBtn from "./Components/ControlBtn";
import ProjectCardMobile from "./Components/ProjectCardMobile";
import { motion } from "motion/react";

function App() {
  const pointerRef = useRef(null);
  const [showCustom, setShowCustom] = useState(null);
  const mvArea = useRef(null);
  const [fullLoad, setFullLoad] = useState(false);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 640px)").matches);

  let seletedProject = null;
  let projectComponentsTop = null;
  let projectComponentsBottom = null;
  const customPointer = (e) => {
    if (!pointerRef.current || !mvArea) return;
    const displayArea = mvArea.current.getBoundingClientRect();
    if (displayArea.top < e.clientY < displayArea.bottom) {
      pointerRef.current.style.left = `${e.clientX}px`;
      pointerRef.current.style.top = `${e.clientY + 20}px`;
    }
  };

  const [repoData, setRepoData] = useState(null);
  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [isOpenMenu]);
  useEffect(() => {
    const matchMedia = window.matchMedia("(max-width: 640px)");
    const match = () => {
      if (matchMedia.matches) {
        setIsMobile(true);
      } else if (!matchMedia.matches) {
        setIsMobile(false);
      }
    };

    matchMedia.addEventListener("change", match);
    return () => matchMedia.removeEventListener("change", match);
  }, []);
  useEffect(() => {
    fetch(`https://api.github.com/users/s0kPiseth/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepoData(data);
      })
      .catch((error) => {
        console.error("Error fetching repo data:", error);
      });
  }, []);

  if (repoData) {
    seletedProject = repoData.filter((e) => {
      return PROJECTS.includes(e.name);
    });
    if (!isMobile) {
      projectComponentsTop = seletedProject.slice(0, 6).map((e, indx) => {
        return <WorkCard index={indx} key={`${e}top-${indx}`} data={e} setShowCustom={setShowCustom} />;
      });
      projectComponentsBottom = seletedProject.slice(6, seletedProject.length).map((e, indx) => {
        return <WorkCard index={indx} key={`${e}bottom-${indx}`} data={e} setShowCustom={setShowCustom} />;
      });
    } else {
      projectComponentsTop = seletedProject.map((e, idx) => {
        return <ProjectCardMobile data={e} key={`${e}new-${idx}`} translate={idx % 2} />;
      });
    }
  }
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const targets = document.querySelectorAll(".tab");
    if (targets.length === 0) return;
    const options = {
      root: null, //viewport
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    // IntersectionObserver callback
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [fullLoad]);
  const handleScroll = (e) => {
    const end = e.target.scrollWidth - e.target.scrollLeft === 0;
    if (end) {
      e.target.scroll(0, 0);
    }
  };
  return (
    <>
      <Clock fullLoad={fullLoad} setFullLoad={setFullLoad} />
      {fullLoad && seletedProject != null ? (
        <>
          <NavBar setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
          {activeSection != "home" ? <ControlBtn /> : null}
          <section className="tab motion-preset-fade motion-duration-1000 overflow-hidden w-full h-screen" id="home">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-8xl max-sm:text-5xl flex justify-center flex-col text-white font-bold items-center h-screen gap-y-5 max-sm:gap-y-0">
              <div className="w-fit">
                <div className="flex items-center gap-x-3">
                  <p>Hi, I’m Seth</p>
                  <img className="w-24 max-sm:w-14 hover:motion-preset-shake" src="https://em-content.zobj.net/source/apple/271/waving-hand_1f44b.png" alt="hi" />
                </div>

                <p className="radial-gradient w-fit">Web Developer</p>
                <div className="flex items-center gap-1">
                  <IconContext.Provider value={{ color: "white", className: "w-3 h-4 opacity-70" }}>
                    <FaIcons.FaLocationDot />
                    <p className="text-lg font-medium opacity-70">Phnom Penh, Cambodia</p>
                  </IconContext.Provider>
                </div>
              </div>
            </motion.div>
          </section>
          <section className="tab h-screen w-full relative overflow-hidden pr-0" id="about">
            <div className="absolute">
              <svg className="">
                <filter id="grainy">
                  <feTurbulence type="turbulence" baseFrequency=".4" />
                </filter>
              </svg>
            </div>

            <div className="text-lg p-7 max-sm:p-3 max-sm:text-sm  m-auto flex flex-col text-white font-bold gap-y-5">
              <motion.div transition={{ duration: 0.5 }} initial={{ y: 75, opacity: 0, x: "-100%", filter: "blur(10px)" }} whileInView={{ y: 0, opacity: 1, x: 0, filter: "blur(0px)" }}>
                <h1 className="text-5xl max-sm:text-3xl w-fit">ABOUT</h1>
                <br />
                <p className="w-1/2 max-sm:w-2/3 font-normal text-gray-400">Hi, I’m a web developer with a focus on creating functional, clean, and minimalist websites and applications. I enjoy building projects that are simple to use and look great, without unnecessary clutter. I work with HTML, CSS, JavaScript, React and Python aim to deliver solutions that are both efficient and user-friendly. Feel free to look around my portfolio and reach out if you’d like to collaborate or learn more about my work.</p>
              </motion.div>

              <motion.div transition={{ duration: 0.5 }} initial={{ y: 75, opacity: 0, x: "-100%", filter: "blur(10px)" }} whileInView={{ y: 0, opacity: 1, x: 0, filter: "blur(0px)" }}>
                <h2 className="text-3xl max-sm:text-xl">Tech Stack</h2>
                <br />
                <div className="w-1/2 py-5 inline-flex max-sm:w-2/3 flex-nowrap overflow-hidden gap-x-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                  <Slider />
                  <Slider ariaHidden={true} />
                </div>
              </motion.div>
              <motion.div transition={{ duration: 0.5 }} initial={{ y: 75, opacity: 0, x: "-100%", filter: "blur(10px)" }} whileInView={{ y: 0, opacity: 1, x: 0, filter: "blur(0px)" }}>
                <h2 className="text-3xl max-sm:text-xl">Experience</h2>
                <br />
                <p className="w-1/2 max-sm:w-2/3 font-normal text-gray-400">I’m currently building my skills as a web developer by working on personal projects and learning modern web development tools and techniques. While I don’t have professional experience yet, I’m committed to creating clean, functional, and minimalist websites and applications.</p>
              </motion.div>
            </div>
            {/* "absolute w-1/2 h-full scale-[1.1] bg-contain bg-top bg-[url('/Image/me.png')] bg-no-repeat left-1/2 top-10 z-[-1]" */}
            <div className="absolute flex w-1/2 max-sm:w-full h-full right-0 top-[-5%] overflow-hidden flex-col justify-start">
              <div className="group relative top-1/4 scale-[1.5] bg-cover w-full h-full bg-me3d bg-no-repeat hover:bg-[url('/Image/me2.png')] transition-all bg-blend-overlay max-sm:z-[-1] max-sm:bg-left">
                <p className="max-[1024px]:opacity-0 max-[1024px]:after:opacity-0 max-[1024px]:before:w-0 inline-block max-[1024px]:rotate-180 max-[1024px]:top-[30%] max-[1024px]:left-[10%] max-[1024px]:transition-none xl:rotate-0 group-hover:after:w-1/2 absolute h-fit max-w-[250px] text-[10px] text-white right-[20%] top-16 tips">
                  <span className="max-[1024px]:opacity-0 inline-block text-wrap w-[150px] max-[1024px]:rotate-[-180deg]">Thank you for visiting!</span>
                </p>
              </div>
              <div className="blendBg w-full h-40 absolute bottom-0 max-sm:z-[-1]"></div>
              <div className="md:scale-0 bg-blurVt z-[-1] w-full h-full absolute"></div>
            </div>
          </section>
          <section
            id="project"
            ref={mvArea}
            className="tab relative z-[1] h-screen  w-full text-3xl max-sm:h-fit text-white flex flex-col gap-y-2 customCursor p-7 pb-0 max-[1024px]:px-0"
            onMouseMove={customPointer}
            onMouseLeave={() => {
              setShowCustom(null);
            }}
          >
            {showCustom != null ? (
              <p className="fixed ml-6 text-xs bg-white text-black rounded-3xl rounded-tl-none p-1 z-50 shadow-xl" ref={pointerRef}>
                {showCustom}
              </p>
            ) : null}
            <h1 className="text-5xl font-bold max-[1024px]:pl-7 max-sm:p-2 max-sm:text-3xl">PROJECTS</h1>
            <div className="max-sm:w-full h-full flex flex-col gap-y-2 overflow-hidden">
              {!isMobile ? (
                <>
                  <br />
                  <div className="w-full h-full flex gap-x-2 xl:h-[70%] hover:overflow-x-scroll">
                    <ul className="portfolio-items xl:grid-rows-4 xl:h-full max-[1024px]:animate-infinite-scroll">{projectComponentsTop}</ul>
                    <ul className="xl:opacity-0 xl:absolute xl:w-0 portfolio-items xl:grid-rows-4 xl:0 max-[1024px]:animate-infinite-scroll " aria-hidden={true}>
                      {projectComponentsTop}
                    </ul>
                  </div>
                  <div className="w-full h-full flex gap-x-2 xl:h-[35%] hover:overflow-x-scroll">
                    <ul className="portfolio-items xl:grid-rows-2 xl:h-full max-[1024px]:animate-reverse-infinite-scroll">{projectComponentsBottom}</ul>
                    <ul className="xl:opacity-0 xl:absolute xl:w-0 portfolio-items xl:grid-rows-4 xl:0 max-[1024px]:animate-reverse-infinite-scroll" aria-hidden={true}>
                      {projectComponentsBottom}
                    </ul>
                  </div>
                </>
              ) : (
                // mobile
                <div className="font-normal">{projectComponentsTop}</div>
              )}
            </div>
          </section>
          <section className="tab sticky top-0 z-[-1] h-screen w-full overflow-hidden" id="contact">
            <div className="h-screen w-full flex items-center justify-center text-[220px] text-[#5d5d5d] text-opacity-40 font-bold text-nowrap max-[1024px]:text-9xl max-sm:text-5xl">GET IN TOUCH</div>
          </section>
          <div className="w-full h-screen flex items-center justify-center">
            <div className="relative w-2/4 h-3/5 rounded-3xl max-sm:rounded-xl bg-backgroundPrimary flip-card max-[1024px]:w-4/5 max-[1024px]:h-1/2 max-sm:w-11/12 max-sm:h-[30%] max-2xl:w-7/12">
              <motion.div initial={isMobile && { rotateY: "0deg" }} whileInView={isMobile && { rotateY: "180deg" }} transition={{ delay: 0.5 }} className="flip-card-inner shadow-neumorphism rounded-3xl max-sm:rounded-xl element-2">
                <div className="flip-card-front bg-backgroundPrimary rounded-3xl max-sm:rounded-xl flex justify-center">
                  <div className="absolute right-0 top-0 p-3">
                    <div className="w-14 h-14 max-sm:w-10 max-sm:h-10 rounded-full bg-[#3e3e3e] flex items-center justify-center font-[KyivTypeSansBoldThinMidline] text-4xl max-sm:text-2xl text-transparent font-outline-2">S</div>
                  </div>
                  <div className="text-8xl max-sm:text-5xl h-full text-white font-serif font-bold p-5 text-left flex flex-col justify-center">
                    <h2>Piseth</h2>
                    <h2 className="before:content-['Piseth'] before:text-transparent">SOK</h2>
                    <p className="text-xl max-sm:text-base text-green-600 text-center">Available for Hire!</p>
                  </div>
                </div>
                <div className="flip-card-back bg-backgroundPrimary rounded-3xl max-sm:rounded-xl text-white flex flex-col">
                  <div className="flex flex-col gap-0">
                    <div className="flex items-center justify-between p-5 max-sm:p-3 max-sm:pb-1">
                      <h2 className="text-left pb-0 text-4xl max-sm:text-xl font-bold  max-lg:text-xl">Do you have anything in mind?</h2>
                      <IconContext.Provider value={{ color: "white", className: "ContactIcons" }}>
                        <Social />
                      </IconContext.Provider>
                    </div>

                    <p className="text-left p-5 pb-0 max-sm:p-3 max-sm:pb-0 max-sm:pt-0 pt-0 max-sm:text-base">Send me a message</p>
                  </div>

                  <form action="https://formspree.io/f/xnnjarjp" target="blank" method="post" className="w-full h-fit flex flex-col bg-backgroundPrimary rounded-3xl p-5 pt-2 justify-evenly max-sm:text-xs max-sm:p-3 max-sm:pt-1 flex-grow">
                    <input type="text" className="contactInput" placeholder="Name" name="name" required autoComplete="off" />
                    <input type="email" className="contactInput" placeholder="Email" name="email" required autoComplete="off" />
                    <input type="text" className="contactInput" placeholder="Message" name="message" required autoComplete="off" />
                    <input type="submit" value="Sent" className="font-bold bg-[#5d5d5d] w-fit p-2 rounded-3xl px-5 uppercase hover:bg-white hover:text-black max-sm:p-1 max-sm:px-3" />
                  </form>
                  <a href="https://t.me/PisethS0K" target="blank" className="absolute group bottom-0 right-0 p-5 max-sm:p-2 max-sm:pt-1 flex items-center gap-x-8 max-sm:gap-x-2">
                    <p className="opacity-0 p-2 group-hover:opacity-100 bg-[#5d5d5d] rounded-lg motion-preset-oscillate max-sm:opacity-100 max-sm:text-xs">Scan for Telegram</p>
                    <div className="h-14 w-14 bg-[url(/Image/telegramQr.png)] bg-cover max-sm:h-10 max-sm:w-10"></div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
          <TabNav activeSection={activeSection} isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        </>
      ) : null}
    </>
  );
}

export default App;
