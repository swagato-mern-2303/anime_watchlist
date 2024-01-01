import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function FormInput({
  label = true,
  labelText = "label text",
  type = "text",
  placeholder = "placeholder",
  onChange,
  value,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label
          className="mb-3 block text-lg font-medium leading-none md:text-xl"
          htmlFor="name"
        >
          {labelText}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full rounded-lg bg-blue-50 p-2 text-lg text-black placeholder:text-black/40 focus-visible:outline-none ${
            type === "password" ? "pr-8" : null
          }`}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-lg text-black"
            onClick={() => setShowPassword((show) => !show)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
      <p className="text-red-400">{error}</p>
    </div>
  );
}
