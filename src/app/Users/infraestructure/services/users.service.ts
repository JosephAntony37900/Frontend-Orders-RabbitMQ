import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUsers } from "../../domain/models/user";
import { HttpClient } from "@angular/common/http";
import { UserGateway } from "../../domain/gateways/UsersGateways";


@Injectable({
    providedIn: 'root'
})

export class UserService implements UserGateway {
    private apiURL = 'http'
    constructor(private http: HttpClient) {}

    getAll(): Observable<iUsers[]>{
        return this.http.get<iUsers[]>(this.apiURL)
    }

    delete(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    create(iusers: iUsers): Observable<iUsers>{
        return this.http.post<iUsers>(`${this.apiURL}`, iusers)
    }

    update(id: number, iusers: iUsers): Observable<iUsers>{
        return this.http.put<iUsers>(`${this.apiURL}/${id}`, iusers)
    }

   
}