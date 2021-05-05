import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,
         HttpHeaders } from '@angular/common/http';

@Injectable()
export class LabelsService {
  constructor(private http: HttpClient) { }

  // Falta error handling
  getTagNames(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    return this.http.get<any>('http://localhost:3000/tag/getnames', { headers: headers});
  }

  // Falta error handling
  getAllTags(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    return this.http.get<any>('http://localhost:3000/tag/getall', { headers: headers});
  }

  // Falta error handling
  updateTag(uniqueTagID: string, tagName: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    const body = {tagName: tagName};
    return this.http.put<any>('http://localhost:3000/tag/update' + uniqueTagID, body, { headers: headers});
  }

  // Falta error handling
  deleteTag(uniqueTagID: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    return this.http.delete<any>('http://localhost:3000/tag/delete/' + uniqueTagID, { headers: headers});
  }

  // Falta error handling
  addTag(tagName: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    const body = {tagName: tagName};
    return this.http.post<any>('http://localhost:3000/tag/add', body, { headers: headers});
  }
}