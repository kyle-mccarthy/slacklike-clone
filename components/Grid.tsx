import { FC, useMemo } from 'react';

interface Props {
  container?: boolean;
  cols?: number;
  direction?: 'row' | 'column';
  spacing?: 0 | 0.5 | 1 | 1.5;
}

const Grid: FC<Props> = ({ cols, container, direction, spacing, children }) => {
  const className = useMemo(() => {
    const styles = [];

    if (container) {
      styles.push('grid');
    }

    if (direction === 'column') {
      styles.push('grid-flow-col');
    } else if (direction === 'row') {
      styles.push('grid-flow-row');
    }

    if (spacing) {
      styles.push(`gap-${spacing}`);
    }

    return styles.join(' ');
  }, [cols, container, spacing, direction]);

  return <div className={className}>{children}</div>;
};

export default Grid;
