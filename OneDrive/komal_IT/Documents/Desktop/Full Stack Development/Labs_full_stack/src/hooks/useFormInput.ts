import { useState } from "react";

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  // Handles changes to the input field
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(null); // reset error when user types
  };

  // Validate the input with a callback function
  const validate = (validator: (val: string) => string | null) => {
    const validationError = validator(value);
    setError(validationError);
    return !validationError; // return true if valid
  };

  return {
    value,
    setValue,
    error,
    onChange,
    validate,
  };
}