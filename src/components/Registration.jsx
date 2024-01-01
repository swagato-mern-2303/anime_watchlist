import placeholderImg from "../assets/placeholder-img.png";
import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, Zoom, toast } from "react-toastify";

export default function Registration({ onShowLogin, onShowregistration }) {
  const auth = getAuth();

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleShowLogin = function () {
    onShowLogin(true);
    onShowregistration(false);
  };

  const validate = function (name, email, password, confirmPassword) {
    const errors = {};
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    name ? null : (errors.userName = "Name is required");

    email
      ? emailRegEx.test(email)
        ? null
        : (errors.userEmail = "Invalid email address")
      : (errors.userEmail = "Email is required");

    password
      ? confirmPassword
        ? passwordRegEx.test(password)
          ? password === confirmPassword
            ? null
            : (errors.userConfirmPassword = "Please enter same password")
          : (errors.userPassword =
              "Password requirement (min. length 8, (A-Z), (a-z), (0-9))")
        : (errors.userConfirmPassword = "Password is required")
      : (errors.userPassword = "Password is required");

    return errors;
  };

  const handleRegistration = function (e) {
    e.preventDefault();
    setErrors(
      validate(
        userInfo.userName,
        userInfo.userEmail,
        userInfo.userPassword,
        userInfo.userConfirmPassword,
      ),
    );

    !Object.keys(
      validate(
        userInfo.userName,
        userInfo.userEmail,
        userInfo.userPassword,
        userInfo.userConfirmPassword,
      ),
    ).length &&
      createUserWithEmailAndPassword(
        auth,
        userInfo.userEmail,
        userInfo.userPassword,
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: userInfo.userName,
            photoURL: placeholderImg,
          });
        })
        .then(() =>
          sendEmailVerification(auth.currentUser).then(() => {
            setUserInfo({
              userName: "",
              userEmail: "",
              userPassword: "",
              userConfirmPassword: "",
            });
            setTimeout(() => onShowregistration(false), 3000);
            toast.success("Successfully registered. Please verify your email");
          }),
        )
        .catch((error) => {
          error.code.includes("auth/email-already-in-use") &&
            setErrors((cur) => ({ ...cur, userEmail: "Email already in use" }));
        });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Zoom}
        autoClose={2000}
      />
      <form
        className="flex flex-col gap-y-6"
        noValidate
        onSubmit={(e) => handleRegistration(e)}
      >
        <h2 className="text-xl font-bold tracking-wider md:text-3xl">
          Create Account
        </h2>
        <FormInput
          labelText="Full Name"
          placeholder="Your Name"
          value={userInfo.userName}
          onChange={(e) =>
            setUserInfo((cur) => ({ ...cur, userName: e.target.value }))
          }
          error={errors.userName}
        />
        <FormInput
          type="email"
          labelText="Email"
          placeholder="Your Email"
          value={userInfo.userEmail}
          onChange={(e) =>
            setUserInfo((cur) => ({ ...cur, userEmail: e.target.value }))
          }
          error={errors.userEmail}
        />
        <FormInput
          type="password"
          labelText="Password"
          placeholder="New Password"
          value={userInfo.userPassword}
          onChange={(e) =>
            setUserInfo((cur) => ({ ...cur, userPassword: e.target.value }))
          }
          error={errors.userPassword}
        />
        <FormInput
          type="password"
          labelText="Confirm Password"
          placeholder="Re-enter Password"
          value={userInfo.userConfirmPassword}
          onChange={(e) =>
            setUserInfo((cur) => ({
              ...cur,
              userConfirmPassword: e.target.value,
            }))
          }
          error={errors.userConfirmPassword}
        />{" "}
        <div className="mt-4 [&>*]:w-full">
          <Button>Submit</Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        Have an account?{" "}
        <button className="font-bold text-green-400" onClick={handleShowLogin}>
          Login
        </button>
      </div>
    </>
  );
}
