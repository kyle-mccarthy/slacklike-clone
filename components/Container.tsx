import { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
