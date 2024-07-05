import React from "react";

const Input = ({ name, type, placeholder, onChange }) => {
  return (
    <div className="mt-4">
      <p>{name}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full px-3 mt-1 border rounded-md active:border-mr_yellow"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
