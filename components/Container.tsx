import { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div className="container mx-auto max-w-screen-xl">{children}</div>;
};

export default Container;
