import * as React from "react";
import { TextField } from "@material-ui/core";

const Password = (props:any) => {
    const {placeholder,field,error,helperText} = props;
    return <TextField type="password" style={{padding:"0.5em", width:"75%"}} variant="outlined" placeholder={placeholder} {...field} error={error} helperText={helperText} />;
}

export default Password;