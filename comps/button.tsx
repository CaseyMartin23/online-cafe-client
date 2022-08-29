import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}

interface GenericButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
}

const Button: React.FC<GenericButtonProps> = ({
  text,
  onClick,
  className: extendClassName,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`mx-1 px-2 py-1 rounded-md ${extendClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
