import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient) { }

  exportGroup(uniqueGroupID: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/group/export/' + uniqueGroupID);
  }

  getGroupsNames(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/group/filter');
  }

  getAllGroup(tags: string): Observable<any> {
    // const options = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI' }),
    //   body : { tags: tags }
    // };
    // return this.http.get<any>('http://localhost:3000/group/getall', options);
    return this.http.get<any>('http://localhost:3000/group/getall');
  }

  updateGroup(uniqueGroupID: string, groupName: string) {
    const body = { groupName: groupName };
    this.http.put<any>('http://localhost:3000/group/update/' + uniqueGroupID, body).subscribe(
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

  deleteGroup(uniqueGroupID: string) {
    return this.http.delete<any>('http://localhost:3000/group/delete/' + uniqueGroupID).subscribe(
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

  addGroup(groupName: string): Observable<any> {
    const body = { groupName: groupName };
    return this.http.post<any>('http://localhost:3000/group/add', body);
  }
}