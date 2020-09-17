import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { MyField } from "../Forms/MyFrield";
import UserService from "../../Services/User.service";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from 'react-i18next';

interface Values {
  Title: string;
  Description: string;
}

const AddSubject = () => {
  const [userId, setuserId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { t, i18n } = useTranslation();

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
        Title: t("title")
      }
    }

    if(values.Description.length<1)
    {
      values = {
        ...values,
        Description: t("description")
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
                <Typography variant="h4">{t("createanewsubject")}</Typography>
                <div style={{ marginTop: "1em" }}>
                  <Field name="Title" placeholder={t("title")} component={MyField} />
                </div>
                <div>
                  <Field
                    name="Description"
                    placeholder={t("description")}
                    component={MyField}
                    rows="5"
                  />
                </div>
                <Button
                  style={{ marginTop: "1em", marginRight: "2em" }}
                  type="submit"
                >
                  {t("create")}
                </Button>
                <Button style={{ marginTop: "1em" }} onClick={onClickCancel}>
                  {t("cancel")}
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
