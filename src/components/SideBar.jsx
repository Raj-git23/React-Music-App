import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div className="mt-12">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row px-4 justify-start items-center my-7 text-md font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

export default function SideBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let logo = "../images/logo3.png";
  let avatar = "../images/avatar2.png";

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#1c1127]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
}
