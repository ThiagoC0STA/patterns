import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface SelectBoxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "50px",
          "& fieldset": {
            transition: "all linear 0.1s",
            borderColor: "#2e2e2e49",
          },
          "&:hover fieldset": {
            borderColor: "var(--primaryColorHover)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--primaryColor)",
          },
        },
        "& .MuiFormLabel-root": {
          color: "#24242489",
        },
        "& .MuiSelect-select": {
          padding: "10px 14px",
        },

        "& .MuiFormControl-root .MuiTextField-root, .MuiFormLabel-root": {
          color: "#24242489",
        },

        "& .MuiFormLabel-root, .MuiFormControl-root": {
          color: "var(--primaryColor) !important",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectBox;
