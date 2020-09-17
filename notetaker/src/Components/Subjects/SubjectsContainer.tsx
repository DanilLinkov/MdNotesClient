import React, { useEffect, useState } from "react";
import { Button, Box, Grid } from "@material-ui/core";
import SubjectCard from "./SubjectCard";
import AuthService from "../../Services/Auth.service";
import { useHistory } from "react-router-dom";
import UserService from "../../Services/User.service";
import CircularProgress from "@material-ui/core/CircularProgress";

const SubjecsContainer = () => {
  const history = useHistory();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      const tempUser = AuthService.getCurrentUser();
      UserService.getSubjectsForUser(tempUser.id).then(
        (response) => {
          setSubjects(response.data);
          setLoading(false);
        },
        (error) => {
          // figure it out later
        }
      );
    } else {
      history.push("/login");
    }
  }, [history]);

  const clickedAddNewSubject = () => {
    history.push("/addsubject");
  };

  const removeCardWithId = (subjectId: any) => {
    const newArray = subjects.filter((subject: any) => {
      if (subject.id === subjectId) {
        return false;
      }
      return true;
    });
    setSubjects(newArray);
  };

  return (
    <Box
      style={{ width: "50%", margin: "auto", padding: "2em", marginTop: "5%" }}
      bgcolor="white"
      borderRadius="20px"
      textAlign="center"
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" justify="flex-start" spacing={2} style={{textAlign:"initial"}}>
          <Grid item>
            <Button style={{ color: "#ff4b5c" }} onClick={clickedAddNewSubject}>
              Add New Subject
            </Button>
          </Grid>

          {Object.keys(subjects).map((id) => (
            <Grid key={id} item>
              <SubjectCard
                removeCard={removeCardWithId}
                id={(subjects as any)[id].id}
                title={(subjects as any)[id].title}
                description={(subjects as any)[id].description}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SubjecsContainer;
