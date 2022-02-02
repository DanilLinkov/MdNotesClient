import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import MDReactComponent from "markdown-react-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";

const NoteEditor = (props: any) => {
  const history = useHistory();
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    if (AuthService.getCurrentUser()&&(props.location.state!==undefined)) {
      UserService.getNoteForNoteId(props.location.state.noteId).then(
        (response) => {
          setTitle(response.data.title);
          setMarkdown(response.data.content);
          setLoading(false);
        }
      );
    }
    else {
      history.push("/");
    }
  }, [history,props.location.state]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const onTabPress = (e: any) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      e.target.value += "\t";
    }
  };

  const onClickedBack = () => {
    history.push({
      pathname: "notes",
      state: {
        subjectId: props.location.state.subjectId,
      },
    });
  };

  const onSaveClicked = () => {
    setSaving(true);
    let tempTitle:string = title;
    let tempMarkdown:string = markdown;

    if(tempTitle.length<1)
    {
      tempTitle = t("title");
    }

    if(tempMarkdown.length<1)
    {
      tempMarkdown = "markdown"
    }

    UserService.editNoteForNoteId(
      props.location.state.noteId,
      tempTitle,
      tempMarkdown,
      props.location.state.subjectId
    ).then((response) => {
      setSaving(false);
    });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const goHome = () => {
    history.push("/");
    return 1;
  }

  return (
    <div>
      {props === undefined ? goHome() : (
        <Box
          style={{
            maxWidth: "90%",
            margin: "auto",
            padding: "2em",
            marginTop: "5%",
          }}
          bgcolor="white"
          borderRadius="20px"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                multiline
                variant="outlined"
                autoComplete="off"
                placeholder="title"
                defaultValue={title}
                onChange={(e) => onTitleChange(e)}
              />
            </Grid>
            {saving ? (
              <Grid item>
                {" "}
                <CircularProgress />{" "}
              </Grid>
            ) : (
              <Grid container item direction="row" justify="center">
                <Grid item>
                  <Button onClick={onSaveClicked} style={{ color: "#ff4b5c" }}>
                    {t("save")}
                  </Button>
                </Grid>
                <Grid>
                  <Button onClick={onClickedBack} style={{ color: "#ff4b5c" }}>
                    {t("back")}
                  </Button>
                </Grid>
              </Grid>
            )}
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid item container spacing={4}>
                <Grid item sm={12} xs={12} md={6}>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={45}
                    defaultValue={markdown}
                    onChange={(e) => onChange(e)}
                    onKeyDown={(e) => onTabPress(e)}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                  <Box
                    bgcolor="#DCDCDC"
                    width="97.6%"
                    height="99.3%"
                    paddingLeft="10px"
                    paddingRight="10px"
                    border={1}
                    style={{ wordBreak: "break-all" }}
                  >
                    <MDReactComponent text={markdown} />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default NoteEditor;
