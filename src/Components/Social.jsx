import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
function Social() {
  return (
    <div className="flex gap-x-3 max-sm:gap-x-1">
      <a href="https://github.com/S0KPiseth" className="hover:motion-preset-oscillate" target="blank">
        <FaGithub />
      </a>

      <a href="https://www.linkedin.com/in/piseth-sok-21b65a289/" className="rounded-full hover:motion-preset-oscillate" target="blank">
        <FaLinkedinIn />
      </a>
      <a href="mailto:piseth.sok.dev@gmail.com" target="blank" className="hover:motion-preset-oscillate">
        <MdEmail />
      </a>
    </div>
  );
}
export default Social;
