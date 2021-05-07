import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { FormGroup } from "@angular/forms";


@Injectable()
export class StudentsService {
  constructor(private http: HttpClient) { }

  // https://www.positronx.io/how-to-use-angular-8-httpclient-to-post-formdata/ --> Como subir archivos

  importStudent(form: FormGroup): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const formData = new FormData();
    formData.append("file", form.get('file').value);
    return this.http.post<any>('http://localhost:3000/student/importstudent', formData, { headers: headers });
  }

  addStudentToGroup(uniqueStudentsIDs: string, uniqueGroupsIDs: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const body = { uniqueStudentsIDs: uniqueStudentsIDs,  uniqueGroupsIDs: uniqueGroupsIDs};
    this.http.put<any>('http://localhost:3000/student/addtogroup', body, { headers: headers }).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  removeStudentFromGroup(uniqueStudentsIDs: string, uniqueGroupsIDs: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
      body : { uniqueStudentsIDs: uniqueStudentsIDs,  uniqueGroupsIDs: uniqueGroupsIDs}
    };
    return this.http.delete<any>('http://localhost:3000/student/removefromgroup', options).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  getStudentProfile(uniqueStudentID: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' })
    };
    return this.http.get<any>('http://localhost:3000/student/profile/' + uniqueStudentID, options);
  }

  getAllStudent(uniqueGroupID: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
      body : { uniqueGroupID: uniqueGroupID }
    };
    return this.http.get<any>('http://localhost:3000/student/getall', options);
  }

  updateStudent(uniqueStudentID: string, studentID: string, studentName: string, studentLastName: string, judges: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const body = { studentID: studentID,  studentName: studentName, studentLastName: studentLastName, judges: judges};
    this.http.put<any>('http://localhost:3000/student/update/' + uniqueStudentID, body, { headers: headers }).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  deleteStudent(uniqueStudentID: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
    };
    return this.http.delete<any>('http://localhost:3000/student/delete/' + uniqueStudentID, options).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  addStudent(studentID: string, studentName: string, studentLastName: string, judges: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const body = { studentID: studentID,  studentName: studentName, studentLastName: studentLastName, judges: judges};
    return this.http.post<any>('http://localhost:3000/student/add', body, { headers: headers });
  }
}