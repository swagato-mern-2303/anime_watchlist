function Button({ children, className, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary-color-lighter rounded-lg px-4 py-2 text-lg font-medium duration-200 hover:-translate-y-[2px] hover:shadow-[0px_5px_10px_0_rgba(0,0,0,0.2)] md:text-xl ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
