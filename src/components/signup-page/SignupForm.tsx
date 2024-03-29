"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

import FormPrompt from "../ui/formPrompt";
import Password from "../ui/password";
import SubmitButton from "../ui/submitButton";
import NationalitySelect from "../ui/nationalitySelect";
import ImageUpload from "../ui/imageUpload";
import { signUpAction } from "@/lib/actions";
import { initialSignUpFormState } from "@/lib/constants";

import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { toast } from "sonner";

const SignupForm = () => {
  const [formState, action] = useFormState(
    signUpAction,
    initialSignUpFormState,
  );

  useEffect(() => {
    if (formState.signUpError) {
      toast.error(formState.signUpError);
      formState.signUpError = "";
    }
    if (formState.signUpSuccess) {
      toast.success(formState.signUpSuccess);
      redirect("/");
    }
  }, [formState]);

  return (
    <form className="mt-8" action={action}>
      <Input
        isRequired
        name="username"
        type="text"
        variant="bordered"
        isInvalid={!!formState.username}
        errorMessage={formState.username}
        label="Username"
        className="mb-5 placeholder:text-black"
        color="warning"
      />
      <Input
        isRequired
        name="email"
        type="email"
        variant="bordered"
        isInvalid={!!formState.email}
        errorMessage={formState.email}
        label="Email"
        className="mb-5 placeholder:text-black"
        color="warning"
        endContent={<FontAwesomeIcon color="lightgray" icon={faEnvelope} />}
      />
      <Password
        errorMessage={formState.password}
        label="Password"
        name="password"
      />
      <Password
        errorMessage={formState.confirmPassword!}
        label="Confirm password"
        name="confirmPassword"
      />
      <NationalitySelect
        name="nationality"
        errorMessage={formState.nationality}
      />
      <ImageUpload name="image" />
      <SubmitButton>Sign up</SubmitButton>
      <FormPrompt to="login" />
    </form>
  );
};

export default SignupForm;
