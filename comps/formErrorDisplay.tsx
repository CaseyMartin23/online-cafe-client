import React from "react";

const FormErrorDisplay: React.FC<{ errorText: string }> = ({ errorText }) => {
  return <span className="text-red-600 mt-2">{errorText}</span>;
};

export default FormErrorDisplay;
