import React, { useState } from 'react';

function useInput(initialValue: File | null) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setValue(event.target.files[0]);
    }
  }

  return {
    value,
    setValue,
    handleChange,
  };
}

export default useInput;
