import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user/user-dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private backendUrl = environment.backendUrl;

    constructor(private http: HttpClient) { }

    getUserByLoginAndPass(login: string, password: string) {
        const params = new HttpParams()
            .set('login', login)
            .set('password', password)
        return this.http.get<User>(`${this.backendUrl}/users`, {params: params});
    }
}