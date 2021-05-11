import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { JWTTokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userValue: Boolean = false;

  constructor(private http: HttpClient, private jwtService: JWTTokenService) { }

  login(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    // Lo que se tiene que hacer cuando se invoca al metodo
    // this.http.post<any>('http://localhost:3000/user/login', body).subscribe(
    //   data => localStorage.setItem('token', data.token), 
    //   error => console.log("Error: ", error), 
    //   () => console.log(localStorage.getItem('token'))
    // );
    return this.http.post<any>('http://localhost:3000/user/login', body);
  }

  isTokenExpired() {
    return this.jwtService.isTokenExpired();
;
  }
}
