import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  formatBRL,
  formatUSD,
  formatPercentage,
  formatCPF,
  formatNumbersOnly,
} from "../../utils/formatters";

interface FormattedInputProps {
  maskType?: "BRL" | "USD" | "percentage" | "CPF" | "number";
  value: string;
  onChange: (formattedValue: string) => void;
  placeholder?: string;
  limitDigits?: number;
  label: string;
  lightInput?: boolean;
}

const FormattedInput: React.FC<FormattedInputProps> = ({
  maskType,
  value,
  onChange,
  placeholder,
  limitDigits,
  label,
  lightInput = false,
  ...props
}) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    setFormattedValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (limitDigits && inputValue.replace(/\D/g, "").length > limitDigits) {
      return;
    }

    switch (maskType) {
      case "BRL":
        inputValue = formatBRL(inputValue);
        break;
      case "USD":
        inputValue = formatUSD(inputValue);
        break;
      case "percentage":
        inputValue = formatPercentage(inputValue);
        break;
      case "CPF":
        inputValue = formatCPF(inputValue);
        break;
      case "number":
        inputValue = formatNumbersOnly(inputValue);
        break;
      default:
        break;
    }

    setFormattedValue(inputValue);
    onChange(inputValue);
  };

  return (
    <TextField
      label={label}
      value={formattedValue}
      onChange={handleChange}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      InputLabelProps={{
        style: {
          color: lightInput ? "gray" : "white",
          background: lightInput ? "#fbfbfb" : "var(--modal-bg)",
          padding: "0 2px",
        },
      }}
      InputProps={{
        style: {
          width: "100%",
          color: lightInput ? "black" : "white",
          background: "transparent",
          height: "50px",
          borderColor: lightInput ? "black" : "white",
        },
        sx: {
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              transition: "all linear 0.1s",
              borderColor: lightInput ? "#2e2e2e49" : "#ffffff4d",
            },

            "&:hover fieldset": {
              borderColor: "var(--primaryColor)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "var(--primaryColor)",
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default FormattedInput;
