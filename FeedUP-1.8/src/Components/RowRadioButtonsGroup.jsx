import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

/**
 * Reusable Mui Radio Group Component
 *
 * @param {object} props
 * @param {string} props.groupLabel - The text for the main FormLabel (e.g., the question).
 * @param {Array<{value: string, label: string}>} props.options - An array of objects for the radio button options.
 * @param {string} props.name - The unique name for the radio group (required).
 * @param {string} [props.ariaLabelledby] - Optional ID for the accessibility label.
 * @param {function} [props.onChange] - Optional function to handle the value change.
 * @param {string} [props.initialValue=''] - The initial value for the selected radio button.
 */

export default function RowRadioButtonsGroup({
  groupLabel,
  options,
  name,
  ariaLabelledby,
  onChange,
  initialValue = "",
}) {
  // State to manage the selected value internally
  const [value, setValue] = useState(initialValue);
  const formLabelId = ariaLabelledby || `${name}-label`; // Use name to create a default ID

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    // Call the optional onChange prop if provided
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel id={formLabelId}>{groupLabel}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={formLabelId}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value} // Use a unique key for list items
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
