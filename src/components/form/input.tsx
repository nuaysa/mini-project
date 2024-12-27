import { Field, FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  formik: FormikProps<any>;
  type?: HTMLInputTypeAttribute;
}

export const Input = ({
  name,
  label,
  formik,
  type = "text",
  placeholder = name,
}: InputProps) => {
  const { handleChange, values, touched, errors } = formik;
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Field
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {touched[name] && typeof errors[name] === "string" ? (
        <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
      ) : null}
    </div>
  );
};
