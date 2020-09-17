import React, { useEffect, useState } from "react";
import { Button, Box, Grid } from "@material-ui/core";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import NoteCard from "./NoteCard";
import AddNotesCard from "./AddNotesCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const NotesContainer = (props: any) => {
  const history = useHistory();
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (AuthService.getCurrentUser() && (props.location.state!==undefined)) {
      UserService.getNotesForSubjectId(props.location.state.subjectId).then(
        (response) => {
          setNotes(response.data);
          setLoading(false);
        }
      );
    } else {
      history.push("/");
    }
  }, [history, props.location.state]);

  const addNoteCardWithId = (cardId: any, title: any) => {
    const newNoteCard = {
      id: cardId,
      title: title,
    };

    setNotes((oldNotes: any) => [...oldNotes, newNoteCard]);
  };

  const removeCardWithId = (cardId: any) => {
    const newArray = notes.filter((note: any) => {
      if (note.id === cardId) {
        return false;
      }
      return true;
    });
    setNotes(newArray);
  };

  const backToHome = () => {
    history.push("/");
    return 1;
  };

  // REMEMBER TO CHANGE SUBJECTID FROM PROP TO OBJECT WAY

  return (
    <div>
      {props.location.state === undefined ? backToHome() : (
        <Box
          style={{
            width: "50%",
            margin: "auto",
            padding: "2em",
            marginTop: "5%",
            textAlign: "center",
          }}
          bgcolor="white"
          borderRadius="20px"
        >
          <Button
            style={{ marginBottom: "5px", color: "#ff4b5c" }}
            onClick={backToHome}
          >
            Back
          </Button>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <AddNotesCard
                subjectId={props.location.state.subjectId}
                addNote={addNoteCardWithId}
              />
            </Grid>
            {loading ? (
              <CircularProgress style={{ marginTop: "5%" }} />
            ) : (
              Object.keys(notes).map((id) => (
                <Grid item xs={12} sm={4} key={id}>
                  <NoteCard
                    title={(notes as any)[id].title}
                    id={(notes as any)[id].id}
                    removeCard={removeCardWithId}
                    subjectId={props.location.state.subjectId}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default NotesContainer;
