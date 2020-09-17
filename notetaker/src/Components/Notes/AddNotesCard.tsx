import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../../Services/User.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#fbdcc4",
  },
  media: {
    height: 140,
  },
});

interface IProps {
  subjectId: number,
  addNote: (cardId:number,title:string) => void
}

const AddNotesCard = (props: IProps) => {
  const classes = useStyles();
  const [title, settitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    settitle(e.target.value);
  };

  const onSubmit = () => {
    setLoading(true);
    if (title.length < 1) {
      const tempTitle:string = t("title");
      const tempContent:string = t("content");
      UserService.createNoteForSubjectId(tempTitle, props.subjectId,tempContent).then(
        (response) => {
          props.addNote(response.data.id, tempTitle);
          setLoading(false);
        }
      );
    } else {
      const tempContent:string = t("content");
      UserService.createNoteForSubjectId(title, props.subjectId,tempContent).then(
        (response) => {
          props.addNote(response.data.id, title);
          setLoading(false);
        }
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          multiline
          style={{ width: "100%" }}
          variant="outlined"
          autoComplete="off"
          placeholder={t("title")}
          onChange={(e) => onChange(e)}
        />
      </CardContent>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button style={{ color: "#ff4b5c" }} onClick={onSubmit}>
          {t("addnewnote")}
        </Button>
      )}
    </Card>
  );
};

export default AddNotesCard;
