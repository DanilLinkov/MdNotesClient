import * as React from "react";
import { TextField } from "@material-ui/core";
import { FieldProps } from "formik";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

const Password: React.FC<FieldProps & TextFieldProps> = ({
    placeholder,
    field,
    error,
    helperText,
    rows
  }) => {
    return <TextField type="password" style={{padding:"0.5em", width:"75%"}} variant="outlined" placeholder={placeholder} {...field} error={error} helperText={helperText} />;
}

export default Password;