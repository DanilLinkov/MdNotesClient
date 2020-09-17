import React from "react";
import Login from "./Components/Forms/Login/Login";
import Register from "./Components/Forms/Register/Register";
import Appbar from "./Components/Appbar/Topbar";
import AddSubject from "./Components/Subjects/AddSubject";
import EditSubject from "./Components/Subjects/EditSubject";
import NotesContainer from "./Components/Notes/NotesContainer";
import { Switch, Route } from "react-router-dom";
import SubjecsContainer from "./Components/Subjects/SubjectsContainer";
import NoteEditor from "./Components/NoteEditor/NoteEditor";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Home}/>
      </Switch>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <Appbar />
      <Switch>
        <Route path="/addsubject" component={AddSubject}/>
        <Route path="/editsubject" component={EditSubject}/>
        <Route path="/notes" component={NotesContainer}/>
        <Route path="/editor" component={NoteEditor}/>
        <Route path="/" component={SubjecsContainer}/>
      </Switch>
    </div>
  );
};

export default App;
