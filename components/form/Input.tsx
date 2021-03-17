import { FC, useCallback, useState, ChangeEvent, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      onChange(ev.target.value);
    },
    [onChange]
  );

  return (
    <input
      className="bg-gray-900 bg-opacity-25 flex-grow p-2 border border-gray-900 border-opacity-25"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
