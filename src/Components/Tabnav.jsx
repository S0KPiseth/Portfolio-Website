function TabNav({ activeSection, isOpenMenu, setIsOpenMenu }) {
  const closeOnClick = () => {
    setIsOpenMenu && setIsOpenMenu(false);
  };
  return (
    <div className={!isOpenMenu ? "tabNav" : "tabNavOpen"}>
      <ul className="flex gap-10 max-sm:flex-col max-sm:text-5xl max-sm:text-[#5d5d5d] max-sm:items-end max-sm:pr-5">
        <li className={activeSection === "home" ? "activeTab" : ""}>
          <a href="#home" onClick={closeOnClick}>
            Home
          </a>
        </li>
        <li className={activeSection === "about" ? "activeTab" : ""}>
          <a href="#about" onClick={closeOnClick}>
            About
          </a>
        </li>
        <li className={activeSection === "project" ? "activeTab" : ""}>
          <a href="#project" onClick={closeOnClick}>
            Projects
          </a>
        </li>
        <li className={activeSection === "contact" ? "activeTab" : ""}>
          <a href="#contact" onClick={closeOnClick}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}
export default TabNav;
