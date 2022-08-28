import {memo} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import InputError from '../InputError/index';
import InputLabel from '../InputLabel/index';
import classes from './styles.module.css';

const Index = ({
                 label,
                 margin,
                 component,
                 inputClassName,
                 fullWidth,
                 name,
                 error,
                 StartIcon,
                 EndIcon,
                 type = 'text',
                 placeholder,
                 className,
                 onChange,
                 onClick,
                 ...props
               }) => {
  const Component = component || 'input';
  const classNames = clsx(
    classes.wrap,
    className,
    {
      [classes.margin]: margin,
      [classes.fullWidth]: fullWidth,
    },
  );

  return (
    <>
      {label &&
        <InputLabel>{label}</InputLabel>
      }
      <div className={classNames} onClick={onClick}>
        {
          StartIcon && <div className={classes.startIcon}>{StartIcon}</div>
        }
        <Component
          name={name}
          type={type}
          placeholder={placeholder}
          className={clsx(classes.root, inputClassName, {
            [classes.error]: error,
            [classes.hasStartIcon]: !!StartIcon

          })}
          onChange={onChange}
          {...props}
        />
        {
          EndIcon && <div className={classes.endIcon}>{EndIcon}</div>
        }
      </div>
      {
        error && <InputError>{error}</InputError>
      }
    </>
  );
};

Index.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  margin: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(Index);
