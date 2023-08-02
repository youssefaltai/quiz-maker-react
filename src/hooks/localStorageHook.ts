import { useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      // Try to load the value from localStorage.
      const storedValue = localStorage.getItem(key);

      // If it doesn't exist in localStorage, use the default value provided.
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setStoredValue = (val: T | ((currentValue: T) => T)) => {
    // If the passed value is a function, call it first, passing it the current value of the state
    // and set the new value to be the return of the function.
    // Otherwise, if the passed value is not a function, set it as the new value directly.
    const valueToStore = val instanceof Function ? val(value) : val;
    setValue(valueToStore);
    // Save the value to localStorage.
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setStoredValue] as const;
}
