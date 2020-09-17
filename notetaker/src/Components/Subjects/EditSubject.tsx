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

const EditSubject = (props: any) => {
  const [userId, setuserId] = useState(-1);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      setuserId(AuthService.getCurrentUser().id);
    } else {
      history.push("/login");
    }
  }, [history]);

  const onSubmit = (values: Values) => {
    setLoading(true);

    if (values.Title.length < 1) {
      values = {
        ...values,
        Title: "Title",
      };
    }

    if (values.Description.length < 1) {
      values = {
        ...values,
        Description: "Description",
      };
    }

    UserService.editSubjectForSubjectId(
      props.location.state.subjectId,
      values.Title,
      values.Description,
      userId
    ).then((response) => {
      history.push("/");
    });
  };

  const onClickCancel = () => {
    history.push("/");
    return 1;
  };

  return (
    <div>
      {(props.location.state===undefined) ? onClickCancel() : (
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
                initialValues={{
                  Title: props.location.state.title,
                  Description: props.location.state.description,
                }}
                onSubmit={(values) => {
                  onSubmit(values);
                }}
              >
                {({ values }) => (
                  <Form style={{ padding: "3em" }}>
                    <Typography variant="h4">Edit Subject</Typography>
                    <div style={{ marginTop: "1em" }}>
                      <Field
                        name="Title"
                        placeholder="Title"
                        component={MyField}
                      />
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
                      Update
                    </Button>
                    <Button
                      style={{ marginTop: "1em" }}
                      onClick={onClickCancel}
                    >
                      Cancel
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default EditSubject;
