import { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import classes from './styles.module.css';
import Typography from '../Typography/index';

const Index = ({ className, children, ...props }) => {
  const classNames = clsx(
    classes.root,
    className,
  );

  return (
    <Typography color="error" className={classNames} {...props}>
      {children}
    </Typography>
  );
};

Index.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Index);
