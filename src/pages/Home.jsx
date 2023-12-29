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

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [listToShow, setListToShow] = useState("watchedList");
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);

  const handleShowProfileEditModal = function () {
    setShowSidebar(false);
    setShowProfileEditModal(true);
  };

  const handleCloseAllModal = function () {
    setShowLogin(false);
    setShowRegistration(false);
    setShowProfileEditModal(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    showLogin || showRegistration || showSidebar
      ? (body.style.overflowY = "hidden")
      : (body.style.overflowY = "auto");
  }, [showLogin, showRegistration, showSidebar]);

  return (
    <div className="bg-bg-color font-roboto min-h-screen px-2 pt-5 md:px-4 lg:px-6">
      <Navbar onShowLogin={setShowLogin} onShowSidebar={setShowSidebar} />
      <SideBar
        showSidebar={showSidebar}
        onShowSidebar={setShowSidebar}
        onShowProfileEditModal={handleShowProfileEditModal}
      />
      {showProfileEditModal && (
        <AccountInputBox onCloseModal={handleCloseAllModal}>
          <ProfileEditModal />
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

      <div className="text-text-color mt-4 grid h-full grid-cols-[1.25fr_2fr] gap-x-4">
        <ListBox>
          <SearchList />
        </ListBox>

        <ListBox>
          <ListToShowBox listToShow={listToShow} onListToShow={setListToShow} />
          {listToShow === "watchedList" && <WatchedList />}
          {listToShow === "watchLater" && <WatchLaterList />}
        </ListBox>
      </div>
    </div>
  );
}

function ListBox({ children }) {
  return (
    <div className="bg-bg-color-lighter h-[calc(100vh-8.5rem)] rounded-lg px-4 pt-2 shadow-lg">
      {children}
    </div>
  );
}

function ListToShowBox({ listToShow, onListToShow }) {
  return (
    <div className="text-center">
      <div className="inline-block rounded-full bg-slate-800 px-2 py-1">
        <div className="flex [&>*]:rounded-full [&>*]:px-3 [&>*]:py-2 [&>*]:font-semibold [&>*]:duration-300">
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
