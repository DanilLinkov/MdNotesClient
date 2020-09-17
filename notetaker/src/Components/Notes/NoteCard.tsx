import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../../Services/User.service";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#faf3dd",
    color: "Black"
  },
  media: {
    height: 140,
  },
});

interface IProps {
  title: string,
  id: number,
  subjectId: number,
  removeCard: (cardId:number) => void
}

const NoteCard = (props: IProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const removeCard = () => {
    props.removeCard(props.id);
    UserService.deleteNoteForNoteId(props.id).then((response) => {
      // Implement something later?
    });
  };

  const goToMarkdownClicked = () => {
    history.push({
      pathname: "editor",
      state: {
        noteId: props.id,
        subjectId: props.subjectId,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <Button size="small" color="primary" style={{ color: "#ff4b5c" }} onClick={goToMarkdownClicked}>
              {t("gotomarkdown")}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="primary"
              style={{ color: "#ff4b5c" }}
              onClick={removeCard}
            >
              {t("remove")}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
