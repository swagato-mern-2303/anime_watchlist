import { useEffect, useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Flip, ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

function Login({ onShowregistration, onShowLogin }) {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [verified, setVerified] = useState(false);

  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({ userEmail: "", userPassword: "" });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user.emailVerified) return;
      setVerified(user.emailVerified);
    });
  });

  const handleShowRegistration = function () {
    onShowLogin(false);
    onShowregistration(true);
  };

  const validate = function (email, password) {
    const errors = {};
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    email
      ? emailRegEx.test(email)
        ? null
        : (errors.userEmail = "Invalid email address")
      : (errors.userEmail = "Email is required");

    password
      ? passwordRegEx.test(password)
        ? null
        : (errors.userPassword = "Invalid password")
      : (errors.userPassword = "Password is required");

    return errors;
  };

  const handleLogin = function (e) {
    e.preventDefault();
    setErrors(validate(userInfo.userEmail, userInfo.userPassword));

    !Object.keys(validate(userInfo.userEmail, userInfo.userPassword)).length &&
      signInWithEmailAndPassword(
        auth,
        userInfo.userEmail,
        userInfo.userPassword,
      )
        .then((userCredential) => {
          if (verified) {
            dispatch(userLoginInfo(userCredential.user));
            localStorage.setItem(
              "userLoginInfo",
              JSON.stringify(userCredential.user),
            );
            setUserInfo({ userEmail: "", userPassword: "" });
            setTimeout(onShowLogin(false), 500);
          } else {
            toast.error("Email not verified");
          }
        })
        .catch((error) => {
          setUserInfo({ userEmail: "", userPassword: "" });
          error.code.includes("auth/invalid-credential") &&
            toast.error("Invalid email and password combination");
        });
  };

  return (
    <>
      <ToastContainer
        transition={Flip}
        theme="colored"
        hideProgressBar
        autoClose={1000}
        position="top-center"
      />
      <form
        className="flex flex-col gap-y-6"
        noValidate
        onSubmit={(e) => handleLogin(e)}
      >
        <h2 className="text-xl font-bold tracking-wider md:text-3xl">
          Welcome back
        </h2>
        <FormInput
          type="email"
          labelText="Email"
          placeholder="Your Email"
          onChange={(e) =>
            setUserInfo({ ...userInfo, userEmail: e.target.value })
          }
          value={userInfo.userEmail}
          error={errors.userEmail}
        />
        <FormInput
          type="password"
          labelText="Password"
          placeholder="New Password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, userPassword: e.target.value })
          }
          value={userInfo.userPassword}
          error={errors.userPassword}
        />
        <div className="mt-4 [&>*]:w-full">
          <Button>Submit</Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <button
          className="font-bold text-green-400"
          onClick={handleShowRegistration}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default Login;
