import React from 'react';

const CreateAccountFormElement = ({ label, id, value, onChange, type = 'text', required = false }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default CreateAccountFormElement;