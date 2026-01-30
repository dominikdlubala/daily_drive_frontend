import { useState } from 'react';

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value !== null) {
        if (typeof defaultValue === 'string') {
          return value as unknown as T;
        }
        return JSON.parse(value) as T;
      } else {
        const valueToStore =
          typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue);
        window.localStorage.setItem(keyName, valueToStore);
        return defaultValue;
      }
    } catch (error) {
      console.error('useLocalStorage error:', error);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      const valueToStore = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
      window.localStorage.setItem(keyName, valueToStore);
      setStoredValue(newValue);
    } catch (error) {
      console.error('useLocalStorage set error:', error);
    }
  };

  return [storedValue, setValue] as const;
};
