import { useState } from "react";

export function useFormInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  const validate = (validationFn: (value: string) => string[] | null) => {
    const errors = validationFn(value);
    if (errors && errors.length > 0) {
      setMessages(errors);
      return { isValid: false, messages: errors };
    } else {
      setMessages([]);
      return { isValid: true, messages: [] };
    }
  };

  return {
    value,
    setValue,
    messages,
    setMessages,
    validate,
  };
}