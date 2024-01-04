import { ImCross } from "react-icons/im";
function AccountInputBox({ children, onCloseModal }) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto bg-black/20 text-text-color backdrop-blur-[0.6rem]">
      <div className="relative h-fit w-[18rem] rounded-xl bg-black/60 p-4 md:w-[22rem] md:p-8 lg:w-[26rem] lg:p-10">
        <button
          className="text-2x absolute right-1 top-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 text-black"
          onClick={onCloseModal}
        >
          <ImCross />
        </button>
        {children}
      </div>
    </div>
  );
}

export default AccountInputBox;
