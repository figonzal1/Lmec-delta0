import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { FormValues } from "./CexSecretsForm";

const InputField = ({
  register,
  name,
  label,
  error,
  errorMsg,
  defaultValue,
}: {
  register: UseFormRegister<FormValues>;
  name: keyof FormValues;
  label: string;
  error?: FieldError;
  errorMsg: boolean;
  defaultValue: string | null;
}) => {
  const [toggleVisibility, setToggleVisibility] = useState(false);

  return (
    <Input
      {...register(name, { required: true })}
      type={toggleVisibility ? "text" : "password"}
      label={label}
      defaultValue={defaultValue === null ? "" : defaultValue}
      radius="lg"
      isRequired
      isInvalid={error ? true : false}
      errorMessage={errorMsg ? "Este campo es requerido" : ""}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={() => setToggleVisibility(!toggleVisibility)}
          aria-label="toggle password visibility"
        >
          {toggleVisibility ? (
            <TbEyeClosed className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <TbEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
};

export default InputField;
