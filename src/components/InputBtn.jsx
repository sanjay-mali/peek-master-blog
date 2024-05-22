import React from "react";

const InpputBtn = React.forwardRef(function Input(
  { type = "text", placeholder = "", label, className = "", ...props },
  ref
) {
  const id = React.useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline0-block mb-1 pl-1">
          {label}
        </label>
      )}
        <input type={type}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        ref={ref}
        {...props}
        id={id}
        />

    </div>
  );
});

export default InpputBtn;
