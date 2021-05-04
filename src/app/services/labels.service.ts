import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,
         HttpHeaders } from '@angular/common/http';

export interface User {
  carnet: number,
  nombre: string,
  beca: string,
  precio: number,
}

@Injectable()
export class LabelsService {
  constructor(private http: HttpClient) { }

  getTagsNames(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiaWF0IjoxNjE5NjQ3NTEzfQ.uluX3t20Ls0-JjQuKiedvbQP7gF1XT5QUqi5ytcBQQI'});
    return this.http.get<any>('http://localhost:3000/tag/getall', { headers: headers});
  }
}