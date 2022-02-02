import axios from "axios";
import authHeader from "./Auth-header";

// Gotta change it later for when hosting it
const API_URL = "https://mdnotesapi.azurewebsites.net/api/";

class UserService {


  // NOTES

  getNotesForSubjectId(subjectId: number) {
    return axios.get(API_URL + `Notes/GetNotesInSubject/${subjectId}`, {
      headers: authHeader(),
    });
  }

  getNoteForNoteId(noteId: number) {
    return axios.get(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  createNoteForSubjectId(title:string,subjectId:number,content:string) {
    const newNote = {
      title: title,
      // Can preset content later which could teach people how to use the notes
      content: content,
      subjectId: subjectId,
    };

    const head = {
      headers: authHeader(),
    };

    return axios.post(API_URL + `Notes`, newNote, head);
  }

  deleteNoteForNoteId(noteId:number) {
    return axios.delete(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  editNoteForNoteId(noteId: number, title: string, content: string, subjectId: number) {
    const patchNote = {
      id: noteId,
      title: title,
      content: content,
      subjectId: subjectId
    };

    const head = {
      headers: authHeader(),
    };

    return axios.patch(API_URL + `Notes/${noteId}`, patchNote, head);
  }

  // SUBJECTS

  getSubjectsForUser(userId: number) {
    return axios.get(API_URL + `Subjects/GetSubjectsInUser/${userId}`, {
      headers: authHeader(),
    });
  }

  postSubjectToUserId(userId: number, title: string, description: string) {
    const newSubject = {
      title: title,
      description: description,
      userId: userId,
    };

    const head = {
      headers: authHeader(),
    };

    return axios.post(API_URL + `Subjects`, newSubject, head);
  }

  deleteSubjectForSubjectId(subjectId: number) {
    return axios.delete(API_URL + `Subjects/${subjectId}`, { headers: authHeader() });
  }

  editSubjectForSubjectId(subjectId: number,title:string,description:string,userId:number) {
    const patchSubject = {
        id: subjectId,
        title: title,
        description: description,
        userId: userId
      };
  
      const head = {
        headers: authHeader(),
      };

      return axios.patch(API_URL + `Subjects/${subjectId}`, patchSubject, head);
  }

}

export default new UserService();
