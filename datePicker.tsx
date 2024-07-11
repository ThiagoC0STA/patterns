import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

interface DatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MUIDatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            sx: {
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
              "& .MuiFormLabel-root, .Mui-focused, .MuiFormControl-root": {
                color: "var(--primaryColor) !important",
              },
            },
          },
          day: {
            sx: {
              "&.Mui-selected": {
                backgroundColor: "var(--primaryColor) !important",
                color: "#fff",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "var(--primaryColorHover) !important",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
