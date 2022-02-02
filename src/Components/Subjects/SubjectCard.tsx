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
    color: "black",
  },
  media: {
    height: 140,
  },
});

interface IProps {
  id: number,
  title: string,
  description: string,
  removeCard: (subjectId:number) => void
}

const SubjectCard = (props: IProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { title, description, id } = props;
  const { t, i18n } = useTranslation();

  const onDelete = () => {
    props.removeCard(id);
    UserService.deleteSubjectForSubjectId(id).then((response) => {
    });
  };

  const onEditClick = () => {
    history.push({
      pathname: "editsubject",
      state: {
        subjectId: id,
        title: title,
        description: description,
      },
    });
  };

  const onClickGoToNotes = () => {
    history.push({
      pathname: "notes",
      state: {
        subjectId: id,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Button
              size="large"
              color="primary"
              style={{ color: "#ff4b5c" }}
              onClick={onClickGoToNotes}
            >
              {
                t("gotonotes")
              }
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              color="primary"
              style={{ color: "#ff4b5c", marginRight: "20px" }}
              onClick={onEditClick}
            >
              {
                t("edit")
              }
            </Button>
            <Button
              size="large"
              color="primary"
              style={{ color: "#ff4b5c" }}
              onClick={onDelete}
            >
              {
                t("remove")
              }
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SubjectCard;
