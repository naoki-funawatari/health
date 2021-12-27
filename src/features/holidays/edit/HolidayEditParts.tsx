import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export const FormNameInput = React.forwardRef(
  (props: UseFormRegisterReturn, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name } = props;
    return <input {...props} ref={ref} defaultValue={name} />;
  }
);
