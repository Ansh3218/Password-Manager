import React from "react";

const Navbar = () => {
  return (
    <div className="bg-transparent text-white w-full">
      <nav className="flex p-3 justify-between items-center h-20 w-[100%]">
        <div className="pass font-semibold text-[18px]">
          <span className="text-green-400 font-extralight">&lt;</span>
          Pass
          <span className="text-green-400 font-extralight">OP/&gt;</span>
          </div>
        <ul className="flex gap-5 ">
          <li><a href="" className="transition-all duration-300 hover:font-semibold hover:text-[18px]">Home</a></li>
          <li><a href="" className="transition-all duration-100 hover:font-semibold hover:text-[18px]">About</a></li>
          <li><a href="" className="transition-all duration-100 hover:font-semibold hover:text-[18px]">Contact</a></li>
          <li><a href="" className="transition-all duration-300 hover:font-semibold hover:text-[18px]">Service</a></li>
        </ul>
      <div className="icon-container w-[5%] flex gap-2 justify-center f-family">
        <abbr title="Facebook">
        <lord-icon
          src="https://cdn.lordicon.com/lplofcfe.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
        ></lord-icon>
        </abbr>
        <abbr title="Instagram">
        <lord-icon
          src="https://cdn.lordicon.com/cuwcpyqc.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
        ></lord-icon>
        </abbr>
        <abbr title="Github">
        <lord-icon
          src="https://cdn.lordicon.com/ubpgwkmy.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
        ></lord-icon></abbr>
      </div>
      </nav>
    </div>
  );
};

export default Navbar;
