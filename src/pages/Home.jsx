import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Registration from "../components/Registration";
import Login from "../components/Login";
import AccountInputBox from "../components/AccountInputBox";
import SideBar from "../components/Sidebar";
import SearchList from "../components/SearchList";
import WatchLaterList from "../components/WatchLaterList";
import WatchedList from "../components/WatchedList";
import ProfileEditModal from "../components/ProfileEditModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

export default function Home() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [listToShow, setListToShow] = useState("watchedList");
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [searchAnimeList, setSearchAnimeList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(null);

  const handleShowProfileEditModal = function () {
    setShowSidebar(false);
    setShowProfileEditModal(true);
  };

  const handleCloseAllModal = function () {
    setShowLogin(false);
    setShowRegistration(false);
    setShowProfileEditModal(false);
  };

  const handleSearch = function (animeName) {
    async function getAnimeList() {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`,
        );
        const data = await response.json();
        setSearchAnimeList(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        if (windowWidth < 768) {
          console.log("hello");
          setListToShow("searchList");
        }
      }
    }
    getAnimeList();
  };

  useEffect(() => {
    const body = document.querySelector("body");
    showLogin || showRegistration || showSidebar
      ? (body.style.overflowY = "hidden")
      : (body.style.overflowY = "auto");
  }, [showLogin, showRegistration, showSidebar]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(() => userLoginInfo(user));
      localStorage.setItem("userLoginInfo", JSON.stringify(user));
    });
  }, [auth, dispatch]);

  return (
    <div className="min-h-screen bg-bg-color px-2 pt-5 font-roboto md:px-4 lg:px-6">
      <Navbar
        onShowLogin={setShowLogin}
        onShowSidebar={setShowSidebar}
        showSearch={showSearch}
        onShowSearch={setShowSearch}
        onSearch={handleSearch}
      />
      <SideBar
        showSidebar={showSidebar}
        onShowSidebar={setShowSidebar}
        onShowLogin={setShowLogin}
        onShowProfileEditModal={handleShowProfileEditModal}
      />
      {showProfileEditModal && (
        <AccountInputBox onCloseModal={handleCloseAllModal}>
          <ProfileEditModal onCloseAllModal={handleCloseAllModal} />
        </AccountInputBox>
      )}

      {(showLogin || showRegistration) && (
        <AccountInputBox onCloseModal={handleCloseAllModal}>
          {showLogin && (
            <Login
              onShowLogin={setShowLogin}
              onShowregistration={setShowRegistration}
            />
          )}
          {showRegistration && (
            <Registration
              onShowLogin={setShowLogin}
              onShowregistration={setShowRegistration}
            />
          )}
        </AccountInputBox>
      )}

      <div className="mt-4 h-full grid-cols-[1.25fr_2fr] gap-x-4 text-text-color md:grid">
        <div className="hidden md:block">
          <ListBox showSearch={showSearch}>
            <SearchList searchAnimeList={searchAnimeList} />
          </ListBox>
        </div>

        <div>
          <ListBox showSearch={showSearch}>
            <ListToShowBox
              listToShow={listToShow}
              onListToShow={setListToShow}
            />
            {listToShow === "searchList" && (
              <SearchList searchAnimeList={searchAnimeList} />
            )}
            {listToShow === "watchedList" && <WatchedList />}
            {listToShow === "watchLater" && <WatchLaterList />}
          </ListBox>
        </div>
      </div>
    </div>
  );
}

function ListBox({ showSearch, children }) {
  return (
    <div
      className={`relative rounded-lg bg-bg-color-lighter px-4 pt-2 shadow-lg ${
        showSearch ? "h-[calc(100vh-11rem)]" : "h-[calc(100vh-8.5rem)]"
      }`}
    >
      {children}
    </div>
  );
}

function ListToShowBox({ listToShow, onListToShow }) {
  return (
    <div className="mb-2 text-center">
      <div className="inline-block rounded-full bg-slate-800 px-2 py-1">
        <div className="flex [&>*]:rounded-full [&>*]:px-3 [&>*]:py-2 [&>*]:text-xs [&>*]:font-semibold [&>*]:duration-300 [&>*]:md:text-base">
          <button
            className={`md:hidden
              ${
                listToShow === "searchList"
                  ? "bg-primary-color shadow-[0_5px_10px_0_rgba(0,0,0,0.5)]"
                  : null
              }
            `}
            onClick={() => onListToShow("searchList")}
          >
            Search List
          </button>
          <button
            className={
              listToShow === "watchedList"
                ? "bg-primary-color shadow-[0_5px_10px_0_rgba(0,0,0,0.5)]"
                : null
            }
            onClick={() => onListToShow("watchedList")}
          >
            Watched List
          </button>
          <button
            className={
              listToShow === "watchLater"
                ? "bg-primary-color shadow-[0_5px_10px_0_rgba(0,0,0,0.5)]"
                : null
            }
            onClick={() => onListToShow("watchLater")}
          >
            Watch Later
          </button>
        </div>
      </div>
    </div>
  );
}
