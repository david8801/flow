import { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import classes from './styles.module.css';

const Index = ({ color, align, weight, variant, component, gutterBottom, className, children, ...props }) => {
  const Component = component || 'p';
  const classNames = clsx(
    classes.root,
    className,
    {
      [classes[align]]: align,
      [classes[color]]: color,
      [classes.gutterBottom]: gutterBottom,
      [classes[weight]]: weight,
      [classes[variant]]: variant,
    },
  );

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};

Index.propTypes = {
  component: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(['body1', 'body2', 'h1', 'h2', 'h6']),
  weight: PropTypes.oneOf(['regular', 'semiBold', 'bold']),
  color: PropTypes.oneOf(['inherit', 'base', 'muted', 'primary', 'error']),
};

export default memo(Index);
