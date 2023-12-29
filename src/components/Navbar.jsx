import navLogo from "../assets/logo2.png";
// import placeholderImg from "../assets/placeholder-img.png";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";

export default function Navbar({ onShowLogin, onShowSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-primary-color text-text-color rounded-lg px-2 py-4 md:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6">
          <button onClick={() => onShowSidebar(true)}>
            <FaBars size={28} />
          </button>
          <div className="flex items-center">
            <img
              className="w-[2rem] md:w-[2.5rem] lg:w-[3.2rem]"
              src={navLogo}
              alt=""
            />
            <div className="font-obitron text-center text-sm text-blue-950 md:text-lg lg:text-xl [&>*]:leading-none">
              <p>
                A <span className="text-sm text-blue-200/80">for</span>
              </p>
              <p>Anime</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <form className="flex w-full gap-x-2">
            <SearchInput
              className="w-[20rem] lg:w-[25rem]"
              placeholder="Search for anime..."
            />
            <Button>
              <FaSearch />
            </Button>
          </form>
        </div>

        <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-6">
          <Button
            className="md:hidden"
            onClick={() => setShowSearch((show) => !show)}
          >
            {showSearch ? <FaTimes /> : <FaSearch />}
          </Button>
          {/* {user?.id ? (
            <div className="w-[2.5rem] lg:w-[3.2rem]">
              <img src={user.img} alt="" />
            </div>
          ) : (
            <Button onClick={() => onShowLogin(true)}>Login</Button>
          )} */}
          <Button onClick={() => onShowLogin(true)}>Login</Button>
        </div>
      </div>

      <div
        className={`mt-4 justify-center md:hidden ${
          showSearch ? "flex" : "hidden"
        }`}
      >
        <form className="flex w-full gap-x-2">
          <SearchInput className="w-full" placeholder="Search for anime..." />
          <Button>
            <FaSearch />
          </Button>
        </form>
      </div>
    </div>
  );
}

function SearchInput({ className, placeholder }) {
  return (
    <input
      className={`bg-primary-color-lighter placeholder:text-text-dark-color rounded-md px-4 py-2 text-xl font-medium transition duration-200 focus:-translate-y-[2px] focus:shadow-[0px_5px_10px_0_rgba(0,0,0,0.2)] focus-visible:outline-none ${className}`}
      type="text"
      placeholder={placeholder}
    />
  );
}
