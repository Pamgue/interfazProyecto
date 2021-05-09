import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable()
export class LabelsService {
  constructor(private http: HttpClient) { }

  getTagNames(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiZXhwIjoxNjIwNTIyNjA3LCJpYXQiOjE2MjA0OTc0MDd9.VxZQKt6z93q_kWOc937KaTEkdz0hjcItjTy5vg20LgU' });
    return this.http.get<any>('http://localhost:3000/tag/getnames', { headers: headers });
  }

  getAllTags(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiZXhwIjoxNjIwNTIyNjA3LCJpYXQiOjE2MjA0OTc0MDd9.VxZQKt6z93q_kWOc937KaTEkdz0hjcItjTy5vg20LgU' });
    return this.http.get<any>('http://localhost:3000/tag/getall', { headers: headers });
  }

  updateTag(uniqueTagID: string, tagName: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiZXhwIjoxNjIwNTIyNjA3LCJpYXQiOjE2MjA0OTc0MDd9.VxZQKt6z93q_kWOc937KaTEkdz0hjcItjTy5vg20LgU' });
    const body = { tagName: tagName };
    this.http.put<any>('http://localhost:3000/tag/update/' + uniqueTagID, body, { headers: headers }).subscribe(
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

  deleteTag(uniqueTagID: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiZXhwIjoxNjIwNTIyNjA3LCJpYXQiOjE2MjA0OTc0MDd9.VxZQKt6z93q_kWOc937KaTEkdz0hjcItjTy5vg20LgU' }),
      body : { uniqueTagID: uniqueTagID }
    };
    return this.http.delete<any>('http://localhost:3000/tag/delete', options).subscribe(
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

  addTag(tagName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJ0ZXN0IiwiX2lkIjoiM2E0YTBmMjMtOGQ4NC00MjYyLThkY2MtYzFkMmYzNTU1N2NiIiwiZXhwIjoxNjIwNTIyNjA3LCJpYXQiOjE2MjA0OTc0MDd9.VxZQKt6z93q_kWOc937KaTEkdz0hjcItjTy5vg20LgU' });
    const body = { tagName: tagName };
    return this.http.post<any>('http://localhost:3000/tag/add', body, { headers: headers });
  }
}