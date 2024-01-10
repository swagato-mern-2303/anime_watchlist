function EmptyMsg({ message = "" }) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-xl font-bold text-white/20 md:text-3xl">
        <em>{message}</em>
      </p>
    </div>
  );
}

export default EmptyMsg;
