import { memo } from 'react';
import clsx from 'clsx';
import classes from './styles.module.css';

const Switch = ({ size, className, checked, disabled, onChange, label, ...props }) => {
  const classNames = clsx(
    classes.root,
    className,
    {
      [classes[size]]: size,
      [classes.disabled]: disabled,
    },
  );

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <label className={classNames} onClick={handleStopPropagation}>
      <input
        {...props}
        disabled={disabled}
        type="checkbox"
        className={classes.input}
        checked={checked}
        {...(onChange && { onChange })}
      />
      <span className={classes.track} />
      <span className={classes.thumb} />
      <span className={classes.label}>{label}</span>
    </label>
  );
};

export default memo(Switch);
