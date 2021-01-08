import React from 'react';

const Button = ({color = 'blue', size = 'middle', type = 'submit', title, name, onClick, children, className, disabled}) => {
  return (
    <button onClick={onClick} name={name} title={title} type={type} className={`btn ${color} ${size} ${className}`} disabled={disabled} >
      {children}
    </button>
  )
}

export default Button;