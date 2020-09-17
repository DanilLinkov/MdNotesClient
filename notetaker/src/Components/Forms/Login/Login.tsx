import React, { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../MyFrield";
import AuthService from "../../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import Password from "../Password";
import logo from "../../../Resources/Logo.svg";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Values {
  Username: string;
  Password: string;
}

const Login = (props: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [loginStatus, setLoginStatus] = useState({
    message: "",
    loading: false,
    hasError: false,
  });

  const onSignUpClick = () => {
    history.push("/register");
  };

  const onSubmit = (values: Values) => {
    setLoading(true);
    if (values.Password && values.Username) {
      AuthService.login(values.Username, values.Password).then(
        () => {
          setLoading(false);
          history.push("/");
          window.location.reload();
        },
        (error) => {
          setLoginStatus({
            ...loginStatus,
            hasError: true,
            message: "Wrong Username/Password.",
          });
          setLoading(false);
        }
      );
    } else {
      setLoginStatus({
        ...loginStatus,
        hasError: false,
        message: "",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minWidth:"20em",
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
        initialValues={{ Username: "", Password: "" }}
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
                error={loginStatus.hasError}
              />
            </div>
            <div>
              <Field
                name="Password"
                placeholder="Password"
                component={Password}
                error={loginStatus.hasError}
              />
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                <Typography color="error">{loginStatus.message}</Typography>
                <Button type="submit">login</Button>
                <Typography>━━━━━━━━or━━━━━━━━</Typography>
                <Button onClick={onSignUpClick}>Sign up</Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
