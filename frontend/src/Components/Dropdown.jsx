import React from 'react';
import "./Dropdown.css"

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <select className="dropdown" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default Dropdown;
