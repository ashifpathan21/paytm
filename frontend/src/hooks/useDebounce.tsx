import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after a delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: cancels the timer if value changes again or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run if value or delay changes

  return debouncedValue;
}



// Example usage in a component (App.tsx)
const App = () => {
  const [inputValue, setInputValue] = useState('');
  // Debounce the inputValue with a 500ms delay
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // Use useEffect to perform an action (e.g., API call) when the debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform your API call or expensive operation here
      console.log('Fetching data for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // Only runs when debouncedSearchTerm is updated

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Type to search..."
      onChange={handleChange}
      value={inputValue}
    />
  );
};
