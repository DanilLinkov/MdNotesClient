import axios from "axios";
import authHeader from "./Auth-header";

// Gotta change it later for when hosting it
const API_URL = "https://mdnotesapi.azurewebsites.net/api/";

class UserService {

  // NOTES

  getNotesForSubjectId(subjectId: any) {
    return axios.get(API_URL + `Notes/GetNotesInSubject/${subjectId}`, {
      headers: authHeader(),
    });
  }

  getNoteForNoteId(noteId: any) {
    return axios.get(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  createNoteForSubjectId(title:any,subjectId:any) {
    const newNote = {
      title: title,
      // Can preset content later which could teach people how to use the notes
      content: "# This is a markdown file\n### To learn more about markdown syntax go to https://www.markdownguide.org/basic-syntax/",
      subjectId: subjectId,
    };

    const head = {
      headers: authHeader(),
    };

    return axios.post(API_URL + `Notes`, newNote, head);
  }

  deleteNoteForNoteId(noteId:any) {
    return axios.delete(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  editNoteForNoteId(noteId: any, title: any, content: any, subjectId: any) {
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

  getSubjectsForUser(userId: any) {
    return axios.get(API_URL + `Subjects/GetSubjectsInUser/${userId}`, {
      headers: authHeader(),
    });
  }

  postSubjectToUserId(userId: any, title: any, description: any) {
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

  deleteSubjectForSubjectId(subjectId: any) {
    return axios.delete(API_URL + `Subjects/${subjectId}`, { headers: authHeader() });
  }

  editSubjectForSubjectId(subjectId: any,title:any,description:any,userId:any) {
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
