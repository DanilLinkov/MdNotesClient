import * as React from "react";
import { FieldProps } from "formik";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export const MyField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  error,
  helperText,
  rows
}) => {
  return <TextField multiline rows={rows} style={{padding:"0.5em", width:"75%"}} variant="outlined" autoComplete='off' placeholder={placeholder} {...field} error={error} helperText={helperText} />;
};