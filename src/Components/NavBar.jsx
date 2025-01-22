import { useEffect, useRef } from "react";
import Social from "./Social";

function NavBar({ setIsOpenMenu, isOpenMenu }) {
  const menuRef = useRef(null);

  const assignPath = () => {
    if (!menuRef) return;
    const paths = menuRef.current.children;
    if (isOpenMenu) {
      paths[0].setAttribute("d", "M5 33L33 5");
      paths[1].setAttribute("d", "M5 5L33 33");
    } else {
      paths[0].setAttribute("d", "M1 14L38 14");
      paths[1].setAttribute("d", "M1 26L38 26");
    }
  };
  useEffect(() => {
    assignPath();
  }, [isOpenMenu]);

  return (
    <nav className="AbsoluteNav">
      <div className="w-14 h-14 max-sm:scale-75 rounded-full bg-[#3e3e3e] flex items-center justify-center font-[KyivTypeSansBoldThinMidline] text-4xl text-transparent font-outline-2">S</div>
      <button
        className="absolute right-3 text-white flex justify-end pr-5 max-sm:w-1/2 md:w-0 md:scale-0 md:absolute"
        onClick={() => {
          setIsOpenMenu((pre) => {
            return !pre;
          });
        }}
      >
        <svg ref={menuRef} className={!isOpenMenu ? "w-6 h-6 menuNOpen" : "w-6 h-6 menuOpen"} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 14L38 14" stroke="currentColor" strokeWidth="2"></path>
          <path d="M1 26L38 26" stroke="currentColor" strokeWidth="2"></path>
        </svg>
      </button>
      <div className="max-sm:w-0 max-sm:scale0 max-sm:absolute max-sm:z-[-1] max-sm:hidden">
        <Social />
      </div>
    </nav>
  );
}
export default NavBar;
