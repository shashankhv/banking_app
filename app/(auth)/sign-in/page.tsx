import React from "react";
import AuthForm from "../../../components/AuthForm";

const SignIn = () => {
  return (
    <section className="flex-center size-full max-xm:px-6">
      <AuthForm type={"sign-in"} />
    </section>
  );
};

export default SignIn;
