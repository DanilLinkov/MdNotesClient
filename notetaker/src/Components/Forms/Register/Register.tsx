import React, { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../MyFrield";
import AuthService from "../../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import logo from "../../../Resources/Logo.svg";
import Password from "../Password";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Values {
  Username: string;
  Password: string;
  ReEnteredPassword: string;
}

const Register = () => {
  const history = useHistory();
  const [userError, setUserError] = useState("");
  const [userPassError, setPassError] = useState("");
  const [userOverAllError, setOverAllError] = useState("");
  const [loading, setLoading] = useState(false);

  const onBackToLogin = () => {
    history.push("/login");
  };

  const onSubmit = (values: Values) => {
    setLoading(true);
    if (values.Password && values.Username && values.ReEnteredPassword) {
      var temp:boolean = true;

      if (
        !checkCorrectLength(values.Username) &&
        checkCorrectLength(values.Password)
      ) {
        temp = false;
        setLoading(false);
        setUserError("Username must be at least 6 characters in length.");
        setPassError("");
      }

      if (
        !checkCorrectLength(values.Password) &&
        checkCorrectLength(values.Username)
      ) {
        temp = false;
        setLoading(false);
        setUserError("");
        setPassError("Password must be at least 6 characters in length.");
      }

      if (
        !checkCorrectLength(values.Password) &&
        !checkCorrectLength(values.Username)
      ) {
        temp = false;
        setLoading(false);
        setUserError("Username must be at least 6 characters in length.");
        setPassError("Password must be at least 6 characters in length.");
      }

      if (
        checkCorrectLength(values.Password) &&
        checkCorrectLength(values.Username)
      ) {
        setUserError("");
        setPassError("");
      }

      if (!checkPassEqual(values.Password, values.ReEnteredPassword)) {
        temp = false;
        setLoading(false);
        setOverAllError("Password and Re-entered password are not equal.");
      }

      if (checkPassEqual(values.Password, values.ReEnteredPassword)) {
        setOverAllError("");
      }

      if (temp) {
        AuthService.register(values.Username, values.Password).then(
          (response) => {
            history.push("/login");
          },
          (error) => {
            setUserError("Username already exists.");
            setLoading(false);
          }
        );
      }
    } else {
      setUserError("");
      setPassError("");
      setOverAllError("");
      setLoading(false);
    }
  };

  const checkCorrectLength = (s: String) => {
    if (s.length < 6) {
      return false;
    }

    return true;
  };

  const checkPassEqual = (pass: String, repass: String) => {
    if (pass === repass) {
      return true;
    }

    return false;
  };

  return (
    <Box
      style={{
        minWidth: "20em",
        maxWidth: "35em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        minHeight: "31.5em",
      }}
      bgcolor="white"
      borderRadius="10px"
    >
      <Formik
        initialValues={{ Username: "", Password: "", ReEnteredPassword: "" }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values }) => (
          <Form style={{ padding: "2.5em" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px",
              }}
            >
              <img
                src={logo}
                height="80px"
                alt="Logo"
                style={{ marginRight: "12px" }}
              />
              <Typography variant="h4">MD-Notes</Typography>
            </div>
            <div>
              <Field
                name="Username"
                placeholder="Username"
                component={MyField}
                error={userError.length > 0}
                helperText={userError}
              />
            </div>
            <div>
              <Field
                name="Password"
                placeholder="Password"
                component={Password}
                error={userPassError.length > 0}
                helperText={userPassError}
              />
            </div>
            <div>
              <Field
                name="ReEnteredPassword"
                placeholder="Reenter password"
                component={Password}
                error={userOverAllError.length > 0}
                helperText={userOverAllError}
              />
            </div>
            {loading ? (
              <CircularProgress style={{ marginTop: "15px" }} />
            ) : (
              <div>
                <Button type="submit">Sign up</Button>
                <Typography>━━━━━━━━or━━━━━━━━</Typography>
                <Button onClick={onBackToLogin}>back to login</Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
