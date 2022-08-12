import { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import classes from './styles.module.css';

const Index = ({ noMargin, className, children, ...props }) => {
  const classNames = clsx(
    classes.root,
    className,
    {
      [classes.noMargin]: noMargin,
    },
  );

  return (
    <label className={classNames} {...props}>
      {children}
    </label>
  );
};

Index.propTypes = {
  noMargin: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Index);
