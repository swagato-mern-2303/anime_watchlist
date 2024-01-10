import navLogo from "../assets/logo2.png";
import { FaSearch, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar({
  onShowLogin,
  onShowSidebar,
  showSearch,
  onShowSearch,
  onSearch,
  onSelectedId,
}) {
  const [search, setSearch] = useState("");

  const currentUserData = useSelector((state) => state.user.userInfo);

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!search) return;
    onSearch(search);
    setSearch("");
    onSelectedId("");
  };

  return (
    <div className="rounded-lg bg-primary-color px-2 py-4 text-text-color md:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6">
          <div className="flex items-center">
            <img
              className="w-[2rem] md:w-[2.5rem] lg:w-[3.2rem]"
              src={navLogo}
              alt=""
            />
            <div className="text-center font-obitron text-sm text-blue-950 md:text-lg lg:text-xl [&>*]:leading-none">
              <p>
                A <span className="text-sm text-blue-200/80">for</span>
              </p>
              <p>Anime</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <form
            className="flex w-full gap-x-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <SearchInput
              className="w-[20rem] lg:w-[25rem]"
              placeholder="Search for anime..."
              search={search}
              onSetSearch={setSearch}
            />
            <Button>
              <FaSearch />
            </Button>
          </form>
        </div>

        <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-6">
          <Button
            className="md:hidden"
            onClick={() => onShowSearch((show) => !show)}
          >
            {showSearch ? <FaTimes /> : <FaSearch />}
          </Button>
          {currentUserData ? (
            <div
              className="h-[2.5rem] w-[2.5rem] cursor-pointer rounded-full duration-200 hover:-translate-y-[2px] hover:shadow-[0px_5px_10px_0_rgba(0,0,0,0.2)] lg:h-[3.2rem] lg:w-[3.2rem]"
              onClick={() => onShowSidebar(true)}
            >
              <img
                className="w-full rounded-full"
                src={currentUserData.photoURL}
                alt="user profile image"
              />
            </div>
          ) : (
            <Button onClick={() => onShowLogin(true)}>Login</Button>
          )}
        </div>
      </div>

      <div
        className={`mt-4 justify-center md:hidden ${
          showSearch ? "flex" : "hidden"
        }`}
      >
        <form className="flex w-full gap-x-2" onSubmit={(e) => handleSubmit(e)}>
          <SearchInput
            className="w-full"
            placeholder="Search for anime..."
            search={search}
            onSetSearch={setSearch}
          />
          <Button>
            <FaSearch />
          </Button>
        </form>
      </div>
    </div>
  );
}

function SearchInput({ className, placeholder, onSetSearch, search }) {
  return (
    <input
      className={`rounded-md bg-primary-color-lighter px-4 py-2 text-xl font-medium transition duration-200 placeholder:text-text-dark-color focus:-translate-y-[2px] focus:shadow-[0px_5px_10px_0_rgba(0,0,0,0.2)] focus-visible:outline-none ${className}`}
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => onSetSearch(e.target.value)}
    />
  );
}
