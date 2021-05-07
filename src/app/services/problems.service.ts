import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';


@Injectable()
export class ProblemsService {
  constructor(private http: HttpClient) { }

  // deberia retornar o que espere aca? - no devuelve nada
  getSync(): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' })
    };
    return this.http.get<any>('http://localhost:3000/problem/sync', options);
  }

  getJudges(): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' })
    };
    return this.http.get<any>('http://localhost:3000/problem/judges', options);
  }

  getAllProblem(uniqueJudgesIDs: string, uniqueTagsIDs: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
      body : { uniqueJudgesIDs: uniqueJudgesIDs,  uniqueTagsIDs: uniqueTagsIDs}
    };
    return this.http.get<any>('http://localhost:3000/problem/getall', options);
  }

  updateProblem(uniqueProblemID: string, problemComment: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const body = { problemComment: problemComment };
    this.http.put<any>('http://localhost:3000/problem/update/' + uniqueProblemID, body, { headers: headers }).subscribe(
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

  addTagToProblem(uniqueTagsIDs: string, uniqueProblemsIDs: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' });
    const body = { uniqueTagsIDs: uniqueTagsIDs,  uniqueProblemsIDs: uniqueProblemsIDs};
    this.http.put<any>('http://localhost:3000/problem/addtag', body, { headers: headers }).subscribe(
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

  removeTagFromProblem(uniqueTagsIDs: string, uniqueProblemsIDs: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
      body : { uniqueTagsIDs: uniqueTagsIDs,  uniqueProblemsIDs: uniqueProblemsIDs}
    };
    return this.http.delete<any>('http://localhost:3000/problem/removetag', options).subscribe(
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

}