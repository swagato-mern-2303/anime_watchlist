import { ImCross } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

export default function Sidebar({
  showSidebar,
  onShowSidebar,
  onShowLogin,
  onShowProfileEditModal,
}) {
  const dispatch = useDispatch();

  const currentUserData = useSelector((state) => state.user.userInfo);

  const handleLogout = function () {
    dispatch(userLoginInfo(null));
    localStorage.removeItem("userLoginInfo");
    onShowSidebar(false);
  };

  const handleLogIn = function () {
    onShowLogin(true);
    onShowSidebar(false);
  };

  return (
    <>
      <div
        className={`absolute left-0 top-0 z-50 h-screen w-full bg-black/20 backdrop-blur-[0.6rem] ${
          showSidebar ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[320px] overflow-y-auto bg-black/60 text-white duration-200 ${
          showSidebar ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-6 top-8 p-3 text-xl"
          onClick={() => onShowSidebar(false)}
        >
          <ImCross />
        </button>
        <div className="mt-20 flex flex-col items-center">
          <div className="flex flex-col items-center gap-y-10">
            {currentUserData ? (
              <>
                <img
                  className="w-36 rounded-full"
                  src={currentUserData.photoURL}
                  alt=""
                />
                <h4 className="text-3xl font-medium">
                  {currentUserData.displayName}
                </h4>
              </>
            ) : (
              <>
                <div className="flex aspect-square w-36 items-center justify-center rounded-full bg-green-600">
                  <p className="text-7xl">A</p>
                </div>
                <h4 className="text-xl">Anonymous</h4>
              </>
            )}
            <div className="flex items-center gap-x-2">
              {currentUserData ? (
                <>
                  <button
                    className="rounded-lg bg-red-600 px-4 py-2 duration-200 hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="p-2 text-2xl text-blue-100 duration-200 hover:text-blue-400"
                    onClick={() => onShowProfileEditModal(true)}
                  >
                    <FiEdit />
                  </button>
                </>
              ) : (
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 duration-200 hover:bg-blue-800"
                  onClick={handleLogIn}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
