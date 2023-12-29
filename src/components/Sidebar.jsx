import { ImCross } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import placeholderImg from "../assets/placeholder-img.png";

const user = {
  name: "Swgoto Sarowar",
  img: placeholderImg,
};

export default function Sidebar({
  showSidebar,
  onShowSidebar,
  onShowProfileEditModal,
}) {
  return (
    <>
      <div
        className={`absolute left-0 top-0 h-screen w-full bg-black/20 backdrop-blur-[0.6rem] ${
          showSidebar ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed left-0 top-0 h-screen w-[320px] overflow-y-auto bg-black/60 text-white duration-200 ${
          showSidebar ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute left-6 top-8 p-3 text-xl"
          onClick={() => onShowSidebar(false)}
        >
          <ImCross />
        </button>
        <div className="flex flex-col items-center gap-y-12 pt-20">
          <div className="flex flex-col items-center gap-y-2">
            <img className="w-28" src={user.img} alt="" />
            <h4 className="text-xl">{user.name}</h4>
            <div className="flex items-center gap-x-2">
              <button className="rounded-lg bg-red-600 px-4 py-2 duration-200 hover:bg-red-700">
                Logout
              </button>
              <button
                className="p-2 text-2xl text-blue-100 duration-200 hover:text-blue-400"
                onClick={() => onShowProfileEditModal(true)}
              >
                <FiEdit />
              </button>
            </div>
          </div>
          <ul className="w-full">
            <li>Watch Later</li>
            <li>Already Watched</li>
            <li>Home</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
}
