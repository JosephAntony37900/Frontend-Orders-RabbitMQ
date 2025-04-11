import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers } from "../../domain/models/user";
import { HttpClient } from "@angular/common/http";
import { UserGateway } from "../../domain/gateways/UsersGateways";
import { AuthResponse } from "../../domain/models/auth_response";


@Injectable({
    providedIn: 'root'
})

export class UserService implements UserGateway {
    private apiURL = 'http://localhost:8080'
    constructor(private http: HttpClient) {}

    getAll(): Observable<iUsers[]>{
        return this.http.get<iUsers[]>(this.apiURL)
    }

    delete(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    create(iusers: iUsers): Observable<iUsers>{
        return this.http.post<iUsers>(`${this.apiURL}/users`, iusers)
    }

    update(id: number, iusers: iUsers): Observable<iUsers>{
        return this.http.put<iUsers>(`${this.apiURL}/${id}`, iusers)
    }

    login(Email: string, Contraseña: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiURL}/login`, { Email, Contraseña });
    }

   
}