import Button from "./Button";
import FormInput from "./FormInput";

export default function Registration({ onShowLogin, onShowregistration }) {
  const handleShowLogin = function () {
    onShowLogin(true);
    onShowregistration(false);
  };
  return (
    <>
      <form className="flex flex-col gap-y-6">
        <h2 className="text-xl font-bold tracking-wider md:text-3xl">
          Create Account
        </h2>
        <FormInput labelText="Full Name" placeholder="Your Name" />
        <FormInput type="email" labelText="Email" placeholder="Your Email" />
        <FormInput
          type="password"
          labelText="Password"
          placeholder="New Password"
        />
        <FormInput
          type="password"
          labelText="Confirm Password"
          placeholder="Re-enter Password"
        />
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
