import Button from "./Button";
import FormInput from "./FormInput";

function Login({ onShowregistration, onShowLogin }) {
  const handleShowRegistration = function () {
    onShowLogin(false);
    onShowregistration(true);
  };
  return (
    <>
      <form className="flex flex-col gap-y-6">
        <h2 className="text-xl font-bold tracking-wider md:text-3xl">
          Welcome back
        </h2>
        <FormInput type="email" labelText="Email" placeholder="Your Email" />
        <FormInput
          type="password"
          labelText="Password"
          placeholder="New Password"
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
