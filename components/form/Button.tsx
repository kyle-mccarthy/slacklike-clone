import { FC } from 'react';

interface Props {
  onClick: () => void;
}

const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="p-2 text-center ml-2 border border-white leading-none flex justify-center items-center hover:bg-gray-900 hover:bg-opacity-5 hover:border-opacity-50 cursor-pointer transition-all"
    >
      {children}
    </div>
  );
};

export default Button;
