import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div className="mt-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row px-4 justify-start items-center my-6 text-md font-medium text-gray-400 hover:text-white/75 focus-within:text-white"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const SideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let logo = "../images/lofgo6.jpg";
  let avatar = "../images/avatar2.png";

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] pt-8 px-4 bg-[#1b1515]">
        <img src={logo} alt="logo" className="w-full h-fit bg-origin-content rounded-full object-contain filter invert-brightness-contrast" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden z-10 block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-10 h-10 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-10 h-10 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#141428] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default SideBar;
