import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../Forms/MyFrield";
import UserService from "../../Services/User.service";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Values {
  Title: string;
  Description: string;
}

const AddSubject = (props: any) => {
  const [userId, setuserId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      setuserId(AuthService.getCurrentUser().id);
    } else {
      history.push("/login");
    }
  }, [history]);

  const onSubmit = (values: Values) => {
    setLoading(true);

    if(values.Title.length<1)
    {
      values = {
        ...values,
        Title: "Title"
      }
    }

    if(values.Description.length<1)
    {
      values = {
        ...values,
        Description: "Description"
      }
    }

    UserService.postSubjectToUserId(
      userId,
      values.Title,
      values.Description
    ).then(
      (response) => {
        history.push("/");
      },
      (error) => {
      }
    );
  };

  const onClickCancel = () => {
    history.push("/");
  };

  return (
    <div
      style={{
        maxWidth: "37em",
        margin: "auto",
        marginTop: "10%",
        textAlign: "center",
        height: "26em",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          style={{
            maxWidth: "37em",
            margin: "auto",
            marginTop: "10%",
            textAlign: "center",
            height: "26em",
          }}
          bgcolor="white"
          borderRadius="10px"
        >
          <Formik
            initialValues={{ Title: "", Description: "" }}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values }) => (
              <Form style={{ padding: "3em" }}>
                <Typography variant="h4">Create a new subject</Typography>
                <div style={{ marginTop: "1em" }}>
                  <Field name="Title" placeholder="Title" component={MyField} />
                </div>
                <div>
                  <Field
                    name="Description"
                    placeholder="Description"
                    component={MyField}
                    rows="5"
                  />
                </div>
                <Button
                  style={{ marginTop: "1em", marginRight: "2em" }}
                  type="submit"
                >
                  Create
                </Button>
                <Button style={{ marginTop: "1em" }} onClick={onClickCancel}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </div>
  );
};

export default AddSubject;
