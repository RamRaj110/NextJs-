"use server";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import React from "react";

const Home = () => {
  return (
    <div>
      <AuthForm
        formType="SIGNUP"
        defaultValues={{
          name: "",
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={signUpWithCredentials}
      />
    </div>
  );
};

export default Home;
